import React, { createContext, useContext, useEffect, useState } from 'react'
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductContext } from './ProductsContext';
import axios from 'axios';

export const CartContext = createContext();

const CartProvider = ({children}) => {
 const [cart,setCart] = useState({});
 const [totalQuantity,setTotalQuantity] = useState(0);
 const [totalPrice,setTotalPrice] = useState(0);                        
 const {products,token} = useContext(ProductContext)
 

 



 const url = process.env.URI;


 useEffect(() => {
    (async () => {
        if(token){
           await getCartData(token);
        }else{
            setCart('')
        }
    })()
 },[token])

const addToCart = async (id) =>{

    if(!token){
      return toast.error("Please Login")
    }
    if(!cart[id]){
        setCart((prev) => ({...prev,[id]:1}))
    }else{
        setCart((prev) => ({...prev,[id]:prev[id]+1}))
    }

    if(token){
        await axios.post(`${url}/api/cart/add`,{id},{headers:{token}})
    }

}



const removeFromCart = async (id) =>{

    if(!token){
       return toast.error("Please Login")
     }
 
    setCart((prev) => ({...prev,[id]:prev[id] -1}))

    if(token){
        await axios.post(`${url}/api/cart/remove`,{id},{headers:{token}})
    }
}


// ----- Clear All Cart =====
const clearCart = () =>{
    setCart({})
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
                    totalAmo += info?.price * cart[item]
                }
            }
        setTotalPrice(totalAmo);

    },[cart,token])


    const getCartData = async (token) => {

        const response = await axios.get(`${url}/api/cart/get`,{headers:{token}});
        setCart(response.data.cartData)
    }
  


    return (
   <CartContext.Provider value={{addToCart,removeFromCart,clearCart,totalQuantity,
    totalPrice,cart}}>
    {children}
   </CartContext.Provider>
  )
}

export default CartProvider