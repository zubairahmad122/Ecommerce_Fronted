import React, { useContext, useEffect, useState } from 'react'
import { BiCart, BiMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ProductContext } from '../../context/ProductsContext';

const BgNavbar = () => {
  const {totalQuantity} = useContext(CartContext)
  const [navOpen, setNavOpen] = useState(false);
  const[navscrol,setNavscrol] = useState(false);
  const {token,setToken} = useContext(ProductContext)


  useEffect(() =>{
    
    const scroll  = () =>{
      if(window.scrollY>=320){

        setNavscrol(true)
      }else{
     
        setNavscrol(false)
        
      }
    }
    
      window.addEventListener('scroll',scroll)
    
    },[token])

    const logout = () => {
      setToken("");
      localStorage.removeItem("token")
    }

  return (
    <nav className={`px-[1rem] fixed top-0 left-0  w-full  z-[100] sm:px-[2rem] max mx-auto h-auto py-[1rem]  backdrop-blur-lg shadow-md   bg-blue-600 `}>
      <div className='max-w-screen-2xl mx-auto flex justify-between items-center '>

     
      <Link to={'/'} className=' cursor-pointer text-[20px] xsm:text-[25px] sm:text-[35px] sm:tracking-normal text-white font-semibold tracking-wide uppercase '>Ikonic <span className=''>Store</span></Link>

      <ul className={` absolute  md:static px-[30px] py-[30px] md:py-0 md:px-[0] left-0 z-[99] w-full md:w-auto flex flex-col bg-white md:bg-transparent md:flex md:flex-row gap-[30px] mr-0 md:mr-[1rem] md:items-center md:justify-center transition-all ease-out duration-[0.6s] ${navOpen ? 'top-[70px]' : 'top-[-990px]'}`}>
        <li onClick={() => setNavOpen(false)} className=' uppercase text-[17px] block md:inline-block  border-b-2 border-black py-[10px] md:border-b-0  font-sans font-[600] text-black md:text-[#ffffff] hover:text-blue-700 md:hover:text-[#ffffffc8] duration-700'><Link className='block md:inline-block' to='/'>Home</Link></li>

        <li onClick={() => setNavOpen(false)} className=' uppercase text-[17px] block md:inline-block border-b-2 border-black py-[10px] md:border-b-0 font-sans font-[600] text-black md:text-[#ffffff] hover:text-blue-700 md:hover:text-[#ffffffc8] duration-700'><Link className='block md:inline-block' to='/products'>Products</Link></li>
        
        <li className=' uppercase  hidden md:block text-[17px] font-sans font-[600] text-[#ffffffda] hover:text-blue-700 md:hover:text-[#ffffffc8] duration-700'><Link className='flex relative' to='/cart'><BiCart size={30} /><span className='w-[20px] h-[20px] absolute top-[-10px] right-[-10px] bg-red-500 flex justify-center items-center text-black md:text-white rounded-full'>{totalQuantity}</span></Link></li>
     
        {
    token ? <>
    <button onClick={logout} className='text-white px-5 ml-4 py-3 bg-red-600 font-medium tracking-wide hover:bg-red-500  rounded-md'>Logout</button>
      <p className='w-[50px] cursor-pointer h-[50px] rounded-full flex items-center justify-center text-white text-3xl  bg-red-500'>Z</p>
    </>  :  <Link to='/login' className='text-white px-5 ml-4 py-3 bg-red-600 font-medium tracking-wide hover:bg-red-500  rounded-md'>
    Login
  </Link>

  }
      </ul>

      <div className='flex justify-center  items-center gap-1 md:hidden'>
        <BiMenu size={40} onClick={() => setNavOpen(!navOpen)} className='cursor-pointer text-[#cdc7c7]' />
        <li onClick={() => setNavOpen(false)} className='text-[17px] font-sans font-[600] text-[#141517] hover:text-[#3A435E] duration-700'><Link className='flex text-white relative' to='/cart'><BiCart size={30} className='text-white' /><span className='w-[20px] h-[20px] absolute top-[-10px] right-[-10px] bg-red-500 flex justify-center items-center text-white rounded-full'>{totalQuantity}</span></Link></li>
      </div>
      </div>


    </nav>
  )
}

export default BgNavbar