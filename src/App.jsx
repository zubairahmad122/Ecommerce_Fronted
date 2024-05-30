import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RotatingSquare } from 'react-loader-spinner';
import { Home, Products, ProductDetail, Cart, Checkout, Login, Register } from './pages';
import { Footer } from './components/index';
import { ProductContext } from './context/ProductsContext';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const { loading } = useContext(ProductContext);
  const [homeLoader, setHomeLoader] = useState(false);



  
  useEffect(() => {
    setTimeout(() => {
      setHomeLoader(true)
    }, 1000)
  
  }, [])
 
  return (
   <>
    <div className={`w-full h-[100vh] flex items-center justify-center ${loading || !homeLoader ? '' : 'hidden'}`}>
    <RotatingSquare
      visible={true}
      height={100}
      width={100}
      color="#0000ff"
      ariaLabel="rotating-square-loading"
    />
  </div>
  <div className={` ${loading || !homeLoader ? 'hidden' : ''}`}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </Router>
  </div>
   </>
  


  )
}

export default App