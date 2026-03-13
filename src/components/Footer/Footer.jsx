import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { HiMail } from 'react-icons/hi'
import STORE from '../../config/store'

const Footer = () => (
  <footer className='bg-slate-900 text-white'>
    <div className='max-w-screen-xl mx-auto px-5 sm:px-8 pt-14 pb-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 mdd:grid-cols-4 gap-10 mb-12'>

        {/* Brand */}
        <div className='sm:col-span-2 mdd:col-span-1'>
          <Link to='/' className='text-[20px] font-bold tracking-tight'>
            {STORE.name} <span className='text-indigo-400'>{STORE.nameAccent}</span>
          </Link>
          <p className='text-slate-400 text-[13px] mt-3 leading-relaxed max-w-[220px]'>
            {STORE.footer.about}
          </p>
          <div className='flex items-center gap-2 mt-5'>
            {[BiLogoFacebook, BiLogoInstagram, BiLogoTwitter].map((Icon, i) => (
              <a key={i} href='#' className='w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors'>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h4 className='text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4'>Shop</h4>
          <ul className='flex flex-col gap-2.5'>
            {STORE.footer.links.shop.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className='text-slate-400 hover:text-white text-[13px] transition-colors'>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account links */}
        <div>
          <h4 className='text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4'>Account</h4>
          <ul className='flex flex-col gap-2.5'>
            {STORE.footer.links.account.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className='text-slate-400 hover:text-white text-[13px] transition-colors'>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className='text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4'>Newsletter</h4>
          <p className='text-slate-400 text-[13px] mb-4'>Weekly deals straight to your inbox.</p>
          <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
            <input
              type='email'
              placeholder='Your email'
              className='flex-1 px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-[13px] text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition-colors'
            />
            <button className='px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shrink-0'>
              <HiMail size={16} />
            </button>
          </form>
          {STORE.footer.contact.email && (
            <a href={`mailto:${STORE.footer.contact.email}`} className='flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-[12px] mt-3 transition-colors'>
              <HiMail size={13} />
              {STORE.footer.contact.email}
            </a>
          )}
        </div>
      </div>

      <div className='border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-slate-500 text-[12px]'>{STORE.footer.copyright}</p>
        <div className='flex items-center gap-5'>
          <a href='#' className='text-slate-500 hover:text-slate-300 text-[12px] transition-colors'>Privacy Policy</a>
          <a href='#' className='text-slate-500 hover:text-slate-300 text-[12px] transition-colors'>Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
