import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Loading from '../Loading'


export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateProductQuantity, setCartItemsNum, clearCartItems } = useContext(CartContext);
  const [dataDetails, setDataDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function removeItem(id) {
    setIsLoading(true)
    let { data } = await removeCartItem(id);
    const sum = data?.results.cart.products.reduce((acc, item) => {
      const productPrice = item.productId.price;
      const quantity = item.quantity;
      return acc + (productPrice * quantity);
    }, 0);
    setTotalPrice(sum);
    setDataDetails(data)
    setCartItemsNum(data?.results.cart.products.length)
    setIsLoading(false)
  }

  async function clearCart() {
    setIsLoading(true)
    let { data } = await clearCartItems();
    setTotalPrice(0);
    setDataDetails(data)
    setCartItemsNum(data?.results.cart.products.length)
    setIsLoading(false)
  }

  async function getCart() {
    setIsLoading(true)
    let { data } = await getLoggedUserCart();
    const sum = data?.results.cart.products.reduce((acc, item) => {
      const productPrice = item.productId.price;
      const quantity = item.quantity;
      return acc + (productPrice * quantity);
    }, 0);
    setTotalPrice(sum)
    if (data?.success) {
      setDataDetails(data)
      setCartItemsNum(data?.results.cart.products.length)
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  async function updateCount(id, quantity) {
    if (quantity === 0) {
      removeItem(id);
    } else {
      setIsLoading(true)
      let { data } = await updateProductQuantity(id, quantity);
      const sum = data?.results.cart.products.reduce((acc, item) => {
        const productPrice = item.productId.price;
        const quantity = item.quantity;
        return acc + (productPrice * quantity);
      }, 0);
      setTotalPrice(sum)
      setDataDetails(data)
      setCartItemsNum(data?.results.cart.products.length)
      setIsLoading(false)
    }
  }
  useEffect(() => { getCart() }, [])

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="w-75 mx-auto bg-main-light p-3">
        <h3 className='mb-4 py-2'>Shopping Cart </h3>
        <>
          <h4 className='h6 text-center fw-bolder'>Number of Products : <span className='h6 text-main fw-bolder'>{dataDetails?.results.cart.products.length}</span></h4>
          <h4 className='h6 text-center fw-bolder mb-2'>Total Cart Price : <span className='h6 text-main fw-bolder'>{Intl.NumberFormat().format(totalPrice)} EGP</span></h4>
          {dataDetails && dataDetails?.results.cart.products.length !== 0 ?
            <div className='d-flex flex-row-reverse border-bottom border-top'>
              <button onClick={() => clearCart()} className='btn btn-danger my-2'>Clear Cart</button>
            </div>
            : ""}
          {dataDetails && dataDetails?.results.cart.products.length !== 0 ?
            <>
              {dataDetails?.results?.cart.products.map((product, index) =>
                <div className='row border-bottom p-2' key={index}>

                  <div className="col-md-2 d-flex align-items-center">
                    <Link to={`/productdetails/${product.productId._id}`}>
                      <img src={product.productId.defaultImage.url} alt={product.productId.name} className='w-100' />
                    </Link>
                  </div>

                  <div className="col-md-10">
                    <div className="d-flex justify-content-between align-align-items-center">
                      <div className='p-md-3 mt-3'>
                        <Link to={`/productdetails/${product.productId._id}`}>
                          <h5 className='h6 fw-semibold'>{product.productId.name.split(' ').slice(0, 2).join(' ')}</h5>
                          <h6 className='mb-3 fw-semibold'>Power : {product.productId.horsePower}</h6>
                          <h6 className='mb-3 fw-semibold'>Price : <span className='fw-bolder text-main'>{Intl.NumberFormat().format(product.productId.price)} EGP</span></h6>
                        </Link>
                        <button onClick={() => removeItem(product.productId.id)} className='btn border-0  p-0 mt-2'><i className='fas fa-trash-can text-danger'></i> Remove </button>
                      </div>
                      <div className='d-flex flex-column p-3 justify-content-center align-items-center'>
                        <button onClick={() => updateCount(product.productId.id, product.quantity + 1)} className='border-main rounded-2 p-2 fw-bolder'>+</button>
                        <span className='my-2'>{product.quantity}</span>
                        <button onClick={() => updateCount(product.productId.id, product.quantity - 1)} className='border-main rounded-2 p-2 fw-bolder'>-</button>
                      </div>
                    </div>
                  </div>
                </div>)}
              <Link to='/address' className='btn btn-success mx-auto my-4 d-block'>Check Out</Link>
            </>
            : <h3 className='mt-5 text-center fw-bold h6'><i className="fa-solid fa-cart-shopping fa-xl me-2 text-main"></i> Your Cart Is Empty</h3>}
        </ >
        {isLoading ?
          <Loading></Loading> : ''
        }
      </div>
    </>
  )
}
