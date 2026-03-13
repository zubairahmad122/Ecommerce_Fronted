import { useContext, useState } from 'react'
import { BiCart, BiMenu, BiX } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import STORE from '../../config/store'

const NavLink = ({ to, children, onClick }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <li onClick={onClick}>
      <Link to={to} className={`text-[14px] font-medium transition-colors duration-200 ${active ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
        {children}
      </Link>
    </li>
  )
}

const BgNavbar = () => {
  const { totalQuantity }             = useContext(CartContext)
  const { token, setToken, userName } = useContext(ProductContext)
  const [navOpen, setNavOpen]         = useState(false)

  const logout = () => { setToken(''); localStorage.removeItem('token') }
  const close  = () => setNavOpen(false)

  return (
    <header className='fixed top-0 left-0 w-full z-[100] bg-white border-b border-slate-100 shadow-sm'>
      <div className='max-w-screen-xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6'>

        <Link to='/' className='text-slate-900 font-bold text-[20px] tracking-tight shrink-0'>
          {STORE.name} <span className='text-indigo-600'>{STORE.nameAccent}</span>
        </Link>

        <ul className='hidden md:flex items-center gap-7'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/products'>Shop</NavLink>
          {token && <NavLink to='/myorders'>My Orders</NavLink>}
        </ul>

        <div className='hidden md:flex items-center gap-3'>
          <Link to='/cart' className='relative text-slate-600 hover:text-slate-900 transition-colors p-1'>
            <BiCart size={24} />
            {totalQuantity > 0 && (
              <span className='absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold'>
                {totalQuantity}
              </span>
            )}
          </Link>
          {token ? (
            <div className='flex items-center gap-2'>
              <button onClick={logout} className='text-[13px] text-slate-500 hover:text-slate-700 font-medium transition-colors'>
                Logout
              </button>
              <Link to='/profile' className='w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors'>
                {userName?.[0]?.toUpperCase() || '?'}
              </Link>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to='/login' className='text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-colors'>
                Sign In
              </Link>
              <Link to='/register' className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold rounded-lg transition-colors'>
                Register
              </Link>
            </div>
          )}
        </div>

        <div className='flex items-center gap-3 md:hidden'>
          <Link to='/cart' className='relative text-slate-700 p-1'>
            <BiCart size={24} />
            {totalQuantity > 0 && (
              <span className='absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[9px] font-bold'>
                {totalQuantity}
              </span>
            )}
          </Link>
          <button onClick={() => setNavOpen(!navOpen)} className='text-slate-700'>
            {navOpen ? <BiX size={26} /> : <BiMenu size={26} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100 ${navOpen ? 'max-h-96' : 'max-h-0'}`}>
        <ul className='flex flex-col px-6 py-4 gap-4'>
          <NavLink to='/'        onClick={close}>Home</NavLink>
          <NavLink to='/products' onClick={close}>Shop</NavLink>
          {token && <NavLink to='/myorders' onClick={close}>My Orders</NavLink>}
          <li className='pt-2 border-t border-slate-100 flex items-center gap-3'>
            {token ? (
              <>
                <Link to='/profile' onClick={close} className='flex items-center gap-2 text-slate-700 text-[14px] font-medium'>
                  <span className='w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold'>
                    {userName?.[0]?.toUpperCase() || '?'}
                  </span>
                  Profile
                </Link>
                <button onClick={() => { logout(); close() }} className='ml-auto text-red-500 text-[13px] font-medium'>Logout</button>
              </>
            ) : (
              <div className='flex gap-2 w-full'>
                <Link to='/login' onClick={close} className='flex-1 text-center px-4 py-2.5 border border-slate-200 text-slate-700 text-[14px] font-semibold rounded-lg'>Sign In</Link>
                <Link to='/register' onClick={close} className='flex-1 text-center px-4 py-2.5 bg-indigo-600 text-white text-[14px] font-semibold rounded-lg'>Register</Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default BgNavbar
