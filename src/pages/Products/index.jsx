import { Children, useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import './product.css'
import Card from '../../components/Card/Card'
import BgNavbar from '../../components/BgNavbar/BgNavbar'
import { motion } from 'framer-motion'
const index = () => {
  const { products } = useContext(ProductContext)
  const [category, setCategory] = useState('All')
  const [filterPro, setFilterPro] = useState([]);
  const [uniqueCatg, setUniqeCarg] = useState([]);
  const [prMaxRange, setMaxPrRange] = useState(1700)
  const [prMinRange, setMinPrRange] = useState(0)
  const [query, setQueryrPro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);






  useEffect(() => {
    const getUniqe = (data) => {
      let newVal = data.map((i) => (i.category))

      return newVal = ["All", ...new Set(newVal)]
    }
    const catg = getUniqe(products);
    setUniqeCarg(catg)

    const filterFunc = (products) => {
      if (query === '') {
        return products.filter((i) => {
          return (category === "All" || i.category === category)
        })
      } else {
        return products.filter((i) => {
          return i.title.toLowerCase().includes(query.toLowerCase()) && (category === "All" || i.category === category) && i.price >= prMinRange && i.price <= prMaxRange;
        })
      }

    }

    let filterData = filterFunc(products)
    filterData = filterData.filter((i) => {
      return ((i.price >= prMinRange && i.price <= prMaxRange))
    })

    setFilterPro(filterData);


  }, [products, query, category, prMaxRange])



  const lastPostIndex = currentPage * postsPerPage  // 8
  const fristPostIndex = lastPostIndex - lastPostIndex
  const currentPosts = filterPro.slice(fristPostIndex, lastPostIndex)
  let pages = [];
  for (let i = 1; i < filterPro.length / postsPerPage; i++) {
    pages.push(i)
  }

  return (
    <>
    <BgNavbar />
      <motion.section initial={{ y: 0, opacity: 0, scale:0.5 }}
    whileInView={{ y: 0, opacity: 1, scale: 1 }} viewport={{ once: true }}
    transition={{ duration: 0.5, type: 'easeInOut' }}  id='main-shop' className='flex items-center justify-center w-full h-[50vh] mt-[60px] sm:mt-[85px]  xsm:h-[70vh] mb-0  object-cover bg-center bg-cover'>
      <h1 className='text-[28px] font-medium tracking-wide text-blue-700  uppercase text-center xsm:text-[40px] mdd:text-[60px] xl:text-[85px]'>Our Shop</h1>
      </motion.section>

      <motion.section className='w-full max-w-screen-2xl mx-auto  my-0 sm:my-[60px]'>
        {/* ----- for filter  */}
        <div className=' px-[20px] mdd:px-[40px] mdd:items-start flex-wrap flex items-center justify-center w-full flex-col mdd:flex-row  '>
          <div className=' w-full mdd:w-[20%] items-center justify-center mt-[60px]'>
            <div className=' w-full md:w-[80%] flex items-center py-[0px] rounded-lg justify-center border-[2px] mb-[20px] border-[#918282] '>
              <input className='w-full py-[10px]  outline-none h-full px-2 bg-transparent' onChange={(e) => setQueryrPro(e.target.value)} type="text" placeholder='search Here ...' autoComplete='none' />
            </div>
            <ul className='pl-1'>
              <h2 className='font-bold mb-[20px] text-[18px]'>Catagories</h2>
              {
                uniqueCatg?.map((i,index) => (
                  <li key={index} className={`mb-3 hover:underline cursor-pointer ${category === i ? "text-yellow-500" : 'text-cyan-600'}`} onClick={() => setCategory(i)}>{i}</li>
                ))
              }
            </ul>
            <input className=' w-full md:w-[80%]' type="range" min={0} max={1700} value={prMaxRange} onChange={(e) => setMaxPrRange(parseInt(e.target.value))} />
          </div>

          {/* for products  */}
          <div className=' w-full mdd:w-[70%]'>
            <div className='flex flex-wrap justify-center gap-[30px] my-[50px]'>
              {
                currentPosts.map((i) => (
                  <Card key={i._id} image={i.image} price={i.price} id={i._id} title={i.name} product={i} />
                ))
              }

            </div>
            <div className="flex items-center justify-center mx-auto">
              {pages.map((i, index) => {
                return (
                  <div key={index} className='' onClick={() => setCurrentPage(i)}>
                    <p className={` border-[1px] px-[14px] cursor-pointer hover:shadow-lg py-1 ${i === currentPage ? 'bg-pink-300' : 'bg-transparent'}`} >{i}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </motion.section>


    </>

  )
}

export default index