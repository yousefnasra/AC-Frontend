import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart home</title>
      </Helmet>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <FeaturedProducts></FeaturedProducts>
    </>
  )
}
