import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
export const ProductContext = createContext();

const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, SetLoading] = useState(false);
    const [token, setToken] = useState('')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        (async () => {
            SetLoading(true)
            try {
                await getProduct();
                const getTok = localStorage.getItem("token");
                if (getTok) setToken(getTok);
                SetLoading(false)
            } catch (error) {
                console.log("Error")
            }
        })()
    }, [])

    // fetch user name whenever token changes
    useEffect(() => {
        if (!token) { setUserName(''); return }
        const url = import.meta.env.VITE_URI;
        axios.get(`${url}/api/user/profile`, { headers: { token } })
            .then(res => { if (res.data.success) setUserName(res.data.user.name) })
            .catch(() => {})
    }, [token])

    const getProduct = async () => {
        const url = import.meta.env.VITE_URI;
        try {
            const response = await axios.get(`${url}/api/product/list`)
            setProducts(response.data.data)
        } catch (error) {}
    }

    return (
        <ProductContext.Provider value={{products, loading, token, setToken, userName, setUserName}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductsProvider
