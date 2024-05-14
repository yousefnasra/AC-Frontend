
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function VerifyCode() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function verifyCodeSubmit(values) {

        setIsLoading(true)

        let { data } = await axios.patch(`https://ac-backend-zeta.vercel.app/auth/resetPassword`, values)
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })

        if (data.success === true) {
            setIsLoading(false)
            navigate('/login')
        }

    }

    const resetCodeRegExp = /^[0-9]{6}$/;

    let validationSchema = Yup.object({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,11}$/, 'Password start with uppercase , minlength is 6 and maxlength is 12').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "password and confirmPassword does not match").required('confirmPassword is required'),
        forgetCode: Yup.string().matches(resetCodeRegExp, 'Reset code is invalid').required('Reset code is required')
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            forgetCode: "",
        }, validationSchema,
        onSubmit: verifyCodeSubmit
    })

    return (
        <>
            <Helmet>
                <title>Verify-Code</title>
            </Helmet>
            <div className="container">
                <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

                    <h2 className='mb-4'>Please enter your verification code </h2>

                    {error ? <div className="alert alert-danger my-2">{error}</div> : ''}

                    <label htmlFor="email">Email :</label>
                    <input type="email" className='form-control px-2 mb-3' placeholder='email' id='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

                    <label htmlFor="password">Password :</label>
                    <input type="password" className='form-control px-2 mb-3' placeholder='password' id='password' name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}

                    <label htmlFor="confirmPassword">Confirm Password  :</label>
                    <input type="password" className='form-control px-2 mb-3' placeholder='confirmPassword' id='confirmPassword' name='confirmPassword' value={formik.values.confirmPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.confirmPassword}</div> : ''}

                    <label htmlFor="forgetCode">Forget Code :</label>
                    <input type="forgetCode" className='form-control px-2 mb-3' placeholder='Reset Code' id='forgetCode' name='forgetCode' value={formik.values.forgetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.forgetCode && formik.touched.forgetCode ? <div className="alert alert-danger p-2 mt-2">{formik.errors.forgetCode}</div> : ''}

                    {isLoading
                        ? <button type='button' className='btn btn-success d-block ms-auto '>
                            <i className='fas fa-spinner fa-spin px-3'></i>
                        </button>
                        :
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block ms-auto'>Verify</button>
                    }
                </form>
            </div>
        </>
    )
}
