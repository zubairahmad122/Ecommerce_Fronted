import React, { useContext, useState } from 'react'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import axios from 'axios'

const index = () => {

    const {totalPrice,cart} = useContext(CartContext)
    const {token,products} = useContext(ProductContext)
    const url = process.env.URI;



    const [data,setData] = useState({
        fristName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipCide:"",
        country:"",
        phone:""
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({...data,[name]:value}))
    }

    const placeOrder = async (e) => {
        e.preventDefault();

        let orderItems = [];
        
        products.map((item) =>{
            if(cart[item._id] > 0){
                let itemInfo = item;
                itemInfo["quantity"] = cart[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address:data,
            items:orderItems,
            amount:totalPrice + 5,
        }

        let response = await axios.post(`${url}/api/order/place`,orderData,{
            headers:{token}
        })
        if(response.data.success){
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
    }

    
  return (
   <>
   <BgNavbar />
    <section className='max-w-screen-2xl mx-auto '>
        
        <form onSubmit={placeOrder} className="flex justify-center md:items-center flex-col min-h-[70vh]  px-5 sm:px-20 gap-20 md:flex-row ">
            <div className="w-full md:flex-1 flex flex-col gap-y-6 ">
                <h1 className="text-3xl font-medium">Delivery Information</h1>


                <div className='flex w-full justify-center  flex-col md:flex-row items-center gap-3'>

                    {/* name  */}
                <input required name='fristName' onChange={onChangeHandler}
                value={data.fristName} type="text" placeholder='Frist name' className='outline-none w-full md:flex-1  border-[1.5px] border-[#65656573] p-3 rounded-md' />
                <input name='lastName' onChange={onChangeHandler}
                value={data.lastName} type="text" placeholder='Last name' className='outline-none  w-full md:flex-1 border-[1.5px] border-[#65656573] p-3 rounded-md' />
                </div>


                    {/* email  */}
                <div className='w-full'>
                <input required name='email' onChange={onChangeHandler}
                value={data.email} type="text" placeholder='Email address' className='outline-none  border-[1.5px] border-[#65656573] w-full p-3 rounded-md' />
                </div>

                <div className='w-full'>
                <input required name='street' onChange={onChangeHandler}
                value={data.street} type="text" placeholder='Street' className='outline-none  border-[1.5px] border-[#65656573] w-full p-3 rounded-md' />
                </div>

                <div className='flex w-full justify-center  flex-col md:flex-row items-center gap-3'>
                <input required name='city' onChange={onChangeHandler}
                value={data.city} type="text" placeholder='City' className='outline-none w-full md:flex-1  border-[1.5px] border-[#65656573] p-3 rounded-md' />
                <input required name='state' onChange={onChangeHandler}
                value={data.state} type="text" placeholder='state' className='outline-none  w-full md:flex-1 border-[1.5px] border-[#65656573] p-3 rounded-md' />
                </div>


                <div className='flex w-full justify-center  flex-col md:flex-row items-center gap-3'>
                <input required name='zipCide' onChange={onChangeHandler}
                value={data.zipCide} type="text" placeholder='zipCode' className='outline-none w-full md:flex-1  border-[1.5px] border-[#65656573] p-3 rounded-md' />
                <input required name='country' onChange={onChangeHandler}
                value={data.country} type="text" placeholder='Country' className='outline-none  w-full md:flex-1 border-[1.5px] border-[#65656573] p-3 rounded-md' />
                </div>

                <div className='w-full'>
                <input required name='phone' onChange={onChangeHandler}
                value={data.phone} type="text" placeholder='Phone' className='outline-none  border-[1.5px] border-[#65656573] w-full p-3 rounded-md' />
                </div>


            </div>

            <div className="w-full md:flex-1  flex flex-col gap-y-6 ">
                <h1 className=" text-2xl md:text-3xl  font-medium">Cart Total</h1>

                <div className='flex gap-5 flex-col'>

                    <div className="flex items-center justify-between pb-4 px-2 border-b brder-[#000]">
                        <p className='text-[18px] text-[#999090ef]'>Subtotal</p>
                        <p className='text-[18px] font-medium text-[#999090ef]'>${totalPrice}</p>
                    </div> 
                    <div className="flex items-center justify-between pb-4 px-2 border-b brder-[#000]">
                        <p className='text-[18px] text-[#999090ef]'>Delevery Fee</p>
                        <p className='text-[18px] font-medium text-[#999090ef]'>$5</p>
                    </div>     
                     <div className="flex items-center justify-between pb-4 px-2 border-b brder-[#000]">
                        <p className='text-[18px] text-[#302c2cef]'>Total</p>
                        <p className='text-[18px] font-medium text-[#302c2cef]'>${totalPrice + 5}</p>
                    </div>

                    <button className='px-4 py-3 hover:bg-red-700 duration-300 bg-red-500 text-white text-[16px] font-medium rounded-md max-w-[220px]'>Proceed To Payment</button>
                </div>
                </div>
        </form>
    </section>
   </>
  )
}

export default index