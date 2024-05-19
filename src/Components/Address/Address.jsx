import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Address() {

    let navigate = useNavigate();
    let { onlinePayment } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false);
    const phoneRegExp = /^(002)?01[0-25][0-9]{8}$/;


    async function addressSubmit(values) {
        setIsLoading(true)
        let response = await onlinePayment(values);
        if (response?.response?.data.success === false) {
            setIsLoading(false);
            toast.error(`${response.response.data.message}\n update your cart`, {
                className: "text-center font-sm",
            });
            navigate('/cart');
        } else {
            if (response?.data.success && values.payment === "visa") {
                setIsLoading(false)
                window.location.href = response.data.results.url;
            } else if (response.data.success && values.payment === "cash") {
                setIsLoading(false)
                toast.success("order submitted successflly", {
                    className: "text-center font-sm",
                });
                navigate('/allorders');
            }
            setIsLoading(false)
        }
    }

    let validationSchema = Yup.object({
        address: Yup.string().min(10, 'address minlength is 10').max(100, 'address maxlength is 100').required('address is required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone is invalid').required('Phone is required'),
        // coupon: Yup.string().length(6, 'coupon is invalid'),
        payment: Yup.string().required()
    })

    const formik = useFormik({
        initialValues: {
            address: "",
            phone: "",
            // coupon: "",
            payment: ""
        }, validationSchema,
        onSubmit: addressSubmit
    })

    return (
        <>
            <Helmet>
                <title>User Address</title>
            </Helmet>
            <div className="container">
                <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

                    <h2 className='mb-4 fw-bold'>Shipping Details</h2>

                    <label htmlFor="address">Address :</label>
                    <input type="text" className='form-control px-2 mb-3' placeholder='Address Details' id='address' name='address' value={formik.values.address} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.address && formik.touched.address ? <div className="alert alert-danger p-2 mt-2">{formik.errors.address}</div> : ''}

                    <label htmlFor="phone">Phone :</label>
                    <input type="tel" className='form-control px-2 mb-3' placeholder='phone' id='phone' name='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div> : ''}

                    {/* <label htmlFor="coupon">Coupon :</label>
                    <input type="text" className='form-control px-2 mb-3' placeholder='coupon' id='coupon' name='coupon' value={formik.values.coupon} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.coupon && formik.touched.coupon ? <div className="alert alert-danger p-2 mt-2">{formik.errors.coupon}</div> : ''} */}

                    <label htmlFor="payment" className='fw-bold'>Payment Type :</label>
                    <div className="form-check mt-2 d-flex align-items-center">
                        <input className="form-check-input me-2 mt-1" type="radio" name="payment" id="cash" value="cash" onChange={formik.handleChange} checked={formik.values.payment === "cash"} />
                        <label className="form-check-label mb-2" htmlFor="cash"><span className='fs-2'>💰</span> Cash</label>
                    </div>

                    <div className="form-check mt-2 d-flex align-items-center">
                        <input className="form-check-input me-2 mt-1" type="radio" name="payment" id="visa" value="visa" onChange={formik.handleChange} checked={formik.values.payment === "visa"} />
                        <label className="form-check-label mb-2" htmlFor="visa"><span className='fs-2'>💳</span> Pay with visa</label>
                    </div>

                    {isLoading
                        ? <button type='button' className='btn btn-success d-block mx-auto mt-5'>
                            <i className='fas fa-spinner fa-spin px-3'></i>
                        </button>
                        : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block mx-auto mt-5'>Pay Now</button>
                    }

                </form>
            </div>
        </>
    )
}
