import React, { createContext, useContext, useEffect, useState } from 'react'
import { ProductContext } from './ProductsContext';
import axios from 'axios';

export const CartContext = createContext();

const GUEST_CART_KEY = 'guestCart'

// guest cart lives in localStorage until the user logs in
const readGuestCart = () => {
    try {
        return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || {}
    } catch {
        return {}
    }
}

const writeGuestCart = (cart) => {
    try {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart))
    } catch {}
}

const CartProvider = ({children}) => {
 const [cart,setCart] = useState({});
 const [cartLoading,setCartLoading] = useState(false);
 const [totalQuantity,setTotalQuantity] = useState(0);
 const [totalPrice,setTotalPrice] = useState(0);
 const {products,token} = useContext(ProductContext)

 const url = import.meta.env.VITE_URI;


 useEffect(() => {
    (async () => {
        if(!token){
            setCart(readGuestCart())
            return
        }
        setCartLoading(true)
        try {
            // move guest items into the user's cart, then load it
            const guestCart = readGuestCart()
            if (Object.values(guestCart).some(q => q > 0)) {
                await axios.post(`${url}/api/cart/merge`,{items:guestCart},{headers:{token}})
                localStorage.removeItem(GUEST_CART_KEY)
            }
            await getCartData(token);
        } catch (error) {
            console.log(error)
        } finally {
            setCartLoading(false)
        }
    })()
 },[token])

// functional update so repeated calls (e.g. remove-all loop) stay correct
const updateCart = (fn) => {
    setCart(prev => {
        const next = fn(prev)
        if(!token) writeGuestCart(next)
        return next
    })
}

const addToCart = async (id) =>{
    updateCart(prev => ({...prev,[id]:(prev[id] || 0) + 1}))
    if(!token) return
    await axios.post(`${url}/api/cart/add`,{id},{headers:{token}})
}



const removeFromCart = async (id) =>{
    if (!cart[id]) return
    updateCart(prev => ({...prev,[id]:Math.max((prev[id] || 0) - 1, 0)}))
    if(!token) return
    await axios.post(`${url}/api/cart/remove`,{id},{headers:{token}})
}


// ----- Clear All Cart =====
const clearCart = () =>{
    setCart({})
    if(!token) localStorage.removeItem(GUEST_CART_KEY)
    }



    useEffect(() =>{
            let totalQ = 0;
            for(const item in cart){
                totalQ +=  cart[item]
            }
            setTotalQuantity(totalQ);

            let totalAmo = 0;
            for(const item in cart){
                if(cart[item] > 0 ){
                    let info = products.find((product) => product._id === item)
                    totalAmo += (info?.price || 0) * cart[item]
                }
            }
        setTotalPrice(totalAmo);

    },[cart,products])


    const getCartData = async (token) => {

        const response = await axios.get(`${url}/api/cart/get`,{headers:{token}});
        setCart(response.data.cartData || {})
    }



    return (
   <CartContext.Provider value={{addToCart,removeFromCart,clearCart,totalQuantity,
    totalPrice,cart,cartLoading}}>
    {children}
   </CartContext.Provider>
  )
}

export default CartProvider
