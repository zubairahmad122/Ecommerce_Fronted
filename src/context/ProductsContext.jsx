import React, { createContext, useContext, useEffect, useState } from 'react'

import { Allproducts } from '../assets/constants';
import axios from 'axios';
export const ProductContext = createContext();



const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading,SetLoading] = useState(false);
    const [token,setToken] = useState('')

    useEffect(() => {
        (async () => {
            SetLoading(true)
            try {
            await getProduct();
            const getTok = localStorage.getItem("token");
            if(getTok){
                setToken(getTok);
            }
            SetLoading(false)

            

            } catch (error) {
                console.log("Error")
            }
           
        })()
        



    }, [])

    const getProduct = async () => {
        const url = process.env.URI;
        try {
            const response = await axios.get(`${url}/api/product/list`)
            
            setProducts(response.data.data)
        } catch (error) {
            
        }
    }
  return (
    <ProductContext.Provider value={{products,loading,token,setToken}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductsProvider