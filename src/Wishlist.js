import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";

const Wishlist = () => {
  const [getwishlist,setGetWishlist] = useState([])
  useEffect(()=>{
    const getlist = JSON.parse(localStorage.getItem('wishlist')) || []
    setGetWishlist(getlist)
  },[])
  return (
    <>
        <main className='mb-4 mb-md-2' >
           { getwishlist.length === 0 ? (<p className='text-center'>Your Wishlist is Empty</p>) :(
            <div className='row'>
              {getwishlist.map((item)=>(
                   <div className="content-box col-6 col-md-4" key={item.id}>
                   <Link to={`/product/${item.id}`} className="">
                     <div className="image">
                       <img src={item.image} alt={item.title || "Item Image"} className="img-fluid" />
                     </div>
                     <div className="details">
                       <h3>{item.title}</h3>
                       <p className="text-secondary fw-light">{item.discription}</p>
                       <p>
                         <span className="fw-bolder fs-3">
                           <FaRupeeSign className="Ind-rupee" />
                           {item.price}
                         </span>
                         <span className="fw-bold fs-1 text-success">{item.offer}</span>
                       </p>
                       
                     </div>
                   </Link>
                 </div>
              ))}
            </div>
            )
          }
        </main>
    </>
  )
}

export default Wishlist
