import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import homebanner1 from '../../assets/herott.png'
import { HiShieldCheck, HiTruck, HiRefresh, HiSupport, HiStar, HiChevronRight } from 'react-icons/hi'
import STORE from '../../config/store'

const iconMap = {
  truck:   HiTruck,
  shield:  HiShieldCheck,
  refresh: HiRefresh,
  support: HiSupport,
}

const HomeBanner = () => {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className='bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white pt-16 overflow-hidden'>
        <div className='max-w-screen-xl mx-auto px-5 sm:px-8'>
          <div className='flex flex-col mdd:flex-row items-center gap-6 mdd:gap-0 min-h-[calc(100vh-64px)]'>

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='flex-1 py-12 mdd:py-0 z-10'
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-4 py-1.5 rounded-full text-[12px] font-bold mb-6 uppercase tracking-wide'
              >
                <span className='w-2 h-2 rounded-full bg-orange-500 animate-ping' />
                {STORE.hero.badge}
              </motion.div>

              <h1 className='text-[44px] sm:text-[56px] mdd:text-[62px] lg:text-[72px] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-5'>
                {STORE.hero.headline}<br />
                <span className='text-indigo-600'>{STORE.hero.headlineAccent}</span>
              </h1>

              <p className='text-slate-500 text-[16px] leading-relaxed mb-8 max-w-[460px]'>
                {STORE.hero.subtext}
              </p>

              {/* CTAs */}
              <div className='flex flex-wrap items-center gap-3 mb-10'>
                <Link
                  to='/products'
                  className='flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 text-[15px]'
                >
                  {STORE.hero.ctaPrimary}
                  <HiChevronRight size={18} />
                </Link>
                <Link
                  to='/products'
                  className='px-7 py-3.5 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold rounded-xl transition-all duration-200 text-[15px]'
                >
                  {STORE.hero.ctaSecondary}
                </Link>
              </div>

              {/* Stats */}
              <div className='flex items-center gap-6 sm:gap-10'>
                {STORE.hero.stats.map(({ value, label }) => (
                  <div key={label} className='text-center sm:text-left'>
                    <p className='text-[26px] font-extrabold text-slate-900 leading-none'>{value}</p>
                    <p className='text-slate-400 text-[12px] font-medium mt-0.5'>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className='flex-1 flex items-center justify-center relative pb-10 mdd:pb-0'
            >
              {/* Background blob */}
              <div className='absolute w-[420px] h-[420px] bg-indigo-100 rounded-full blur-3xl opacity-60 -z-10' />

              {/* Product image */}
              <div className='relative'>
                <img
                  src={homebanner1}
                  alt='Featured Product'
                  className='relative z-10 max-w-[340px] sm:max-w-[420px] mdd:max-w-[480px] w-full object-contain drop-shadow-2xl'
                />

                {/* Floating badge — discount */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                  className='absolute top-6 -left-4 sm:left-0 bg-orange-500 text-white px-4 py-2 rounded-2xl shadow-xl text-center z-20'
                >
                  <p className='text-[22px] font-extrabold leading-none'>50%</p>
                  <p className='text-[11px] font-semibold opacity-90'>OFF</p>
                </motion.div>

                {/* Floating badge — rating */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  className='absolute bottom-12 -right-4 sm:right-0 bg-white border border-slate-100 shadow-xl px-4 py-2.5 rounded-2xl z-20 flex items-center gap-2'
                >
                  <HiStar size={18} className='text-yellow-400' />
                  <div>
                    <p className='text-[14px] font-bold text-slate-800 leading-none'>4.9 / 5</p>
                    <p className='text-[11px] text-slate-400'>1,200+ reviews</p>
                  </div>
                </motion.div>

                {/* Floating badge — shipping */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
                  className='absolute top-1/2 -left-6 sm:-left-2 bg-white border border-slate-100 shadow-xl px-3 py-2 rounded-2xl z-20 flex items-center gap-2'
                >
                  <span className='text-[20px]'>🚚</span>
                  <div>
                    <p className='text-[12px] font-bold text-slate-800 leading-none'>Free Shipping</p>
                    <p className='text-[10px] text-slate-400'>Next-day delivery</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Trust / Feature Bar ─────────────────────────────────────────── */}
      <section className='bg-white border-y border-slate-100'>
        <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-6'>
          <div className='grid grid-cols-2 mdd:grid-cols-4 gap-4 sm:gap-6'>
            {STORE.features.map(({ icon, label, sub }) => {
              const Icon = iconMap[icon] || HiShieldCheck
              return (
                <div key={label} className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0'>
                    <Icon size={20} className='text-indigo-600' />
                  </div>
                  <div>
                    <p className='text-[13px] font-semibold text-slate-700'>{label}</p>
                    <p className='text-[12px] text-slate-400'>{sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeBanner
