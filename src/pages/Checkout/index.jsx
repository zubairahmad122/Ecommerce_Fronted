import { useContext, useState } from 'react'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { HiLockClosed, HiChevronRight } from 'react-icons/hi'

const inputCls = 'w-full px-4 py-3 border border-slate-200 rounded-xl text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all bg-white'

const Field = ({ label, children }) => (
  <div className='flex flex-col gap-1.5'>
    <label className='text-[13px] font-semibold text-slate-600'>{label}</label>
    {children}
  </div>
)

const Checkout = () => {
  const { totalPrice, cart }  = useContext(CartContext)
  const { token, products }   = useContext(ProductContext)
  const url = import.meta.env.VITE_URI

  const [data, setData] = useState({
    fristName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    zipCide: '', country: '', phone: '',
  })

  const onChange = (e) => setData(p => ({ ...p, [e.target.name]: e.target.value }))

  const placeOrder = async (e) => {
    e.preventDefault()
    const orderItems = products
      .filter(p => cart[p._id] > 0)
      .map(p => ({ ...p, quantity: cart[p._id] }))

    const res = await axios.post(
      `${url}/api/order/place`,
      { address: data, items: orderItems, amount: totalPrice + 5 },
      { headers: { token } }
    )
    if (res.data.success) window.location.replace(res.data.session_url)
  }

  const cartItems = products.filter(p => cart[p._id] > 0)
  const delivery  = 5

  return (
    <>
      <BgNavbar />
      <div className='min-h-screen bg-slate-50 pt-20'>

        {/* Breadcrumb */}
        <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-4'>
          <div className='flex items-center gap-1.5 text-[13px] text-slate-400'>
            <Link to='/cart' className='hover:text-indigo-600 transition-colors'>Cart</Link>
            <HiChevronRight size={14} />
            <span className='text-slate-600 font-medium'>Checkout</span>
          </div>
        </div>

        <div className='max-w-screen-xl mx-auto px-5 sm:px-8 pb-20'>
          <h1 className='text-[26px] font-bold text-slate-800 mb-8'>Checkout</h1>

          <form onSubmit={placeOrder} className='flex flex-col lg:flex-row gap-8'>

            {/* Left — Delivery Info */}
            <div className='flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8'>
              <h2 className='text-[18px] font-bold text-slate-800 mb-6'>Delivery Information</h2>

              <div className='flex flex-col gap-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Field label='First Name'>
                    <input required name='fristName' value={data.fristName} onChange={onChange} placeholder='John' className={inputCls} />
                  </Field>
                  <Field label='Last Name'>
                    <input required name='lastName' value={data.lastName} onChange={onChange} placeholder='Doe' className={inputCls} />
                  </Field>
                </div>

                <Field label='Email Address'>
                  <input required name='email' type='email' value={data.email} onChange={onChange} placeholder='you@example.com' className={inputCls} />
                </Field>

                <Field label='Street Address'>
                  <input required name='street' value={data.street} onChange={onChange} placeholder='123 Main St' className={inputCls} />
                </Field>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Field label='City'>
                    <input required name='city' value={data.city} onChange={onChange} placeholder='New York' className={inputCls} />
                  </Field>
                  <Field label='State'>
                    <input required name='state' value={data.state} onChange={onChange} placeholder='NY' className={inputCls} />
                  </Field>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Field label='ZIP Code'>
                    <input required name='zipCide' value={data.zipCide} onChange={onChange} placeholder='10001' className={inputCls} />
                  </Field>
                  <Field label='Country'>
                    <input required name='country' value={data.country} onChange={onChange} placeholder='United States' className={inputCls} />
                  </Field>
                </div>

                <Field label='Phone Number'>
                  <input required name='phone' type='tel' value={data.phone} onChange={onChange} placeholder='+1 (555) 000-0000' className={inputCls} />
                </Field>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className='lg:w-[380px] flex flex-col gap-4'>
              <div className='bg-white rounded-3xl border border-slate-100 shadow-sm p-6'>
                <h2 className='text-[18px] font-bold text-slate-800 mb-5'>Order Summary</h2>

                {/* Items */}
                <div className='flex flex-col gap-3 mb-5'>
                  {cartItems.map(p => (
                    <div key={p._id} className='flex items-center gap-3'>
                      <img
                        src={`${url}/images/${p.image}`}
                        alt={p.name}
                        className='w-12 h-12 rounded-xl object-cover border border-slate-100 bg-slate-50'
                      />
                      <div className='flex-1 min-w-0'>
                        <p className='text-[13px] font-semibold text-slate-700 line-clamp-1'>{p.name}</p>
                        <p className='text-[12px] text-slate-400'>Qty: {cart[p._id]}</p>
                      </div>
                      <p className='text-[14px] font-bold text-slate-700 shrink-0'>${p.price * cart[p._id]}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className='border-t border-slate-100 pt-4 flex flex-col gap-2'>
                  <div className='flex justify-between text-[14px] text-slate-500'>
                    <span>Subtotal</span>
                    <span className='font-medium text-slate-700'>${totalPrice}</span>
                  </div>
                  <div className='flex justify-between text-[14px] text-slate-500'>
                    <span>Delivery</span>
                    <span className='font-medium text-slate-700'>${delivery}</span>
                  </div>
                  <div className='flex justify-between text-[16px] font-bold text-slate-800 border-t border-slate-100 pt-3 mt-1'>
                    <span>Total</span>
                    <span className='text-indigo-600'>${totalPrice + delivery}</span>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                className='w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-[15px] transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2'
              >
                <HiLockClosed size={18} />
                Pay ${totalPrice + delivery}
              </button>

              <p className='text-center text-[12px] text-slate-400 flex items-center justify-center gap-1'>
                <HiLockClosed size={12} /> Secured by Stripe
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Checkout
