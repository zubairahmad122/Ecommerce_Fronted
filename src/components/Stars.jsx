import React, { useState } from 'react'
 import {FaStarHalfAlt,FaStar} from 'react-icons/fa'
 import {AiOutlineStar} from 'react-icons/ai'

const Stars = ({rating}) => {
    const [starsNumb,setStartNum] = useState();
    const [toStart,setToStart] = useState(0);
    
  return (
    <div>
      <div className="icon-style">
        {ratingStart}
        <p>({reviews} Customer reviews)</p>
      </div>
    </div>
  )
}

export default Stars
