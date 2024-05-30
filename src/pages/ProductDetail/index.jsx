import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductsContext';
import { useParams } from 'react-router-dom';
import { FaStarHalfAlt, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import BgNavbar from '../../components/BgNavbar/BgNavbar';

const ProductDetail = () => {
  const [smallImg, setSmImage] = useState(null);
  const [singProduct, setProduct] = useState({});
  const [ratings, setRatings] = useState([]);
  const [halfRating, setHalfRatings] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  const { products } = useContext(ProductContext);
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  const { id } = useParams();

  useEffect(() => {
    const product = products.find(item => item._id === id);


    if (product) {
      setProduct(product);
      setSmImage(product.image);
      const half = product.rating / 2;
      setHalfRatings(half);
      let arr = [];
      for (let i = 0; i < product.rating; i++) {
        arr.push(i);
      }
      setRatings(arr);
    }
  }, [id, cart, products]);




  const { image, price, name, description, rating, _id: productId } = singProduct;

  const url = process.env.URI;

  return (
    <>
      <BgNavbar />
      <section className='my-[100px] mt-[150px]  px-[1rem] lg:px-[2rem] py-[2rem]'>
        <div className='main-product-detail w-full h-full flex items-center flex-col md:flex-row justify-center'>
          <div className="flex-1 flex items-center flex-col xsm:flex-row md:items-start gap-[10px]  justify-center h-full px-[0.5rem] lg:px-[1rem]">
            <div className='border rounded-sm p-[10px] duration-700 hover:shadow-lg'>
              <img className='w-[500px] h-[370px] duration-700 object-cover hover:scale-110' src={`${url}/images/${image}`} alt="" />
            </div>
          </div>
          <div className='flex-1 flex flex-col items-center md:items-start justify-center md:justify-start h-full px-[1rem]'>
            <h4 className='font-semibold mb-[10px] text-[23px]'>{name}</h4>
            {/* <div className='flex items-center'>
              {ratings.map(i => (
                <p key={i}><FaStar className='text-yellow-400' /></p>
              ))}
              {halfRating && <p><FaStarHalfAlt className='text-yellow-400' /></p>}
            </div> */}
            <p className='font-semibold mt-[20px]'>$ {price}</p>
            <p className='my-[20px] text-center md:text-left'>{description}</p>
            <div className='flex items-center border gap-2'>
              <button onClick={() => addToCart( productId)} className='border px-1 xsm:px-2 py-1'><FaPlus /></button>
              <p>{cart[productId] ? cart[productId] : 0}</p>
              <button onClick={() => removeFromCart(productId)} className='border px-2 py-1'><FaMinus /></button>
            </div>
            <button onClick={() => addToCart( productId)} className='px-[20px] py-[10px] bg-[#ff3a3a] my-[30px] hover:bg-blue-600 duration-500 text-white'>Add To Cart</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
