import React from 'react'
import slider1 from "../../assets/images/banner_02-Recovered-Recovered.webp"
import banner1 from "../../assets/images/istockphoto-1382187816-612x612.webp"
import banner2 from "../../assets/images/istockphoto-1464462569-612x612.webp"
import Slider from 'react-slick'

export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        pauseOnHover: false
    };

    return (
        <div className="container">
            <div className="row gx-0">
                <div className="col-md-10 col-12">
                    <Slider {...settings}>
                        <img height={300} src={slider1} alt="hero one" className='w-100' />
                        <img height={300} src={slider1} alt="hero two" className='w-100' />
                    </Slider >
                </div>
                <div className="col-md-2 col-12">
                    <div className="row gx-0">
                        <div className="col-md-12 col-6">
                            <img height={150} src={banner1} alt="banner one" className='w-100' />
                        </div>
                        <div className="col-md-12 col-6">
                            <img height={150} src={banner2} alt="banner two" className='w-100' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
