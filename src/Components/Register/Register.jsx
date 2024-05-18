import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function Register() {

  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function resgisterSubmit(values) {
    setIsLoading(true)

    let { data } = await axios.post(`https://ac-backend-zeta.vercel.app/auth/register`, values)
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      });

    if (data.success === true) {
      setIsLoading(false)
      toast.success("Account Created Successflly", {
        className: "text-center font-sm",});
      navigate('/checkemail');
    }

  }

  let validationSchema = Yup.object({
    userName: Yup.string().min(3, 'Name minlength is 3').max(15, 'Name maxlength is 15').required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,11}$/, 'Password start with uppercase , minlength is 6 and maxlength is 12').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "password and confirmPassword does not match").required('confirmPassword is required'),
  })

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }, validationSchema,
    onSubmit: resgisterSubmit
  })

  return (
    <>
      <Helmet>
        <title>Register Now</title>
      </Helmet>
      <div className="container">
        <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

          {error ? <div className="alert alert-danger">{error}</div> : ''}
          <h2 className='mb-4'>Register Now</h2>

          <label htmlFor="userName">User Name :</label>
          <input type="text" className='form-control px-2 mb-3' placeholder='userName' id='userName' name='userName' value={formik.values.userName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.userName && formik.touched.userName ? <div className="alert alert-danger p-2 mt-2">{formik.errors.userName}</div> : ''}

          <label htmlFor="email">Email :</label>
          <input type="email" className='form-control px-2 mb-3' placeholder='email' id='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

          <label htmlFor="password">Password :</label>
          <input type="password" className='form-control px-2 mb-3' placeholder='password' id='password' name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}

          <label htmlFor="confirmPassword">Confirm Password  :</label>
          <input type="password" className='form-control px-2 mb-3' placeholder='confirmPassword' id='confirmPassword' name='confirmPassword' value={formik.values.confirmPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.confirmPassword}</div> : ''}

          {isLoading
            ? <button type='button' className='btn btn-success d-block ms-auto '>
              <i className='fas fa-spinner fa-spin px-3'></i>
            </button>
            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block ms-auto'>Register</button>
          }
        </form>
      </div>
    </>
  )
}
