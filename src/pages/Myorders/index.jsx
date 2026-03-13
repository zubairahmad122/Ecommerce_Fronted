import { useContext, useEffect, useState } from 'react'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { ProductContext } from '../../context/ProductsContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { HiShoppingBag, HiRefresh } from 'react-icons/hi'

const STATUS_STYLE = {
  'Order Placed':     'bg-blue-50 text-blue-600 border border-blue-200',
  'Processing':       'bg-amber-50 text-amber-600 border border-amber-200',
  'Shipped':          'bg-violet-50 text-violet-600 border border-violet-200',
  'Out for Delivery': 'bg-orange-50 text-orange-600 border border-orange-200',
  'Delivered':        'bg-emerald-50 text-emerald-600 border border-emerald-200',
}

const Myorders = () => {
  const { token }              = useContext(ProductContext)
  const [orders, setOrders]    = useState([])
  const [loading, setLoading]  = useState(true)
  const url = import.meta.env.VITE_URI

  const fetchOrders = async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await axios.post(`${url}/api/order/myorders`, {}, { headers: { token } })
      if (res.data.success) setOrders(res.data.data.reverse())
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [token])

  if (!token) {
    return (
      <>
        <BgNavbar />
        <div className='min-h-screen bg-slate-50 flex items-center justify-center pt-16 px-4'>
          <div className='text-center'>
            <p className='text-slate-500 text-[16px] mb-5'>Please sign in to view your orders.</p>
            <Link to='/login' className='px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors'>
              Sign In
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <BgNavbar />
      <div className='min-h-screen bg-slate-50 pt-20 pb-16'>

        {/* Header */}
        <section className='bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-10'>
          <div className='max-w-screen-lg mx-auto px-5 sm:px-8 flex items-center justify-between'>
            <div>
              <h1 className='text-[28px] font-bold text-white'>My Orders</h1>
              <p className='text-slate-400 text-[14px] mt-1'>{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
            </div>
            <button onClick={fetchOrders} className='flex items-center gap-1.5 text-slate-400 hover:text-white text-[13px] transition-colors'>
              <HiRefresh size={16} /> Refresh
            </button>
          </div>
        </section>

        <div className='max-w-screen-lg mx-auto px-5 sm:px-8 py-8'>
          {loading ? (
            <div className='flex justify-center mt-16'>
              <div className='w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin' />
            </div>
          ) : orders.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-24 text-center'>
              <div className='w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-5'>
                <HiShoppingBag size={36} className='text-slate-300' />
              </div>
              <h2 className='text-[20px] font-bold text-slate-700 mb-2'>No orders yet</h2>
              <p className='text-slate-400 text-[14px] mb-6'>When you place an order, it will appear here.</p>
              <Link to='/products' className='px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors'>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'
                >
                  {/* Top bar */}
                  <div className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-50 border-b border-slate-100'>
                    <div>
                      <p className='text-[11px] font-mono text-slate-400'>#{order._id.slice(-8).toUpperCase()}</p>
                      <p className='text-[13px] text-slate-500 mt-0.5'>
                        {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[order.status] || 'bg-slate-100 text-slate-500'}`}>
                        {order.status}
                      </span>
                      <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${order.payment ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                        {order.payment ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className='px-5 py-4'>
                    <div className='flex flex-col gap-3'>
                      {order.items.map((item, i) => (
                        <div key={i} className='flex items-center gap-3'>
                          <div className='w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0'>
                            <img src={`${url}/images/${item.image}`} alt={item.name} className='w-full h-full object-cover' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-[14px] font-semibold text-slate-700 line-clamp-1'>{item.name}</p>
                            <p className='text-[12px] text-slate-400 capitalize'>{item.category} · Qty {item.quantity}</p>
                          </div>
                          <p className='text-[14px] font-bold text-slate-700 shrink-0'>${item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className='flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-t border-slate-100'>
                    <div>
                      <p className='text-[11px] text-slate-400 uppercase tracking-wider mb-0.5'>Ship to</p>
                      <p className='text-[13px] text-slate-600'>
                        {order.address.fristName} {order.address.lastName} · {order.address.city}, {order.address.country}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-[11px] text-slate-400 uppercase tracking-wider mb-0.5'>Total</p>
                      <p className='text-[20px] font-bold text-indigo-600'>${order.amount}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Myorders
