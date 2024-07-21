import React, { useContext } from 'react'
import './cart.css'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import BgNavbar from '../../components/BgNavbar/BgNavbar';

const index = () => {
  const {cart,removeFromCart,clearCart,totalQuantity,totalPrice,addToCart} = useContext(CartContext)
  const {products} = useContext(ProductContext)


  const url = process.env.URI;

  return (
<>
    <BgNavbar />

    <section className='my-[100px] max-w-screen-2xl mx-auto   px-[0.2rem] ssm:px-[0.5rem] sm:px-[2rem] py-[1rem]'>
    <h2 className='text-[22px] font-bold my-[20px]'>Shopping Cart {totalQuantity}</h2>
    {cart.length < 1 ? <div>
      <h1 className='text-center text-[40px]'>Cart In Empty </h1>          <p className='text-center mt-[20px]'><Link to={'/products'} className='text-blue-600 font-semibold '>Continue Shopping →</Link></p>
    </div>: 
    <>
      <div className=' no-scrollbar overflow-x-scroll'>
         <div className='w-[411px] xsm:w-full no-scrollbar  overflow-x-scroll '>
        <div className='main-grid place-content-start place-items-start px-5 sm:px-20 border-b-[1px] pb-[20px] mb-[20px]'>
       <p className='font-semibold text-[13px] xsm:text-[16px]'>Name</p>
       <p className='font-semibold text-[13px] xsm:text-[16px]'>Price</p>
       <p className='font-semibold text-[13px] xsm:text-[16px]'>Quantity</p>
       <p className='font-semibold text-[13px] xsm:text-[16px]'>SubPrice</p>
     </div>
   {
     products?.map((i) =>{
      if(cart[i._id]){

        return (
          <div key={i.id} className='w-[100%] relative mb-[40px]'>
          <RxCross2 onClick={() => removeFromCart(i._id)} className='cursor-pointer absolute right-1 lg:right-6  top-[-15px] lg:top-2 text-[22px] lg:text-[25px]' />
        <div className=' main-grid place-content-start place-items-start px-5 sm:px-20 mt-[20px]'>
           <div className='flex max-md:flex-col md:items-center justify-center  gap-4'>
             <img className=' w-[80px] h-[60px] sm:h-[65px] md:w-[95px]' src={`${url}/images/${i.image}`} alt={`${url}/images/${i.image}`} />
             <div className='h-full flex items-center justify-center'>
 
             <p className='  text-[12px] xsm:text-[14px] font-semibold'>{i.name}</p>
             </div>
           </div>
           <div className='h-full flex items-center justify-center'>
 
           <p className='font-semibold  text-[14px] xsm:text-[16px]'>$ {i.price}</p>
           </div>
         <div className='h-full flex items-center justify-center'>
         <div className='flex justify-center items-center border gap-2'>
                     <button onClick={() => addToCart(i._id)} className='border px-1 xsm:px-2 py-1'><FaPlus/></button>
                     <p className=' text-[12px] xsm:text-[16px]'>{cart[i._id]}</p>
                     <button onClick={() => removeFromCart(i._id)} className='border px-1 xsm:px-2 py-1'><FaMinus/></button>
                   </div>
         </div>
         <div className='h-full flex items-center justify-center'>
 
            <p className=' text-[14px] font-semibold xsm:text-[16px]'>$ {i.price * cart[i._id]}</p>
         </div>
         
         </div>
         <hr className='w-[90%] text-center mx-auto mt-[20px]' />
        </div>
        )
      }
     })
   }
 
 

       </div>
      </div>
 <div className='flex items-end justify-end flex-col my-[1rem] '>
 
 <div className=' w-full mt-5 mdd:w-[40%]  '>
   <div className='bg-[#f9f9f9] rounded-lg px-[30px] py-[30px]'>
   <div className='flex w-full items-center mb-[20px] border-b border-[#eaebef] justify-between'>
     <p className='text-[16px] font-[400]'>subtotal</p>
     <p className=' text-[16px] font-[500] pb-[10px]'>{totalPrice}</p>
   </div>
   <div className='flex w-full items-center mb-[20px] border-b border-[#eaebef] justify-between'>
     <p className='text-[16px] font-[400]'>Shipping</p>
     <p className=' text-[16px] font-[500] pb-[10px]'>$5</p>
   </div>
   <div className='flex w-full items-center mb-[20px] border-b border-[#eaebef] justify-between'>
     <p className='text-[18px] font-[400]'>Total</p>
     <p className=' text-[18px] font-[600] pb-[10px]'>$ {totalPrice + 5}</p>
   </div>
   </div>
   <Link to='/checkout' className='w-[100%] flex items-center justify-center mt-[20px] mb-[10px] bg-blue-700 hover:bg-blue-800 duration-700 transition-all px-[20px] py-[15px] font-[500] tracking-wide text-[16px] rounded-lg text-white'>CheckOut</Link>
   <button onClick={clearCart} className='w-[100%] mb[20px] bg-red-500 hover:bg-blue-800 duration-700 transition-all px-[20px] py-[15px] font-[500] tracking-wide text-[16px] rounded-lg text-white'>Clear Cart</button>
   <p className='text-center mt-[20px]'>Or <Link to={'/products'} className='text-blue-600 font-semibold '>Continue Shopping →</Link></p>
 </div>
</div>

</>
}
   </section>
</>
  )
}

export default index