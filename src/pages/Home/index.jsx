import { useContext } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import HomeBanner from '../../components/HomeBanner/HomeBanner'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components'
import { motion } from 'framer-motion'
import bannerImg from '../../assets/Shopingbanner.jpg'
import phon1 from '../../assets/phon1.jpg'
import phon2 from '../../assets/phon2.jpg'
import hand1 from '../../assets/hand1.jpg'
import hand3 from '../../assets/hand3.jpg'
import STORE from '../../config/store'
import { HiChevronRight, HiLightningBolt, HiTag } from 'react-icons/hi'

// ── Reusable section header ────────────────────────────────────────────────
const SectionHead = ({ tag, title, sub, link }) => (
  <div className='flex items-end justify-between mb-8'>
    <div>
      {tag && (
        <span className='inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-2'>
          <span className='w-4 h-0.5 bg-indigo-600 rounded-full' />
          {tag}
        </span>
      )}
      <h2 className='text-[24px] sm:text-[28px] font-extrabold text-slate-900 leading-tight'>{title}</h2>
      {sub && <p className='text-slate-400 text-[14px] mt-1'>{sub}</p>}
    </div>
    {link && (
      <Link to='/products' className='hidden sm:flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-[13px] font-semibold transition-colors shrink-0'>
        View all <HiChevronRight size={15} />
      </Link>
    )}
  </div>
)

// ── Hardcoded category showcase using real asset images ───────────────────
const SHOWCASE_CATS = [
  { slug: 'mobile',    img: phon1,  bg: 'from-blue-50 to-indigo-100',    text: 'text-indigo-700' },
  { slug: 'mobile',    img: phon2,  bg: 'from-violet-50 to-purple-100',  text: 'text-purple-700' },
  { slug: 'headphone', img: hand1,  bg: 'from-rose-50 to-pink-100',      text: 'text-rose-700'   },
  { slug: 'headphone', img: hand3,  bg: 'from-amber-50 to-orange-100',   text: 'text-orange-700' },
]

