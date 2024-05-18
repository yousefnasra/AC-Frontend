import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/Asset.png'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import styles from "./Navbar.module.css"



export default function Navbar() {

  let { userToken, setUserToken } = useContext(UserContext);
  let { cartItemsNum } = useContext(CartContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
    setIsNavCollapsed(true)
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to='/' onClick={() => setIsNavCollapsed(true)}>
          <img src={logo} alt="Yasser Nasra logo" className={styles.logo} />
        </Link>

        <button className="navbar-toggler d-lg-none" type="button" onClick={handleNavCollapse} aria-expanded={!isNavCollapsed} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="collapsibleNavId">


          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink to='/' className="nav-link" onClick={() => setIsNavCollapsed(true)}>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to='wishlist' className="nav-link" onClick={() => setIsNavCollapsed(true)} >Wishlist</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to='allorders' className="nav-link" onClick={() => setIsNavCollapsed(true)}>Orders</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='contactus' className="nav-link" onClick={() => setIsNavCollapsed(true)}>Contact Us</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item position-relative mx-auto my-1 my-md-0">
              <Link to='cart' className="nav-link" onClick={() => setIsNavCollapsed(true)}>
                <i className="fa-solid fa-cart-shopping fs-3"></i>
                <div className="badge position-absolute text-white top-0 end-0 bg-main">{cartItemsNum}</div>
              </Link>
            </li>
            {userToken ?
              <>
                <li className="nav-item mx-auto ms-md-2">
                  <span onClick={() => logOut()} className="nav-link cursor-pointer" >Logout</span>
                </li>
              </>
              : <>
                <li className="nav-item">
                  <Link to='login' className="nav-link" onClick={() => setIsNavCollapsed(true)}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link to='register' className="nav-link" onClick={() => setIsNavCollapsed(true)}>Register</Link>
                </li>
              </>
            }

          </ul>

        </div>
      </div>
    </nav>

  )
}
