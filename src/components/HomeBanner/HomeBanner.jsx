import homebanner1 from '../../assets/herott.png'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
const HomeBanner = () => {
  return (
    <section className='main-home min-h-[103vh] relative m-0'>
        <div className='max-w-screen-2xl mx-auto  px-5  xsm:px-[40px] lg:px-[80px] xll:px-[140px]'>
          
          <div className='w-full flex-col mdd:flex-row  pt-16 flex items-center justify-center'>
              <motion.div  initial={{ x: -250, opacity: 0, }}
    whileInView={{ x: 0, opacity: 1, scale: 1 }} viewport={{ once: true }}
    transition={{ duration: 1, type: 'easeInOut' }} className="left mt-10 mdd:mt-0 relative z-20 flex items-start justify-center flex-1 flex-col">
                <h2 className=' pl-1 mdd:pl-0 text-[40px] sm:text-[55px] mdd:text-[60px] lg:text-[80px] xll:text-[100px] font-medium  leading-normal xll:leading-[90px] text-white font-'>Sales</h2>
                <p className='text-[#ffffffd0] font-normal text-[16px]
                 pl-2 mt-1 mdd:mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque minus eius eveniet odio tempora reprehenderit dolor, porro doloribus laboriosam soluta minima explicabo dolore iste ipsa facere, impedit optio quis obcaecati?</p>
                <Link to='/Products' className='text-black hover:bg-black hover:text-white duration-300 ease-in bg-white py-3 px-7 rounded-lg mt-5 mdd:mt-10 ml-2 '>Shop Now</Link>
              </motion.div>
              <motion.div  initial={{ x: 250, opacity: 0, }}
    whileInView={{ x: 0, opacity: 1, scale: 1 }} viewport={{ once: true }}
    transition={{ duration: 1, type: 'easeInOut' }} className="right flex relative items-center justify-center flex-1">
           

                <img src={homebanner1} alt='Product images' className='max-w-full h-auto mdd:h-[550px] relative z-10 ' />
              </motion.div>
          </div>




          <div className=" hidden mdd:block custom-shape-divider-top-1714501332">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
    </svg>
</div>
        </div>

      </section>
  )
}

export default HomeBanner