const Home = () => {
  const { products } = useContext(ProductContext)
  const popular     = products.slice(0, 4)
  const newArrivals = products.slice(4, 8)

  // unique categories from DB
  const dbCats = [...new Set(products.map(p => p.category))].filter(Boolean)

  return (
    <div className='bg-slate-50'>
      <Navbar />
      <HomeBanner />

      {/* ── Category Showcase ──────────────────────────────────────────── */}
      {dbCats.length > 0 && (
        <section className='max-w-screen-xl mx-auto px-5 sm:px-8 py-14'>
          <SectionHead tag='Browse' title='Shop by Category' />
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {SHOWCASE_CATS.map((cat, i) => {
              const cfg   = STORE.categories[cat.slug] || { label: cat.slug, emoji: '🛍️' }
              const count = products.filter(p => p.category === cat.slug).length
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/products?cat=${cat.slug}`}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${cat.bg} border border-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <div className='p-4 pb-2'>
                      <span className='text-[22px]'>{cfg.emoji}</span>
                      <p className={`text-[15px] font-bold mt-1 ${cat.text}`}>{cfg.label}</p>
                      <p className='text-slate-400 text-[12px]'>{count} products</p>
                    </div>
                    <div className='flex-1 flex items-end justify-center overflow-hidden max-h-[120px]'>
                      <img
                        src={cat.img}
                        alt={cfg.label}
                        className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* All category pills */}
          <div className='flex flex-wrap gap-2 mt-5'>
            <Link to='/products' className='px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-[13px] hover:bg-indigo-700 transition-colors'>
              All Products
            </Link>
            {dbCats.map(cat => (
              <Link
                key={cat}
                to={`/products?cat=${cat}`}
                className='px-5 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-600 font-semibold text-[13px] capitalize transition-colors shadow-sm'
              >
                {STORE.categories[cat]?.label || cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Flash Deals strip ──────────────────────────────────────────── */}
      <section className='bg-gradient-to-r from-indigo-600 to-violet-600'>
        <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0'>
              <HiLightningBolt size={24} className='text-white' />
            </div>
            <div>
              <p className='text-white font-extrabold text-[20px] leading-tight'>Flash Deals</p>
              <p className='text-indigo-200 text-[13px]'>Prices slashed for a limited time</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='text-center bg-white/20 rounded-xl px-4 py-2 min-w-[60px]'>
              <p className='text-white font-extrabold text-[22px] leading-none'>08</p>
              <p className='text-indigo-200 text-[10px] font-medium uppercase'>Hrs</p>
            </div>
            <span className='text-white font-bold text-[22px]'>:</span>
            <div className='text-center bg-white/20 rounded-xl px-4 py-2 min-w-[60px]'>
              <p className='text-white font-extrabold text-[22px] leading-none'>45</p>
              <p className='text-indigo-200 text-[10px] font-medium uppercase'>Min</p>
            </div>
            <span className='text-white font-bold text-[22px]'>:</span>
            <div className='text-center bg-white/20 rounded-xl px-4 py-2 min-w-[60px]'>
              <p className='text-white font-extrabold text-[22px] leading-none'>30</p>
              <p className='text-indigo-200 text-[10px] font-medium uppercase'>Sec</p>
            </div>
            <Link
              to='/products'
              className='ml-4 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors text-[14px] whitespace-nowrap'
            >
              Shop Deals →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Best Sellers ───────────────────────────────────────────────── */}
      {popular.length > 0 && (
        <section className='max-w-screen-xl mx-auto px-5 sm:px-8 py-14'>
          <SectionHead
            tag='Hot Right Now'
            title='Best Sellers'
            sub='The most loved products this week'
            link
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='grid grid-cols-2 sm:grid-cols-3 mdd:grid-cols-4 gap-4 sm:gap-5'
          >
            {popular.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card image={p.image} price={p.price} id={p._id} title={p.name} des={p.description} category={p.category} />
              </motion.div>
            ))}
          </motion.div>
          <div className='sm:hidden mt-5 text-center'>
            <Link to='/products' className='inline-flex items-center gap-1 text-indigo-600 font-semibold text-[14px]'>
              View all <HiChevronRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* ── Promo Banner ───────────────────────────────────────────────── */}
      <section className='max-w-screen-xl mx-auto px-5 sm:px-8 py-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='relative rounded-3xl overflow-hidden'
        >
          <img src={bannerImg} alt='Promo' className='w-full h-[240px] sm:h-[320px] object-cover object-center' />
          <div className='absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent' />
          <div className='absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-14'>
            <span className='flex items-center gap-1.5 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3'>
              <HiTag size={12} /> {STORE.promoBanner.tag}
            </span>
            <h2 className='text-white text-[26px] sm:text-[38px] font-extrabold leading-tight mb-2'>
              {STORE.promoBanner.title}
            </h2>
            <p className='text-white/70 text-[14px] mb-5 hidden sm:block'>{STORE.promoBanner.sub}</p>
            <Link
              to='/products'
              className='px-7 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl transition-colors text-[14px] shadow-lg'
            >
              {STORE.promoBanner.cta} →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── New Arrivals ───────────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className='max-w-screen-xl mx-auto px-5 sm:px-8 py-14'>
          <SectionHead
            tag='Just Dropped'
            title='New Arrivals'
            sub='Fresh picks just added to the store'
            link
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='grid grid-cols-2 sm:grid-cols-3 mdd:grid-cols-4 gap-4 sm:gap-5'
          >
            {newArrivals.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card image={p.image} price={p.price} id={p._id} title={p.name} des={p.description} category={p.category} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section className='max-w-screen-xl mx-auto px-5 sm:px-8 pb-16'>
        <div className='bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl px-7 sm:px-14 py-12 text-center'>
          <p className='text-indigo-200 text-[12px] font-bold uppercase tracking-widest mb-2'>Stay Updated</p>
          <h3 className='text-white text-[26px] sm:text-[32px] font-extrabold mb-2'>
            Get Exclusive Deals First
          </h3>
          <p className='text-indigo-200 text-[14px] mb-7 max-w-md mx-auto'>
            Join our newsletter and be the first to know about new products, flash sales and special offers.
          </p>
          <form className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto' onSubmit={e => e.preventDefault()}>
            <input
              type='email'
              placeholder='Enter your email address'
              className='flex-1 px-5 py-3.5 rounded-xl text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white/40'
            />
            <button
              type='submit'
              className='px-7 py-3.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors text-[14px] shrink-0'
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
