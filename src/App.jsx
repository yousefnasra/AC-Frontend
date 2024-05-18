import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ContactUs from './Components/ContactUs/ContactUs'
import NotFound from './Components/NotFound/NotFound'
import { useContext, useEffect } from 'react'
import { UserContext } from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Address from './Components/Address/Address'
import Orders from './Components/Orders/Orders'
import WishListContextProvider from './Context/WishListContext'
import WishList from './Components/WishList/WishList'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import CheckEmail from './Components/CheckEmail/CheckEmail'


const routes = createBrowserRouter([
  {
    path: '', element: <Layout></Layout>, children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProductDetails /> },
      { path: 'contactus', element: <ContactUs /> },
      { path: 'address', element: <ProtectedRoute><Address /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /> </ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'verifycode', element: <VerifyCode /> },
      { path: 'checkemail', element: <CheckEmail /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

export default function App() {

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, []);

  return (
    <>
      <CartContextProvider>

        <WishListContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </WishListContextProvider>

        <Toaster />

      </CartContextProvider >
    </>
  )
}

