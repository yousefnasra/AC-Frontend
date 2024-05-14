import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading";
import styles from "./FP.module.css";
import { WishListContext } from "../../Context/WishListContext";
import Pagination from "../Pagination/Pagination";
import PriceFilter from "../PriceFilter/PriceFilter";
import BrandFilter from "../BrandFilter/BrandFilter";
import PowerFilter from "../PowerFilter/PowerFilter";


export default function FeaturedProducts() {
  let { addToCart, setCartItemsNum, getLoggedUserCart } = useContext(CartContext);
  let { addProductToWishlist, setIsWished, isWished, removeProductFromWishlist } = useContext(WishListContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPower, setSelectedPower] = useState([]);


  async function addProductToCart(productId) {
    setLoading(true);
    let response = await addToCart(productId);
    setLoading(false);
    if (response?.data?.success) {
      toast.success("Product added successflly to cart", {
        className: "text-center font-sm",
      });
    } else {
      toast.error("please login first", { className: "text-center font-sm" });
    }
    setCartItemsNum(response?.data?.results.cart.products.length);
  }

  async function addToWishlist(productId) {
    setLoading(true);
    let response = await addProductToWishlist(productId);
    setIsWished(response?.data?.results.wishlist.products.map((item) => item.productId));
    if (response?.data?.success) {
      toast.success("Product added successflly to wishList", {
        className: "text-center font-sm",
      });
    } else {
      toast.error("please login first", { className: "text-center font-sm" });
    }
    setLoading(false);
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

  function getProducts() {
    return axios.get(`https://ac-backend-zeta.vercel.app/product`);
  }

  let { data, isLoading } = useQuery("featuredProducts", getProducts);
  const totalItems = data?.data.results.length;

  data = data?.data.results.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase()));

  // Apply brand filter only if brands are selected
  if (selectedBrands.length > 0) {
    data = data?.filter((product) =>
      selectedBrands.includes(product.name.split(" ")[0])
    );
  }
  const brands = ["Carrier", "Sharp", "Unionaire", "Beko", "Tornado", "General"]

  if (selectedPower.length > 0) {
    data = data?.filter((product) =>
      selectedPower.includes(product.horsePower)
    );
  }
  const powers = ["1.5 hp", "2.25 hp", "3 hp", "4 hp", "5 hp", "7.5 hp"]

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem)
  data = currentItems;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  data = data?.filter((product) =>
    product.price <= maxPrice);

  async function getCart() {
    try {
      let { data } = await getLoggedUserCart();
      if (data?.success) {
        setCartItemsNum(data?.results.cart.products.length);
      }
    } catch (error) {
      setCartItemsNum(0);
    }
  }

  let headers = {
    token: "Bearer__" + localStorage.getItem("userToken"),
  };

  async function getLoggedWishlist() {
    try {
      let { data } = await axios.get(
        `https://ac-backend-zeta.vercel.app/wishlist`,
        {
          headers,
        }
      );
      setIsWished(data?.results?.wishlist.products.map((item) => item.productId.id));
    } catch (error) {

    }
  }

  useEffect(() => {
    getLoggedWishlist();
    getCart();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center justify-content-md-start justify-content-xl-center">
          <h2 className='my-4 text-center'>AIR CONDITIONERS</h2>
          <div className="filter d-flex justify-content-between align-items-center mt-2 mb-3">
            <input type='text' placeholder='Search' className='form-control w-100' onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
            {/* Tap */}
            <div className="nav nav-pills dropdown ps-3">
              <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filter
              </button>
              <ul className="dropdown-menu bg-" id="pills-tab" role="tablist">
                <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} setCurrentPage={setCurrentPage}></PriceFilter>
                <BrandFilter brands={brands} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} setCurrentPage={setCurrentPage}></BrandFilter>
                <PowerFilter powers={powers} selectedPower={selectedPower} setSelectedPower={setSelectedPower} setCurrentPage={setCurrentPage}></PowerFilter>
              </ul>
            </div>
          </div>
          <p className="text-muted">{data?.length} of {totalItems} products</p>
          {data?.length === 0
            ? <div className="p-5 my-5 bg-main-light">
              <h3 className='text-center fw-bold h6'>No Products Found</h3>
            </div>
            : ""}
          {isLoading ? (
            <Loading></Loading>
          ) : (
            data?.map((prod) => (
              <div key={prod._id} className={styles.card}>
                <div>
                  <Link to={`productdetails/${prod._id}`}>
                    <img
                      src={prod.defaultImage.url}
                      className={styles.img}
                      alt="product name"
                    />
                    <h4 className={styles.name}>
                      {prod.name.split(" ").slice(0, 7).join(" ")}....
                    </h4>
                    <p className="my-3">Available Items: {prod.availableItems}</p>
                    <div className={styles.price}>
                      <span className="">{Intl.NumberFormat().format(prod.price)} EGP</span>
                      <p>
                        {prod.averageRate} <i className="fa-solid fa-star rating-color"></i>
                      </p>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center my-3">
                    {prod.availableItems === 0
                      ? <button className="btn text-white btn-success" disabled>Out Of Stock</button>
                      : <button onClick={() => addProductToCart(prod._id)} className="btn  text-white btn-success">Add to Cart</button>}
                    {!isWished?.includes(prod._id)
                      ? <i onClick={() => addToWishlist(prod._id)} className="fa-regular fa-heart text-main fa-xl cursor-pointer"></i>
                      : <i onClick={() => removeFromWishlist(prod._id)} className="fa-solid fa-heart text-main fa-xl cursor-pointer"></i>}

                  </div>
                </div>
              </div>
            ))
          )}
          <Pagination itemPerPage={itemPerPage} totalItems={totalItems} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
      {loading ? <Loading></Loading> : ""}
    </>
  );
}
