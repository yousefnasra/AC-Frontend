import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className='res'>
        <Outlet />
      </div>

      <Offline>
        <span className='network rounded-pill d-flex align-items-center'>
          <i className="fa-solid fa-wifi me-1"></i> You are offline now
        </span>
      </Offline>
      
      <Footer />
    </>
  )
}
