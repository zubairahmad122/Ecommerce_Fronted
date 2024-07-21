import React from 'react'

const index = () => {
  return (
    <section className='w-full p-5 h-[80vh] overflow-y-scroll no-scrollbar'>
      <h1 className='text-3xl font-bold mb-5'>Orders Page!</h1>

      <div className='p-4 border border-red-500 items-start flex justify-between flex-wrap'>
        <div className="flex gap-6  max-w-[300px]">
        <img src="" alt="Product" />

<div>
  <h5 className='text-[16px] font-normal'>Greek jkhsh </h5>
  <p className='mt-8 text-[14px] text-gray-500'>
    <span className='font-medium block text-black mb-1'>Haris khan</span> 

    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, consequatur?
  </p>
</div>
          </div>
          <p className='text-[16px] text-gray-600'>item : 6</p>
          <p className='text-[16px] text-gray-600'>item : 6</p>

          <select className='px-3 max-h-[40px] py-0 border border-red-300 bg-[#ff464621]'>
            <option value="">Select</option>
            <option value="">Option 1</option>
            <option value="">Option 2</option>
          </select>
      </div>
    </section>
  )
}

export default index