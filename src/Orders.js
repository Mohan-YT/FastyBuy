import React, { useState , useEffect } from 'react'
import './Profile.scss'
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderList = JSON.parse(localStorage.getItem("Orders")) || [];
    setOrders(orderList);
  }, []);

 const date = new Date()
 const currentDate = `${date.getDate()}/${date.getMonth()=== 0 ? 1 : date.getMonth()}/${date.getFullYear()}`
 const currentTime = `${date.getHours() === 0 ? 12 : date.getHours()}:${date.getMinutes()}`


  return (
    <>
      <main className='orderlist mb-5 pb-1 mb-md-2'>
          {
            orders.length === 0 ? ( <p className='text-center fs-3 text-secondary fw-light'>No Orders</p>) :(
              <div>
                {orders.map((order,index)=>{
                  const totalPrice = order.price * order.quantity;
                  return(
                    <div key={index} className='m-'>
                          <Link to={`/product/${order.id}`} className='row order-link m-1 mb-2'>
                                  <div className='col-5 col-md-4 ps-3 ps-md-5 image my-auto'>
                                      <img className='img-fluid' src={order.image} alt={order.title} />
                                  </div>
                                  <div className='col-7 col-md-8 my-auto d-md-flex justify-content-around align-items-center'>
                                      <h3 className='text-success fs-2 fs-md-1 fw-bolder'>{order.title}</h3>
                                      <p className='d-md-flex justify-content-center align-items-center my-auto fs-md-3'>
                                        <span className='text-secondary fw-light me-2'>{currentDate}</span>
                                        <span className='text-secondary fw-light '>{currentTime}</span>
                                      </p>
                                      <span className='fw-light'>Quantity :<span className='fw-bold'>{order.quantity}</span></span>
                                      <p className='mb-0 fw-light'>Price :<span className='fw-bold'>{order.price}</span></p>
                                      <h4 className='fw-light'>Total Price :<span className='fw-bold text-success'>{totalPrice}</span></h4>
                                  </div>
                          </Link>
                    </div>
                )})}
              </div>
            )
          }
      </main>
    </>
  );
}

export default Orders
