import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { CartContext } from '../../context/CartContext'
import { useParams, Link, useNavigate } from 'react-router-dom'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import Card from '../../components/Card/Card'
import { HiShoppingCart, HiPlus, HiMinus, HiChevronRight, HiLightningBolt, HiShieldCheck, HiTruck, HiRefresh, HiStar } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import STORE from '../../config/store'

// static rating helper — shows 4-5 filled stars
const Stars = ({ n = 4.8, count = 124 }) => (
  <div className='flex items-center gap-1.5'>
    <div className='flex items-center gap-0.5'>
      {[1, 2, 3, 4, 5].map(i => (
        <HiStar key={i} size={15} className={i <= Math.round(n) ? 'text-amber-400' : 'text-slate-200'} />
      ))}
    </div>
    <span className='text-[13px] font-semibold text-slate-700'>{n}</span>
    <span className='text-[12px] text-slate-400'>({count} reviews)</span>
  </div>
)

const ProductDetail = () => {
  const { products }                       = useContext(ProductContext)
  const { addToCart, removeFromCart, cart } = useContext(CartContext)
  const { id }                             = useParams()
  const navigate                           = useNavigate()
  const [product,  setProduct]  = useState(null)
  const [adding,   setAdding]   = useState(false)
  const url = import.meta.env.VITE_URI

  useEffect(() => {
    const found = products.find(p => p._id === id)
    if (found) setProduct(found)
    window.scrollTo(0, 0)
  }, [id, products])

  if (!product) {
    return (
      <>
        <BgNavbar />
        <div className='min-h-screen flex items-center justify-center pt-16 bg-slate-50'>
          <div className='w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin' />
        </div>
      </>
    )
  }

  const qty       = cart[product._id] || 0
  const catLabel  = STORE.categories[product.category]?.label || product.category
  const related   = products.filter(p => p.category === product.category && p._id !== product._id).slice(0, 4)

  const handleAddToCart = () => {
    setAdding(true)
    addToCart(product._id)
    toast.success('Added to cart!', { autoClose: 1200 })
    setTimeout(() => setAdding(false), 800)
  }

  const handleBuyNow = () => {
    addToCart(product._id)
    navigate('/cart')
  }

  return (
    <>
      <BgNavbar />
      <div className='min-h-screen bg-slate-50 pt-16'>

        {/* Breadcrumb */}
        <div className='bg-white border-b border-slate-100'>
          <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-1.5 text-[12px] text-slate-400'>
            <Link to='/' className='hover:text-indigo-600 transition-colors'>Home</Link>
            <HiChevronRight size={13} />
            <Link to='/products' className='hover:text-indigo-600 transition-colors'>Shop</Link>
            {catLabel && (
              <>
                <HiChevronRight size={13} />
                <Link to={`/products?cat=${product.category}`} className='hover:text-indigo-600 transition-colors capitalize'>{catLabel}</Link>
              </>
            )}
            <HiChevronRight size={13} />
            <span className='text-slate-600 font-medium line-clamp-1 max-w-[160px]'>{product.name}</span>
          </div>
        </div>

        {/* Main */}
        <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-8'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden'
          >
            <div className='flex flex-col md:flex-row'>

              {/* ── Image panel ── */}
              <div className='md:w-[46%] bg-gradient-to-br from-slate-50 to-indigo-50/30 flex items-center justify-center p-8 md:p-14 min-h-[340px] relative'>
                <img
                  src={`${url}/images/${product.image}`}
                  alt={product.name}
                  className='max-w-full max-h-[400px] object-contain hover:scale-105 transition-transform duration-500 drop-shadow-lg'
                />
                {/* In-stock badge */}
                <div className='absolute top-4 left-4 flex items-center gap-1.5 bg-white border border-emerald-200 px-3 py-1.5 rounded-full shadow-sm'>
                  <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                  <span className='text-[12px] font-semibold text-emerald-700'>In Stock</span>
                </div>
              </div>

              {/* ── Info panel ── */}
              <div className='flex-1 p-6 sm:p-9 flex flex-col'>

                {/* Category + rating */}
                <div className='flex items-center gap-3 mb-3'>
                  {catLabel && (
                    <Link to={`/products?cat=${product.category}`} className='px-3 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-full capitalize hover:bg-indigo-100 transition-colors'>
                      {catLabel}
                    </Link>
                  )}
                </div>

                <h1 className='text-[22px] sm:text-[28px] font-extrabold text-slate-900 leading-tight mb-3'>
                  {product.name}
                </h1>

                <Stars n={4.8} count={124} />

                {/* Price */}
                <div className='flex items-baseline gap-3 mt-4 mb-2'>
                  <span className='text-[34px] font-extrabold text-slate-900'>${product.price}</span>
                  <span className='text-[16px] text-slate-400 line-through'>${Math.round(product.price * 1.2)}</span>
                  <span className='px-2 py-0.5 bg-red-50 text-red-600 text-[12px] font-bold rounded-md'>20% OFF</span>
                </div>
                <p className='text-[12px] text-emerald-600 font-semibold mb-4'>You save ${Math.round(product.price * 0.2)}</p>

                <p className='text-slate-500 text-[14px] leading-relaxed mb-6 border-t border-slate-100 pt-4'>
                  {product.description}
                </p>

                {/* Qty + CTA row */}
                <div className='flex items-center gap-3 mb-4 flex-wrap'>
                  {/* Qty stepper */}
                  <div className='flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50'>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      disabled={qty === 0}
                      className='w-10 h-10 flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors disabled:opacity-30'
                    >
                      <HiMinus size={14} />
                    </button>
                    <span className='w-10 text-center text-[15px] font-bold text-slate-800 border-x border-slate-200'>{qty}</span>
                    <button
                      onClick={() => addToCart(product._id)}
                      className='w-10 h-10 flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors'
                    >
                      <HiPlus size={14} />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl transition-all text-[14px] shadow-md
                      ${adding ? 'bg-emerald-500 text-white scale-95' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'}`}
                  >
                    <HiShoppingCart size={18} />
                    {adding ? 'Added ✓' : 'Add to Cart'}
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    className='flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all text-[14px] shadow-md shadow-orange-500/25'
                  >
                    <HiLightningBolt size={16} />
                    Buy Now
                  </button>
                </div>

                {qty > 0 && (
                  <Link to='/cart' className='inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-[13px] font-semibold mb-4 transition-colors'>
                    <HiShoppingCart size={15} />
                    View Cart — {qty} item{qty > 1 ? 's' : ''} →
                  </Link>
                )}

                {/* Trust badges */}
                <div className='grid grid-cols-3 gap-3 pt-5 border-t border-slate-100 mt-2'>
                  {[
                    { icon: HiTruck,        label: 'Free Shipping',   sub: 'Orders over $50'  },
                    { icon: HiShieldCheck,  label: 'Secure Payment',  sub: 'SSL encrypted'    },
                    { icon: HiRefresh,      label: 'Easy Returns',    sub: '30-day policy'    },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className='flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-slate-50'>
                      <Icon size={20} className='text-indigo-500' />
                      <p className='text-[11px] font-bold text-slate-700'>{label}</p>
                      <p className='text-[10px] text-slate-400'>{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Related Products ── */}
          {related.length > 0 && (
            <section className='mt-12'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-[20px] font-extrabold text-slate-900'>You Might Also Like</h2>
                <Link to={`/products?cat=${product.category}`} className='text-indigo-600 hover:text-indigo-700 text-[13px] font-semibold'>
                  View all →
                </Link>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 mdd:grid-cols-4 gap-4'>
                {related.map(p => (
                  <Card key={p._id} image={p.image} price={p.price} id={p._id} title={p.name} des={p.description} category={p.category} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDetail
