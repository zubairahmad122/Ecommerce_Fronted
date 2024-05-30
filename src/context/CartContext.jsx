import React, { createContext, useContext, useEffect, useState } from 'react'
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductContext } from './ProductsContext';

export const CartContext = createContext();

const CartProvider = ({children}) => {
 const [cart,setCart] = useState({});
 const [totalQuantity,setTotalQuantity] = useState(0);
 const [totalPrice,setTotalPrice] = useState(0);                        
 const {products} = useContext(ProductContext)

 



 
const addToCart = (id) =>{
    if(!cart[id]){
        setCart((prev) => ({...prev,[id]:1}))
    }else{
        setCart((prev) => ({...prev,[id]:prev[id]+1}))
    }

}



const removeFromCart = (id) =>{
    setCart((prev) => ({...prev,[id]:prev[id] -1}))
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

    },[cart])
  


    return (
   <CartContext.Provider value={{addToCart,removeFromCart,clearCart,totalQuantity,
    totalPrice,cart}}>
    {children}
   </CartContext.Provider>
  )
}

export default CartProvider