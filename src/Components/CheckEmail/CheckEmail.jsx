import React from "react";
import { Link } from "react-router-dom";

function CheckEmail() {
  return (
    <div className="container py-3">
      <h2 className="my-4 fw-bold text-main text-center">Activate Your Account</h2>
      <div className="row flex-column align-items-center text-center">
        <div className="col-md-6 my-5">
          <h5 className="mb-3">Activation link has been sent to your email.</h5>
          <h5>Please Check Your Email Inbox.</h5>
          <div className="mt-4">
            <Link to={"/login"} className="btn text-white btn-success">Login Now</Link>
          </div>
        </div>
        <div className="col-md-6">     
            <h5>Can't find the email?</h5>
            <p className="text-main">It might have been sent to spam by mistake.</p>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;
