import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiCart } from 'react-icons/bi'
import { CartContext } from '../../context/CartContext'
import STORE from '../../config/store'

const Card = ({ image, price, title, id, des, category }) => {
  const url = import.meta.env.VITE_URI
  const { addToCart, cart } = useContext(CartContext)
  const [bounce, setBounce] = useState(false)
  const qty = cart[id] || 0

  const handleAdd = () => {
    addToCart(id)
    setBounce(true)
    setTimeout(() => setBounce(false), 500)
  }

  const catLabel = category ? (STORE.categories[category]?.label || category) : null

  return (
    <div className='group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col'>

      {/* Image */}
      <Link to={`/productDetail/${id}`} className='block overflow-hidden bg-slate-50 h-[180px] relative'>
        <img
          src={`${url}/images/${image}`}
          alt={title}
          loading='lazy'
          className='w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500'
        />
        {qty > 0 && (
          <span className='absolute top-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full'>
            {qty} in cart
          </span>
        )}
      </Link>

      {/* Content */}
      <div className='flex flex-col flex-1 p-3'>
        {catLabel && (
          <span className='text-[10px] font-semibold text-indigo-500 uppercase tracking-wide mb-1 capitalize'>{catLabel}</span>
        )}
        <Link to={`/productDetail/${id}`}>
          <h5 className='text-[13px] font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-1 mb-1'>{title}</h5>
        </Link>
        <p className='text-slate-400 text-[11px] line-clamp-2 mb-3 leading-relaxed flex-1'>{des}</p>

        <div className='flex items-center justify-between mt-auto'>
          <div>
            <p className='text-[16px] font-extrabold text-slate-900'>${price}</p>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-2 text-white text-[12px] font-semibold rounded-xl transition-all active:scale-95
              ${bounce ? 'bg-emerald-500 scale-95' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            <BiCart size={14} />
            {bounce ? '✓' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
