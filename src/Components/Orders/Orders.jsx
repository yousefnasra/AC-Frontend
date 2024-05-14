import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Orders() {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false)
    let headers = {
        token: "Bearer__" + localStorage.getItem('userToken')
    }

    async function getUserOrders() {
        setLoading(true)
        let { data } = await axios.get(`https://ac-backend-zeta.vercel.app/order`, { headers });
        if (data.results.order.length !== 0) {
            setOrders(data.results.order)
        }
        setLoading(false)
    }

    async function cancelOrder(productId) {
        setLoading(true);
        let response = await axios.patch(`https://ac-backend-zeta.vercel.app/order/${productId}`, {}, { headers });
        setLoading(false);
        if (response?.data?.success) {
            toast.success("Order canceled successfully", {
                className: "text-center font-sm",
            });
        } else {
            toast.error("something went wrong", { className: "text-center font-sm" });
        }
        getUserOrders()
    }

    useEffect(() => {
        getUserOrders()
    }, [])

    return (
        <>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <div className='container bg-main-light p-3'>
                <h3 className='mb-4 py-2'>Orders Status </h3>
                {orders
                    ?
                    <div className="p-3">
                        {orders.map((order) =>
                            <div className='border-bottom mb-3' key={order.id}>
                                <div className="text-center">
                                    <div className="d-inline-block mb-2 p-2 rounded-pill order-id">
                                        <span className="fw-bold">Order_ID: </span> <span className='text-main fw-semibold'>{order.id}</span>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-md-between align-items-md-center">
                                    <div>
                                        {order.products.map((product, index) =>
                                            <div className='mb-3 mb-md-2' key={index}>
                                                <Link to={`/productdetails/${product.productId._id}`}>
                                                    <div className="d-flex">
                                                        <div className='me-3'>
                                                            <img src={product.productId.defaultImage.url} alt={product.productId.name} width={80} />
                                                        </div>
                                                        <div>
                                                            <h5 className="fw-semibold">{product.name.split(' ').slice(0, 2).join(' ')}</h5>
                                                            <div className='d-flex flex-column d-md-block'>
                                                                <span className='me-3 text-muted font-sm'>HP: {product.productId.horsePower.split(' ')[0]}</span>
                                                                <span className='me-3 text-muted font-sm'>Qty: {product.quantity}</span>
                                                                <span className='text-main text-muted font-sm'>Price: {Intl.NumberFormat().format(product.itemPrice)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className='fw-semibold'>Status: <span className='text-main fw-medium'>{order.status === "visa payed" ? "shipped" : order.status}</span></p>
                                        <p className='fw-semibold'>Payment: <span className="text-main fw-medium">{order.payment}</span></p>
                                        <p className="fw-semibold">Total: <span className='text-main'>{Intl.NumberFormat().format(order.price)} EGP</span></p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-md-between align-items-md-center mt-md-2">
                                    <div>
                                        <h6 className="fw-semibold">Address: {order.address}</h6>
                                        <h6 className="fw-semibold">Phone: {order.phone}</h6>
                                    </div>
                                    <div className='d-flex flex-row-reverse'>
                                        {order.status !== "placed"
                                            ? ""
                                            : <button onClick={() => cancelOrder(order.id)} className="btn text-white btn-danger rounded-5 mb-3">Cancel</button>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    : <h4 className='text-main'>There are no orders yet.</h4>
                }
            </div>
            {loading ? <Loading></Loading> : ''}
        </>
    )
}
