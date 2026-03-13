import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { motion } from 'framer-motion'

const index = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <BgNavbar />
      <section className='min-h-screen bg-[#f5f7fa] flex items-center justify-center px-4'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 40 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='bg-white rounded-2xl shadow-lg max-w-md w-full px-10 py-14 flex flex-col items-center text-center gap-6'
        >
          {/* Animated checkmark circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: show ? 1 : 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className='w-24 h-24 rounded-full bg-green-100 flex items-center justify-center'
          >
            <svg className='w-12 h-12 text-green-500' fill='none' stroke='currentColor' strokeWidth={2.5} viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
          </motion.div>

          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Thank You!</h1>
            <p className='text-gray-500 text-[15px] leading-relaxed'>
              Your order has been placed successfully.<br />
              We'll send you a confirmation soon.
            </p>
          </div>

          <div className='w-full h-[1px] bg-gray-100' />

          <div className='flex flex-col sm:flex-row gap-3 w-full'>
            <Link
              to='/myorders'
              className='flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300 text-[15px]'
            >
              Track My Orders
            </Link>
            <Link
              to='/products'
              className='flex-1 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors duration-300 text-[15px]'
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default index
