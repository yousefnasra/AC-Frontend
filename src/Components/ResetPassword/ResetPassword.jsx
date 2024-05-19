import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { UserContext } from '../../Context/UserContext'

export default function ResetPassword() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let { isBlocked, setIsBlocked } = useContext(UserContext);

    async function resetPasswordSubmit(values) {

        setIsLoading(true)

        let { data } = await axios.patch(`https://ac-backend-zeta.vercel.app/auth/forgetCode`, values)
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })

        if (data.success === true) {
            setIsLoading(false)
            if (isBlocked > 4) {
                setIsBlocked(0);
            }
            navigate('/verifycode')
        }

    }

    let validationSchema = Yup.object({
        email: Yup.string().email('Email is invalid').required('Email is required'),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
        }, validationSchema,
        onSubmit: resetPasswordSubmit
    })

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className="container">
                <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

                    <h2 className='mb-4'>Please enter your email </h2>

                    {error ? <div className="alert alert-danger my-2">{error}</div> : ''}

                    <label htmlFor="email">Email :</label>
                    <input type="email" className='form-control px-2 mb-3' placeholder='email' id='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

                    {isLoading
                        ? <button type='button' className='btn btn-success d-block ms-auto '>
                            <i className='fas fa-spinner fa-spin px-3'></i>
                        </button>
                        :
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block ms-auto'>Send</button>
                    }
                </form>
            </div>
        </>
    )
}
