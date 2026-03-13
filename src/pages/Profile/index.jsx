import React, { useContext, useEffect, useState } from 'react'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { ProductContext } from '../../context/ProductsContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const url = import.meta.env.VITE_URI

const Profile = () => {
  const { token, setToken, setUserName } = useContext(ProductContext)
  const navigate = useNavigate()

  const [user, setUser] = useState({ name: '', email: '' })
  const [editForm, setEditForm] = useState({ name: '', email: '' })
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [editMode, setEditMode] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPw, setSavingPw] = useState(false)
  const [orderCount, setOrderCount] = useState(0)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${url}/api/user/profile`, { headers: { token } })
      if (res.data.success) {
        setUser(res.data.user)
        setEditForm({ name: res.data.user.name, email: res.data.user.email })
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingProfile(false)
    }
  }

  const fetchOrderCount = async () => {
    try {
      const res = await axios.post(`${url}/api/order/myorders`, {}, { headers: { token } })
      if (res.data.success) setOrderCount(res.data.data.length)
    } catch (e) {}
  }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchProfile()
    fetchOrderCount()
  }, [token])

  const saveProfile = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    try {
      const res = await axios.put(`${url}/api/user/profile`, editForm, { headers: { token } })
      if (res.data.success) {
        setUser(res.data.user)
        setUserName(res.data.user.name)
        setEditMode(false)
        toast.success('Profile updated!')
      } else {
        toast.error(res.data.message)
      }
    } catch (e) {
      toast.error('Error updating profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const savePassword = async (e) => {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirm) {
      return toast.error("New passwords don't match")
    }
    setSavingPw(true)
    try {
      const res = await axios.put(`${url}/api/user/password`, {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword
      }, { headers: { token } })
      if (res.data.success) {
        toast.success('Password changed!')
        setPwForm({ currentPassword: '', newPassword: '', confirm: '' })
      } else {
        toast.error(res.data.message)
      }
    } catch (e) {
      toast.error('Error changing password')
    } finally {
      setSavingPw(false)
    }
  }

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/')
  }

  if (loadingProfile) return (
    <>
      <BgNavbar />
      <div className='min-h-screen flex items-center justify-center bg-[#f5f7fa]'>
        <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
      </div>
    </>
  )

  return (
    <>
      <BgNavbar />
      <section className='min-h-screen bg-[#f5f7fa] pt-[100px] pb-[60px] px-4 sm:px-8'>
        <div className='max-w-3xl mx-auto flex flex-col gap-6'>

          {/* Header card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-5'
          >
            <div className='w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shrink-0'>
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className='text-center sm:text-left flex-1'>
              <h1 className='text-2xl font-bold text-gray-800'>{user.name}</h1>
              <p className='text-gray-500 text-[14px] mt-1'>{user.email}</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Link to='/myorders' className='px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg text-[14px] hover:bg-indigo-100 transition-colors text-center'>
                {orderCount} Order{orderCount !== 1 ? 's' : ''}
              </Link>
              <button onClick={logout} className='px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg text-[14px] hover:bg-red-100 transition-colors'>
                Logout
              </button>
            </div>
          </motion.div>

          {/* Edit profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'
          >
            <div className='flex items-center justify-between mb-5'>
              <h2 className='text-lg font-bold text-gray-800'>Profile Information</h2>
              {!editMode && (
                <button onClick={() => setEditMode(true)} className='text-[13px] text-indigo-600 font-semibold hover:underline'>
                  Edit
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={saveProfile} className='flex flex-col gap-4'>
                <div>
                  <label className='block text-[13px] font-semibold text-gray-500 mb-1'>Full Name</label>
                  <input
                    type='text' required value={editForm.name}
                    onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                    className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-indigo-400 transition-colors'
                  />
                </div>
                <div>
                  <label className='block text-[13px] font-semibold text-gray-500 mb-1'>Email Address</label>
                  <input
                    type='email' required value={editForm.email}
                    onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))}
                    className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-indigo-400 transition-colors'
                  />
                </div>
                <div className='flex gap-3 pt-1'>
                  <button type='submit' disabled={savingProfile}
                    className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-[14px] transition-colors disabled:opacity-60'>
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type='button' onClick={() => { setEditMode(false); setEditForm({ name: user.name, email: user.email }) }}
                    className='px-6 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-lg text-[14px] hover:bg-gray-50 transition-colors'>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                  <span className='text-[13px] text-gray-400 font-semibold uppercase tracking-wide'>Name</span>
                  <span className='text-[15px] font-medium text-gray-700'>{user.name}</span>
                </div>
                <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                  <span className='text-[13px] text-gray-400 font-semibold uppercase tracking-wide'>Email</span>
                  <span className='text-[15px] font-medium text-gray-700'>{user.email}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Change password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'
          >
            <h2 className='text-lg font-bold text-gray-800 mb-5'>Change Password</h2>
            <form onSubmit={savePassword} className='flex flex-col gap-4'>
              <div>
                <label className='block text-[13px] font-semibold text-gray-500 mb-1'>Current Password</label>
                <input
                  type='password' required value={pwForm.currentPassword}
                  onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))}
                  placeholder='Enter current password'
                  className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-indigo-400 transition-colors'
                />
              </div>
              <div>
                <label className='block text-[13px] font-semibold text-gray-500 mb-1'>New Password</label>
                <input
                  type='password' required value={pwForm.newPassword}
                  onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
                  placeholder='At least 8 characters'
                  className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-indigo-400 transition-colors'
                />
              </div>
              <div>
                <label className='block text-[13px] font-semibold text-gray-500 mb-1'>Confirm New Password</label>
                <input
                  type='password' required value={pwForm.confirm}
                  onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
                  placeholder='Repeat new password'
                  className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-indigo-400 transition-colors'
                />
              </div>
              <div className='pt-1'>
                <button type='submit' disabled={savingPw}
                  className='px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg text-[14px] transition-colors disabled:opacity-60'>
                  {savingPw ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'
          >
            <h2 className='text-lg font-bold text-gray-800 mb-4'>Quick Links</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
              <Link to='/myorders' className='flex items-center gap-3 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors'>
                <span className='text-2xl'>📦</span>
                <div>
                  <p className='font-semibold text-[14px] text-indigo-800'>My Orders</p>
                  <p className='text-[12px] text-indigo-500'>{orderCount} total</p>
                </div>
              </Link>
              <Link to='/cart' className='flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors'>
                <span className='text-2xl'>🛒</span>
                <div>
                  <p className='font-semibold text-[14px] text-green-800'>My Cart</p>
                  <p className='text-[12px] text-green-500'>View cart items</p>
                </div>
              </Link>
              <Link to='/products' className='flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors'>
                <span className='text-2xl'>🛍️</span>
                <div>
                  <p className='font-semibold text-[14px] text-purple-800'>Shop</p>
                  <p className='text-[12px] text-purple-500'>Browse products</p>
                </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  )
}

export default Profile
