import React from "react";
import img1 from "../../assets/images/Logos-01-removebg-preview.svg";
export default function Footer() {
  return (
    <footer className="py-5 mt-3  footer rounded-top-4">
      <div className="container">
        <h1 className="h4 fw-bold">Get the Yasser Nasra App</h1>
        <p className=" font-sm">
          we share this link Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ullam, delectus!
        </p>
        <div className="row g-2">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="share Link"
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100">shareLink</button>
          </div>
        </div>
        <div className="row border-bottom border-top g-3 my-2 align-items-center">
          <div className="col-md-6">
            <div className="d-flex justify-content-betwen align-items-center py-3">
              <p className="m-0 me-1 fw-bold font-sm">Payment Partners </p>
              <div className="payment-methods">
                <img src={img1} alt="Payment Methods" width={150} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="d-flex justify-content-start align-items-center">
              <p className="m-0 me-1 fw-bold font-sm">Get in Touch</p>
              <i className="mx-2 cursor-pointer fa-brands fa-instagram"></i>
              <i className="mx-2 cursor-pointer fa-brands fa-facebook"></i>
              <i className="mx-2 cursor-pointer fa-brands fa-tiktok"></i>
              <i className="mx-2 cursor-pointer fa-brands fa-twitter"></i>
              <i className="mx-2 cursor-pointer fa-brands fa-linkedin"></i>
              <i className="mx-2 cursor-pointer fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
