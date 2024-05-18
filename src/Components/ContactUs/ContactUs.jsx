import React from "react";

export default function ContactUs() {
  return (
    <div className="container py-5">
      <h2 className="mb-5 text-center fw-bold text-main">Contact Us</h2>
      <p className=" my-5 col-12 col-md-6 offset-md-3 text-center text-wrap">
        We're always here to help you with any queries or assistance you might
        need. Feel free to get in touch with us using the information below:
      </p>
      <div className="row text-center">
        <div className="col-sm-4">
          <i className="fa-solid fa-location-dot text-main"></i>
          <h4>Address</h4>

          <p>Hilton St.,Smouha, Alex</p>

        </div>
        <div className="col-sm-4">
          <i className="fa-solid fa-phone text-main"></i>
          <h4>Phone</h4>
          <p>+201005850333</p>
        </div>
        <div className="col-sm-4 ">
          <i className="fa-solid fa-envelope text-main"></i>
          <h4>Email</h4>
          <p>yassernasra212@gmail.com</p>
        </div>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.2558779794435!2d29.965897275262844!3d31.213639574355792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c50054ad4e71%3A0x347acdb5d926882a!2z2YrYp9iz2LEg2YbYtdix2Ycg2YTYo9is2YfYstipINin2YTYqtmD2YrYqNmB!5e0!3m2!1sen!2seg!4v1715186338935!5m2!1sen!2seg"
            title="location"
            className="w-100"
            height="450"
          ></iframe>
      </div>
    </div>
  );
}
