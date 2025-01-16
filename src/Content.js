import React from 'react'
import MyData from './data/index.json'
import './Cantent.scss'
import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Content = () => {
  const box1 = MyData.content[0].boxOne;
  const box2 = MyData.content[0].boxTwo;
  const fashion = MyData.content[0].fashion;
  return (
    <>
    <div className='content'>
        {box1.map((items)=>(
          <div key={items.id} className='cards m-1'>
              <Link  to={`/product/${items.id}`}>
                <div className='image'>
                    <img src={items.image} className='img-fluid'/>
                </div>
                <div className='title'>{items.h3}</div>
              </Link>
          </div>
        ))}
    </div>
    <div className='content-2 row m-1'>
        <p className='col-12 fs-1'>Sign-in offers</p>
        {
          box2.map((item)=>(
            <div key={item.id} className='cards-2 col-5 col-md-4 m-1 p-0'>
                <Link  to={`/product/${item.id}`} className='col-12'>
                  <div className='image-2 col-12'>
                    <img src={item.image} className='img-fluid col-12' />
                  </div>
                  <div className='title-2 col-12 text-center text-white bg-dark fw-bolder '>{item.h3}</div>
                </Link>
            </div>
          ))
        }
    </div>
    <div className="content-3 row m-1 mt-3 mb-5 mb-sm-3">
        <p className="col-12 p-0 mb-1">Special Offers</p>
        {fashion.map((products)=>(
          <div key={products.id} className='cards-3 col-6 mb-4'>
                <Link to={`/product/${products.id}`} className='p-2'>
                    <div className="image-3 col-12">
                        <img src={products.image} className='img-fluid'/>
                    </div>
                    <div className='details text-start'>
                      <h3 className='col-12 fs-6 fs-sm-3 fw-bolder'>{products.h3}</h3>
                      <p className='col-12 text-secondary fw-light'>{products.discription}</p>
                      <span className='col-12 fs-5 fw-bolder me-2'><FaRupeeSign className='IN-Doller text-secondary' />{products.price}</span>
                      <span className='col-12 text-success fs-1'>{products.offer}</span>
                    </div>
                   
                </Link>
          </div>
        ))

        }
    </div>
        
    </>
  )
}

export default Content
