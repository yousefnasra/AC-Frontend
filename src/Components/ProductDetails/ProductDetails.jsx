import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function ProductDetails() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    pauseOnHover: true,
  };

  let { addProductToWishlist, setIsWished, isWished, removeProductFromWishlist } = useContext(WishListContext);
  let { addToCart, setCartItemsNum } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function addToWishlist(productId) {
    setLoading(true)
    let response = await addProductToWishlist(productId);
    setIsWished(response?.data?.results.wishlist.products.map((item) => item.productId));
    if (response?.data?.success) {
      toast.success("Product added successflly to wishList",
        { className: 'text-center font-sm' });
    } else {
      toast.error("please login first",
        { className: 'text-center font-sm' });
    }
    setLoading(false)
  }

  async function removeFromWishlist(productId) {
    setLoading(true)
    let response = await removeProductFromWishlist(productId);
    setIsWished(response?.data?.results.wishlist.products.map((item) => item.productId));
    if (response?.data?.success) {
      toast.success("Product removed successflly", {
        className: "text-center font-sm",
      });
    } else {
      toast.error("please login first",
        { className: 'text-center font-sm' });
    }
    setLoading(false)
  }

  async function addProductToCart(productId) {
    setLoading(true);
    let response = await addToCart(productId);
    setLoading(false);
    if (response?.data?.success) {
      toast.success("Product added successflly to cart", {
        className: "text-center font-sm",
      });
    } else if (response?.response.data.message === "jwt malformed") {
      setCartItemsNum(0);
      return toast.error("please login first", { className: "text-center font-sm" });
    } else {
      return toast.error(`${response.response.data.message}\ncheck your cart.`, { className: "text-center font-sm" });
    }
    setCartItemsNum(response?.data?.results.cart.products.length);
  }

  let { id } = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ac-backend-zeta.vercel.app/product/${id}`);
  }

  let { data, isLoading } = useQuery("productDetails", () =>
    getProductDetails(id)
  );
  return (
    <>
      {!isLoading ? (
        <div className="container py-5">
          <Helmet>
            <meta
              name="description"
              content={data?.data.results.product.description}
            />
            <title>{data?.data.results.product.name}</title>
          </Helmet>
          <div className="row py-2 ">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="product-img p-3">
                <Slider {...settings}>
                  {data?.data.results.product.images.map((img, index) => (
                    <img
                      src={img.url}
                      alt={data?.data.results.product.name}
                      className="w-100"
                      key={index}
                    />
                  ))}
                </Slider>
              </div>
            </div>
            <div className="col-md-8">
              <div className="product-details">
                <h2 className="h4 mb-4 text-black fw-semibold">
                  {data?.data.results.product.name}
                </h2>
                <div>
                  <p className="border-bottom py-2">
                    <span className="fw-semibold">Brand: </span>
                    {data?.data.results.product.name
                      .split(" ")
                      .slice(0, 1)
                      .join(" ")}
                  </p>

                  <p className="border-bottom py-2"><span className="fw-semibold">Model name: </span> {data?.data.results.product.modelName}</p>
                  <p className="border-bottom py-2">
                    <span className="fw-semibold">cooling System: </span>
                    {data?.data.results.product.coolingSystemType}
                  </p>
                  <p className="border-bottom py-2"><span className="fw-semibold">Horse power: </span> {data?.data.results.product.horsePower}</p>
                  <p className="border-bottom py-2"><span className="fw-semibold">Color: </span> {data?.data.results.product.color}</p>
                  <p className="border-bottom py-2"><span className="fw-semibold">Area: </span> {data?.data.results.product.coverageArea}</p>
                  <p className="border-bottom py-2"><span className="fw-semibold">Inverter: </span> {data?.data.results.product.inverterFunction ? "Yes" : "No"}</p>
                  <p className="border-bottom py-2"><span className="fw-semibold">Plasma: </span> {data?.data.results.product.plasmaFunction ? "Yes" : "No"}</p>
                  <p className="border-bottom py-2"><span className="fw-semibold">Turbo: </span> {data?.data.results.product.turboFunction ? "Yes" : "No"}</p>
                </div>
                <h6 className="text-main fw-semibold py-2">Price: {Intl.NumberFormat().format(data?.data.results.product.price)}{" "}EGP</h6>
                <h6 className="text-main fw-semibold">Available Items: {data?.data.results.product.availableItems}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-main fw-semibold">Ratings Quantity: {data?.data.results.product.soldItems}</span>
                  <span><i className="fa-solid fa-star rating-color me-1"></i>{data?.data.results.product.averageRate}</span>
                </div>
                <div className="my-3 d-flex justify-content-between align-items-center me-2">
                  {data?.data.results.product.availableItems === 0
                    ? <button className="btn text-white btn-success w-75" disabled>Out Of Stock</button>
                    : <button onClick={() => addProductToCart(data?.data.results.product.id)} className="btn btn-success w-75">Add to cart</button>}
                  {!isWished?.includes(data?.data.results.product._id)
                    ? <i onClick={() => addToWishlist(data?.data.results.product._id)} className="fa-regular fa-heart text-main fa-xl cursor-pointer"></i>
                    : <i onClick={() => removeFromWishlist(data?.data.results.product._id)} className="fa-solid fa-heart text-main fa-xl cursor-pointer"></i>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
      {loading ? <Loading></Loading> : ""}
    </>
  );
}
