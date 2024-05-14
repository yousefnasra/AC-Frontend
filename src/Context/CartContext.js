import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let CartContext = createContext();


export default function CartContextProvider({ children }) {
    const [cartItemsNum, setCartItemsNum] = useState(0);
    let headers = {
        token: "Bearer__" + localStorage.getItem('userToken')
    }
    const baseUrl = 'https://ac-backend-zeta.vercel.app/cart'

    function addToCart(productId) {
        return axios.post(baseUrl,
            {
                productId,
                quantity: 1
            },
            {
                headers
            }
        ).then((response) => response)
            .catch((error) => error)
    }

    function getLoggedUserCart() {
        return axios.get(baseUrl,
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function removeCartItem(productId) {
        return axios.patch(`https://ac-backend-zeta.vercel.app/cart/${productId}`, {},
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function clearCartItems() {
        return axios.put(`https://ac-backend-zeta.vercel.app/cart/`, {},
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function updateProductQuantity(productId, quantity) {
        return axios.patch(baseUrl,
            {
                productId,
                quantity
            },
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function onlinePayment(values) {
        return axios.post(`https://ac-backend-zeta.vercel.app/order`, values
            , {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    const [cartId, setCartId] = useState(null)

    async function getCart() {
        let { data } = await getLoggedUserCart();
        setCartId(data?.results._id)
    }

    useEffect(() => {
        getCart()
    }, [])

    return <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem, cartItemsNum, setCartItemsNum, onlinePayment, cartId, updateProductQuantity, clearCartItems }}>
        {children}
    </CartContext.Provider>
}