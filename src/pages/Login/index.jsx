import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { ProductContext } from '../../context/ProductsContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [loading,  setLoading]  = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { token, setToken }     = useContext(ProductContext)
  const navigate                = useNavigate()

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const url = import.meta.env.VITE_URI
    try {
      const res = await axios.post(`${url}/api/user/login`, formData)
      if (res.data.success) {
        toast.success('Welcome back!')
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        navigate('/')
      } else {
        toast.error(res.data.message || 'Login failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BgNavbar />
      <div className='min-h-screen bg-slate-50 flex items-center justify-center px-5 pt-16'>
          <div className='w-full max-w-[440px]'>

            {/* Card */}
            <div className='bg-white rounded-3xl shadow-xl border border-slate-100 px-8 py-10'>
              <div className='text-center mb-8'>
                <Link to='/' className='text-[22px] font-bold tracking-tight text-slate-800'>
                  ZUBZEN <span className='text-indigo-600'>Store</span>
                </Link>
                <h1 className='text-[24px] font-bold text-slate-800 mt-4 mb-1'>Welcome back</h1>
                <p className='text-slate-400 text-[14px]'>Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                  <label className='text-[13px] font-semibold text-slate-600 block mb-1.5'>Email</label>
                  <input
                    required
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='you@example.com'
                    className='w-full px-4 py-3 border border-slate-200 rounded-xl text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all'
                  />
                </div>

                <div>
                  <label className='text-[13px] font-semibold text-slate-600 block mb-1.5'>Password</label>
                  <input
                    required
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='w-full px-4 py-3 border border-slate-200 rounded-xl text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all'
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='mt-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl text-[15px] transition-colors shadow-md shadow-indigo-500/20'
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              <p className='text-center text-[14px] text-slate-500 mt-6'>
                Don't have an account?{' '}
                <Link to='/register' className='text-indigo-600 font-semibold hover:text-indigo-700 transition-colors'>
                  Create one
                </Link>
              </p>
            </div>
          </div>
      </div>
    </>
  )
}

export default Login
