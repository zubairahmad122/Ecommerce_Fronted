import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductsContext'
import Card from '../../components/Card/Card'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { motion } from 'framer-motion'
import { HiSearch, HiAdjustments, HiX } from 'react-icons/hi'
import STORE from '../../config/store'

const POSTS_PER_PAGE = 12

const Products = () => {
  const { products } = useContext(ProductContext)
  const [searchParams] = useSearchParams()

  const [category,    setCategory]    = useState('All')
  const [query,       setQuery]       = useState('')
  const [maxPrice,    setMaxPrice]    = useState(1700)
  const [sortBy,      setSortBy]      = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterOpen,  setFilterOpen]  = useState(false)

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setCategory(cat)
  }, [searchParams])

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))]

  const catCount = (cat) => cat === 'All' ? products.length : products.filter(p => p.category === cat).length

  let filtered = products.filter(p => {
    const matchCat   = category === 'All' || p.category === category
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase())
    const matchPrice = p.price <= maxPrice
    return matchCat && matchQuery && matchPrice
  })

  if (sortBy === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sortBy === 'name-asc')   filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const start      = (currentPage - 1) * POSTS_PER_PAGE
  const paginated  = filtered.slice(start, start + POSTS_PER_PAGE)

  const handleCategoryChange = (cat) => { setCategory(cat); setCurrentPage(1) }
  const handleQueryChange    = (e)   => { setQuery(e.target.value); setCurrentPage(1) }
  const clearAll = () => { setCategory('All'); setQuery(''); setMaxPrice(1700); setSortBy('default'); setCurrentPage(1) }

  const hasFilters = category !== 'All' || query !== '' || maxPrice < 1700

  return (
    <>
      <BgNavbar />

      {/* Page header */}
      <section className='bg-white border-b border-slate-100 pt-16'>
        <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-10 bg-white'>
          <div className='flex items-center gap-2 text-[12px] text-slate-400 mb-3'>
            <span>Home</span><span>/</span><span className='text-slate-600 font-medium'>Shop</span>
          </div>
          <h1 className='text-[32px] sm:text-[40px] font-extrabold text-slate-900'>
            All <span className='text-indigo-600'>Products</span>
          </h1>
          <p className='text-slate-400 mt-1 text-[14px]'>{filtered.length} products available</p>
        </div>
      </section>

      <div className='max-w-screen-xl mx-auto px-5 sm:px-8 py-10'>
        <div className='flex flex-col mdd:flex-row gap-8'>

          {/* Sidebar */}
          <aside className='mdd:w-[240px] shrink-0'>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className='mdd:hidden flex items-center gap-2 w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] font-semibold text-slate-700 mb-4'
            >
              <HiAdjustments size={18} />
              Filters
              <span className='ml-auto text-indigo-600'>{filterOpen ? '▲' : '▼'}</span>
            </button>

            <div className={`${filterOpen ? 'flex' : 'hidden'} mdd:flex flex-col gap-6`}>

              {/* Search */}
              <div className='bg-white border border-slate-200 rounded-2xl p-4'>
                <h3 className='text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-3'>Search</h3>
                <div className='flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl focus-within:border-indigo-400 transition-colors'>
                  <HiSearch size={16} className='text-slate-400' />
                  <input
                    value={query}
                    onChange={handleQueryChange}
                    placeholder='Search products...'
                    className='flex-1 outline-none text-[14px] text-slate-700 bg-transparent placeholder:text-slate-400'
                  />
                </div>
              </div>

              {/* Categories */}
              <div className='bg-white border border-slate-200 rounded-2xl p-4'>
                <h3 className='text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-3'>Category</h3>
                <ul className='flex flex-col gap-1'>
                  {categories.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-medium transition-colors flex items-center gap-2 ${
                          category === cat
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {cat !== 'All' && (
                          <span className='text-[14px]'>{STORE.categories[cat]?.emoji || '🛍️'}</span>
                        )}
                        <span className='flex-1 text-left'>{cat === 'All' ? 'All Products' : (STORE.categories[cat]?.label || cat)}</span>
                        <span className={`text-[11px] ml-auto tabular-nums ${category === cat ? 'text-indigo-400' : 'text-slate-400'}`}>{catCount(cat)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className='bg-white border border-slate-200 rounded-2xl p-4'>
                <h3 className='text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-3'>Max Price</h3>
                <input
                  type='range'
                  min={0}
                  max={1700}
                  value={maxPrice}
                  onChange={e => { setMaxPrice(parseInt(e.target.value)); setCurrentPage(1) }}
                  className='w-full accent-indigo-600'
                />
                <div className='flex justify-between mt-2'>
                  <span className='text-[12px] text-slate-400'>$0</span>
                  <span className='text-[13px] font-semibold text-indigo-600'>${maxPrice}</span>
                </div>
              </div>

            </div>
          </aside>

          {/* Products grid */}
          <div className='flex-1'>

            {/* Sort + count bar */}
            <div className='flex items-center justify-between mb-5 gap-3 flex-wrap'>
              <div className='flex items-center gap-2 flex-wrap'>
                <p className='text-[13px] text-slate-500'>
                  <span className='font-semibold text-slate-800'>{filtered.length}</span> products
                </p>
                {hasFilters && (
                  <>
                    {category !== 'All' && (
                      <span className='flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[12px] font-semibold rounded-full border border-indigo-200'>
                        {STORE.categories[category]?.label || category}
                        <button onClick={() => handleCategoryChange('All')}><HiX size={11} /></button>
                      </span>
                    )}
                    {query && (
                      <span className='flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-[12px] font-semibold rounded-full border border-slate-200'>
                        "{query}"
                        <button onClick={() => setQuery('')}><HiX size={11} /></button>
                      </span>
                    )}
                    {maxPrice < 1700 && (
                      <span className='flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-[12px] font-semibold rounded-full border border-slate-200'>
                        Max ${maxPrice}
                        <button onClick={() => setMaxPrice(1700)}><HiX size={11} /></button>
                      </span>
                    )}
                    <button onClick={clearAll} className='text-[12px] text-red-500 hover:text-red-700 font-medium transition-colors'>
                      Clear all
                    </button>
                  </>
                )}
              </div>
              <select
                value={sortBy}
                onChange={e => { setSortBy(e.target.value); setCurrentPage(1) }}
                className='px-3 py-2 border border-slate-200 rounded-xl text-[13px] text-slate-700 outline-none focus:border-indigo-400 bg-white cursor-pointer'
              >
                <option value='default'>Sort: Featured</option>
                <option value='price-asc'>Price: Low to High</option>
                <option value='price-desc'>Price: High to Low</option>
                <option value='name-asc'>Name: A–Z</option>
              </select>
            </div>

            {paginated.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-24 text-center'>
                <p className='text-slate-400 text-[16px] mb-3'>No products match your filters.</p>
                <button
                  onClick={() => { setCategory('All'); setQuery(''); setMaxPrice(1700) }}
                  className='px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[14px] font-semibold hover:bg-indigo-700 transition-colors'
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                >
                  {paginated.map(p => (
                    <Card key={p._id} image={p.image} price={p.price} id={p._id} title={p.name} des={p.description} category={p.category} />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='flex items-center justify-center gap-2 mt-10'>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className='px-4 py-2 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                    >
                      ← Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 rounded-xl text-[13px] font-semibold transition-colors ${
                          p === currentPage
                            ? 'bg-indigo-600 text-white'
                            : 'border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className='px-4 py-2 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
