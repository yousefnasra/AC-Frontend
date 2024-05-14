import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function WishList() {

    let headers = {
        token: "Bearer__" + localStorage.getItem('userToken')
    }
    let { addToCart, setCartItemsNum } = useContext(CartContext);
    let { removeProductFromWishlist, setIsWished } = useContext(WishListContext);
    const [loading, setLoading] = useState(false)

    function getLoggedWishlist() {
        return axios.get(`https://ac-backend-zeta.vercel.app/wishlist/`, {
            headers
        })
    }

    let { data, isLoading, refetch } = useQuery('wishList', getLoggedWishlist)

    async function removeFromWishlist(productId) {
        setLoading(true)
        let response = await removeProductFromWishlist(productId);
        setIsWished(response?.data?.results.wishlist.products.productId);
        if (response?.data?.success) {
            refetch();
        } else {
            toast.error("something went wrong!",
                { className: 'text-center font-sm' });
        }
        setLoading(false)
    }

    async function addProductToCart(productId) {
        setLoading(true)
        let response = await addToCart(productId);
        if (response?.data?.success) {
            removeFromWishlist(productId);
        } else {
            toast.error("something went wrong!",
                { className: 'text-center font-sm' });
        }
        setCartItemsNum(response?.data?.results.cart.products.length)
        setLoading(false);
    }

    return (
        <>
            <Helmet>
                <title>Wish List</title>
            </Helmet>
            <div className="w-75 mx-auto bg-main-light p-3">
                <h3 className='my-4 py-2'>My Wish List </h3>
                {isLoading
                    ? <Loading></Loading>
                    : data?.data.results.wishlist.products.map((wish, index) =>
                        <div className='row border-bottom p-3' key={index}>
                            <div className="col-md-2 ">
                                <Link to={`/productdetails/${wish.productId._id}`}>
                                    <img src={wish.productId.defaultImage.url} alt={wish.productId.name} className='w-100' />
                                </Link>
                            </div>
                            <div className="col-md-10 my-2 my-md-0">
                                <div className="d-md-flex justify-content-between align-items-center">
                                    <div>
                                        <Link to={`/productdetails/${wish.productId._id}`}>
                                            <h3 className='h6 fw-semibold'>{wish.productId.name.split(' ').slice(0, 2).join(' ')}</h3>
                                            <h6 className='mb-3 fw-semibold'>Price : <span className='fw-bolder text-main'>{Intl.NumberFormat().format(wish.productId.price)} EGP</span></h6>
                                        </Link>
                                        <button onClick={() => removeFromWishlist(wish.productId._id)} className='btn border-0  p-0 mb-3'><i className='fas fa-trash-can text-danger'></i> Remove </button>
                                    </div>
                                    <div className='d-flex flex-row-reverse'>
                                        {wish.productId.availableItems === 0
                                            ? <button className="btn text-white btn-success" disabled>Out Of Stock</button>
                                            : <button onClick={() => addProductToCart(wish.productId._id)} className='btn btn-success fw-bolder'>Add to cart</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {loading ? <Loading></Loading> : ''}
        </>
    )
}
