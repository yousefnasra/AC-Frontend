import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";

export default function BrandSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    }

    function getCategories() {
        return axios.get(`https://ac-backend-zeta.vercel.app/brand/`)
    }

    let { data } = useQuery('BrandSlider', getCategories);

    return (
        <>
            {data?.data.results
                ? <div className='py-4 container'>
                    <Slider {...settings}>
                        {data?.data.results.map((brand) => <div key={brand._id} className='border-0' >
                            <img height={150} src={brand.image.url} alt={brand.name} className='w-100 mb-2' />
                            <p className='text-center fs-6'>{brand.name}</p>
                        </div>)}
                    </Slider>
                </div>
                : ''
            }
        </>
    )
}
