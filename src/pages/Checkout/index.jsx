import React from 'react'
import BgNavbar from '../../components/BgNavbar/BgNavbar'

const index = () => {
  return (
   <>
   <BgNavbar />
    <section className='max-w-screen-2xl mx-auto '>
        
        <div className="flex justify-center md:items-center flex-col min-h-[70vh]  px-5 sm:px-20 gap-20 md:flex-row ">
            <div className="w-full md:flex-1 flex flex-col gap-y-6 ">
                <h1 className="text-3xl font-medium">Delivery Information</h1>


                <div className='flex w-full justify-center  flex-col md:flex-row items-center gap-3'>
                <input type="text" placeholder='Frist name' className='outline-none w-full md:flex-1  border-[1.5px] border-[#65656573] p-3 rounded-md' />
                <input type="text" placeholder='Last name' className='outline-none  w-full md:flex-1 border-[1.5px] border-[#65656573] p-3 rounded-md' />
                </div>
                <div className='w-full'>
                <input type="text" placeholder='Email address' className='outline-none  border-[1.5px] border-[#65656573] w-full p-3 rounded-md' />
                </div>

                <div className='w-full'>
                <input type="text" placeholder='Street' className='outline-none  border-[1.5px] border-[#65656573] w-full p-3 rounded-md' />
                </div>

                <div className='flex w-full justify-center  flex-col md:flex-row items-center gap-3'>
                <input type="text" placeholder='City' className='outline-none w-full md:flex-1  border-[1.5px] border-[#65656573] p-3 rounded-md' />
                <input type="text" placeholder='Country' className='outline-none  w-full md:flex-1 border-[1.5px] border-[#65656573] p-3 rounded-md' />
                </div>

                <div className='w-full'>
                <input type="text" placeholder='Phone' className='outline-none  border-[1.5px] border-[#65656573] w-full p-3 rounded-md' />
                </div>


            </div>

            <div className="w-full md:flex-1  flex flex-col gap-y-6 ">
                <h1 className=" text-2xl md:text-3xl  font-medium">Cart Total</h1>

                <div className='flex gap-5 flex-col'>

                    <div className="flex items-center justify-between pb-4 px-2 border-b brder-[#000]">
                        <p className='text-[18px] text-[#999090ef]'>Subtotal</p>
                        <p className='text-[18px] font-medium text-[#999090ef]'>$100.00</p>
                    </div> 
                    <div className="flex items-center justify-between pb-4 px-2 border-b brder-[#000]">
                        <p className='text-[18px] text-[#999090ef]'>Delevery Fee</p>
                        <p className='text-[18px] font-medium text-[#999090ef]'>$5</p>
                    </div>     
                     <div className="flex items-center justify-between pb-4 px-2 border-b brder-[#000]">
                        <p className='text-[18px] text-[#302c2cef]'>Total</p>
                        <p className='text-[18px] font-medium text-[#302c2cef]'>$140.00</p>
                    </div>

                    <button className='px-4 py-3 hover:bg-red-700 duration-300 bg-red-500 text-white text-[16px] font-medium rounded-md max-w-[220px]'>Proceed To Payment</button>
                </div>
                </div>
        </div>
    </section>
   </>
  )
}

export default index