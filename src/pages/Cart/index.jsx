import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { HiShieldCheck, HiTruck, HiRefresh, HiLockClosed } from 'react-icons/hi'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import BgNavbar from '../../components/BgNavbar/BgNavbar'

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalQuantity, totalPrice, addToCart } = useContext(CartContext)
  const { products } = useContext(ProductContext)
  const [confirmClear, setConfirmClear] = useState(false)
  const url      = import.meta.env.VITE_URI
  const SHIPPING = 5

  const cartItems = products?.filter(p => cart[p._id] > 0) || []

  const removeItem = (id) => {
    const qty = cart[id] || 0
    for (let i = 0; i < qty; i++) removeFromCart(id)
  }

  if (Object.keys(cart).length === 0 || cartItems.length === 0) {
    return (
      <>
        <BgNavbar />
        <section className='min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-16'>
          <div className='text-center'>
            <div className='w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-5'>
              <FiShoppingBag size={38} className='text-indigo-400' />
            </div>
            <h2 className='text-[22px] font-extrabold text-slate-800 mb-2'>Your cart is empty</h2>
            <p className='text-slate-500 text-[14px] mb-7'>Looks like you haven't added anything yet.</p>
            <Link to='/products' className='px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors text-[14px] shadow-lg shadow-indigo-500/20'>
              Browse Products
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <BgNavbar />
      <div className='min-h-screen bg-slate-50 pt-16 pb-16'>

        {/* Header */}
        <div className='bg-white border-b border-slate-100'>
          <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between'>
            <div>
              <h1 className='text-[22px] font-extrabold text-slate-900'>Shopping Cart</h1>
              <p className='text-[13px] text-slate-400 mt-0.5'>{totalQuantity} item{totalQuantity !== 1 ? 's' : ''}</p>
            </div>
            {/* Safe clear with confirm */}
            {confirmClear ? (
              <div className='flex items-center gap-2'>
                <span className='text-[13px] text-slate-500'>Remove all?</span>
                <button onClick={() => { clearCart(); setConfirmClear(false) }} className='text-[13px] text-red-500 font-semibold hover:text-red-700 px-3 py-1 bg-red-50 rounded-lg'>Yes</button>
                <button onClick={() => setConfirmClear(false)} className='text-[13px] text-slate-500 font-semibold hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg'>No</button>
              </div>
            ) : (
              <button onClick={() => setConfirmClear(true)} className='text-[12px] text-slate-400 hover:text-red-500 font-medium transition-colors flex items-center gap-1'>
                <FiTrash2 size={13} /> Clear cart
              </button>
            )}
          </div>
        </div>

        <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-6'>
          <div className='flex flex-col lg:flex-row gap-6'>

            {/* ── Cart Items ── */}
            <div className='flex-1 flex flex-col gap-3'>
              {cartItems.map(item => (
                <div key={item._id} className='bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:border-indigo-100 transition-colors'>

                  {/* Image */}
                  <Link to={`/productDetail/${item._id}`} className='w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0'>
                    <img src={`${url}/images/${item.image}`} alt={item.name} className='w-full h-full object-contain p-1' />
                  </Link>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <Link to={`/productDetail/${item._id}`} className='font-bold text-slate-800 text-[14px] hover:text-indigo-600 transition-colors line-clamp-1'>
                      {item.name}
                    </Link>
                    <p className='text-[11px] text-slate-400 capitalize mt-0.5'>{item.category}</p>
                    <p className='text-indigo-600 font-extrabold text-[15px] mt-1'>${item.price}</p>
                  </div>

                  {/* Controls */}
                  <div className='flex items-center gap-3 shrink-0'>
                    {/* Qty */}
                    <div className='flex items-center gap-1 bg-slate-100 rounded-xl px-1'>
                      <button onClick={() => removeFromCart(item._id)} className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-slate-500'>
                        <FiMinus size={12} />
                      </button>
                      <span className='w-7 text-center text-[14px] font-bold text-slate-800'>{cart[item._id]}</span>
                      <button onClick={() => addToCart(item._id)} className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-slate-500'>
                        <FiPlus size={12} />
                      </button>
                    </div>

                    {/* Line total */}
                    <p className='font-extrabold text-slate-800 text-[14px] w-16 text-right hidden sm:block'>
                      ${(item.price * cart[item._id]).toFixed(2)}
                    </p>

                    {/* Remove */}
                    <button onClick={() => removeItem(item._id)} className='w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors'>
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <Link to='/products' className='flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-[13px] font-semibold mt-2 transition-colors'>
                ← Continue Shopping
              </Link>
            </div>

            {/* ── Order Summary ── */}
            <div className='w-full lg:w-[340px] shrink-0'>
              <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-20'>
                <h2 className='text-[16px] font-extrabold text-slate-900 mb-4'>Order Summary</h2>

                {/* Line items */}
                <div className='flex flex-col gap-2 text-[13px] mb-4'>
                  <div className='flex justify-between text-slate-500'>
                    <span>Subtotal ({totalQuantity} items)</span>
                    <span className='font-semibold text-slate-700'>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-slate-500'>
                    <span>Shipping</span>
                    <span className='font-semibold text-slate-700'>${SHIPPING.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-emerald-600 text-[12px] font-semibold'>
                    <span>🎉 Free returns included</span>
                  </div>
                </div>

                <div className='border-t border-slate-100 pt-3 mb-5'>
                  <div className='flex justify-between text-[16px] font-extrabold text-slate-900'>
                    <span>Total</span>
                    <span className='text-indigo-600'>${(totalPrice + SHIPPING).toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to='/checkout'
                  className='w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[15px] transition-all shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30'
                >
                  <HiLockClosed size={16} />
                  Proceed to Checkout
                </Link>

                {/* Trust signals */}
                <div className='mt-4 flex flex-col gap-2.5 pt-4 border-t border-slate-100'>
                  {[
                    { icon: HiLockClosed, text: 'Secure SSL checkout' },
                    { icon: HiTruck,      text: 'Free shipping over $50' },
                    { icon: HiRefresh,    text: '30-day free returns' },
                    { icon: HiShieldCheck, text: 'Buyer protection guaranteed' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className='flex items-center gap-2 text-[12px] text-slate-500'>
                      <Icon size={14} className='text-emerald-500 shrink-0' />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
