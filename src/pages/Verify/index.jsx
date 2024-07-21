import React, { useEffect } from 'react'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const index = () => {

  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();




  const verifyPayment = async () => {
    const url = process.env.URI;

    const response  = await axios.post(`${url}/api/order/verify`,{
      orderId:orderId,
      success:success
    })
    if(response.data.success){
      navigate('/myorders')
    }else{
      navigate('/')
    }
  }

  useEffect(() =>{
    verifyPayment()
  },[])
  return (
    <div className=' h-full'>
    <BgNavbar />



          {/* about sec 1  */}
          <section  className='w-full mt-0 bg-[#f5f5f6] bg-cover object-center relative   px-[10px] xsm:px-[30px] lg:px-[60px] xll:px-[120px] py-[6rem] mx-auto'>
          <div className='w-full min-h-[80vh] flex items-center justify-center'>
            {/* <h1 className='text-3xl'>Verifying Your payment ! </h1> */}

            <div className="spinner w-[100px] h-[100px] rounded-full border-[5px] border-blue-700"></div>
          </div>
          </section>
          </div>
  )
}

export default index