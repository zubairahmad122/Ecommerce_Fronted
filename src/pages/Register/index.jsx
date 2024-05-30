import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import bannerImg from '../../assets/Shopingbanner.jpg'
import BgNavbar from '../../components/BgNavbar/BgNavbar';
import axios from 'axios';
import { ProductContext } from '../../context/ProductsContext';
import { toast } from 'react-toastify';

const index = () => {
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const {token,setToken} = useContext(ProductContext)


  useEffect(() =>{
    if(token){
        navigate('/')
    }
  },[token])

  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
     
  });

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevData => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      const url = process.env.URI;

      try {

        const response = await axios.post(`${url}/api/user/register`,formData);
        if(response.data.success){
            toast.success("Successfuly Register!")
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setLoading(false)
            navigate('/')
        }
        toast.error(response.data.message)
        setLoading(false)
      } catch (error) {
        toast.error("error")
        setLoading(false)
      }
      
  }
  return (
    <div className=' h-full'>
      <BgNavbar />



            {/* about sec 1  */}
            <section style={{ backgroundImage:  `url(${bannerImg})` }} className='w-full mt-0 bg-[#f5f5f6] bg-cover object-center relative   px-[10px] xsm:px-[30px] lg:px-[60px] xll:px-[120px] py-[6rem] mx-auto'>
                <div className='absolute w-full h-full z-0 top-0 left-0 bg-black opacity-[0.2]'></div>
                <div className='flex w-full min-h-screen items-center justify-center'>
                    <form onSubmit={handleSubmit} className='max-w-[600px] relative z-10 px-3 xsm:px-5 py-10 rounded-lg w-[500px] bg-white shadow-lg'>
                        <h2 className='text-left font-worksans text-[20px] xsm:text-[25px] lg:text-[30px] xll:text-[35px] uppercase font-semibold text-[#3d3d3d]'>Register</h2>
                        <div>

                            <div className='flex my-4 flex-col'>
                                <label className='mb-1'>Full Name</label>
                                <input name="name" type="text" placeholder='full name' className='outline-none border-2 rounded-md shadow-lg border-[#443d3d82] px-4 py-2' onChange={handleChange} />
                            </div>
                            <div className='flex my-4 flex-col'>
                                <label className='mb-1'>Email</label>
                                <input type="email" name="email" placeholder='Email' className='outline-none border-2 rounded-md shadow-lg border-[#443d3d82] px-4 py-2' onChange={handleChange} />
                            </div>

                            <div className='flex my-4 flex-col'>
                                <label className='mb-1'>Password</label>
                                <input name="password" type="password" placeholder='Password' className='outline-none border-2 rounded-md shadow-lg border-[#443d3d82] px-4 py-2' onChange={handleChange} />
                            </div>

                        </div>

                        <div className='flex flex-col gap-4 items-center justify-start w-full'>
                            <button disabled={loading} className={`w-full px-7 py-3 hover:bg-blue-700 duration-300 text-white rounded-lg font-poppins text-[16px] xll:text-[18px] font-medium tracking-wide ${loading ? 'bg-blue-900 opacity-50'  : 'bg-blue-900'}`}>Register</button>

                            <p>Alredy Have Account <Link className='font-semibold hover:text-blue-900 text-green' to='/login'>Login </Link></p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
  )
}

export default index