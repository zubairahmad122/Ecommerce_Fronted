import React from 'react'
import { BiLogoFacebook, BiLogoInstagram, BiLogoWhatsapp } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Footer = () => {
  
  return (
    <section className='footer bg-[#f9f9f9] mt-[8rem] mb-0'>
   <div className="main-upper max-w-screen-2xl mx-auto  max-md:flex-col flex px-5 xsm:px-[100px] pt-[100px] pb-[40px] gap-[20px] justify-between items-start">
  {/* .left  */}
  <div className='max-md:w-full gap-5 flex flex-col max-md:items-center justify-center'>
  <div>
   
   <Link to={'/'} className=' cursor-pointer text-[20px]  xsm:text-[25px] sm:text-[35px] sm:tracking-normal text-black font-semibold tracking-wide uppercase '>Ikonic <span className=''>Store</span></Link>
      </div>
      
      <ul className={` flex flex-col max-md:items-center  gap-[10px] transition-all ease-out duration-[0.6s] `}>
        <li  className=' uppercase text-[17px] font-sans font-[600] text-[#141517] hover:text-[#4444e1] duration-500'><Link className='no-underline' to='/'>Home</Link></li>

        <li  className=' uppercase text-[17px] font-sans font-[600] text-[#141517] hover:text-[#4444e1] duration-500'><Link className='no-underline' to='/products'>Products</Link></li>
      </ul>
     
  </div>

  {/* .right  */}
  <div className='max-md:w-full flex flex-col max-md:items-center justify-center'> 
  <h2 className='text-[20px] mb-5 font-medium'>Subscribe</h2>
 <div className=" w-[220px] xsm:w-[300px] shadow-sm h-10 bg-white border">
  <input type="text" required placeholder='Enter Email' className='w-full h-full outline-none border-none px-3' />
 </div>
 <button className='px-7 py-3 bg-[#0274be] hover:bg-blue-700 duration-200 w-[150px] ease-linear mt-5 rounded-sm font-medium tracking-wide text-white'>Subscribe</button>
  
 </div>

   </div>
     <hr className='bg-[#1818187a] max-w-screen-2xl  mx-auto text-center h-[1px] w-[80%] border-none' />
     <div className='w-full h-full  max-w-screen-2xl mx-auto  px-5 xsm:px-[100px] py-5 flex items-center justify-center  md:justify-between flex-wrap'>

     <p className='text-[#444141] text-[14px] xsm:text-[18px] text-center'>Copyright &copy; 2024 All Right Reserved.</p>

<div className='flex  items-center my-5 justify-start gap-[10px]'>
        <BiLogoFacebook className='hover:text-[#4444e1] transition-all duration-500 ease-linear cursor-pointer hover:scale-110' size={25} />
        <BiLogoInstagram className='hover:text-[#4444e1] transition-all duration-500 ease-linear cursor-pointer hover:scale-110' size={25} />
        <BiLogoWhatsapp className='hover:text-[#4444e1] transition-all duration-500 ease-linear cursor-pointer hover:scale-110' size={25} />
      </div>


     </div>
    </section>
  )
}

export default Footer