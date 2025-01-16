import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddCarts = () => {
    const [addCart, setAddCart] = useState([]);

    useEffect(() => {
        const getCart = JSON.parse(localStorage.getItem('Addcard')) || [];
        setAddCart(getCart);
    }, []);

    const handleRemove = (removeIndex) => {
        const updatedCart = addCart.filter((_, index) => index !== removeIndex);
        setAddCart(updatedCart);
        localStorage.setItem('Addcard', JSON.stringify(updatedCart));
    };

    const handleOrder = (orderIndex) => {
        try {
            //  take old order list from localStorage
                const getOrders = JSON.parse(localStorage.getItem('Orders')) || []; 

                const updateOrders = [...getOrders,orderIndex]; //Add the current product to the order list

                localStorage.setItem('Orders',JSON.stringify(updateOrders))  //Store the updated list to localStorage
                
          } catch (error) {
            return(<p>{`Error adding product to Cart list: ${error.message}`}</p>)
        };
    }
    //get total price
    const totalOrderPrice = () => {
        return addCart.reduce((total, item) => {
            const quantity = item.quantity || 1;
            return total + (item.price * quantity);
        }, 0);
    };
    return (
        <main>
            {addCart.length === 0 ? (
                <p>No Items</p>
            ) : (
                <div>
                    {addCart.map((item, index) => (
                        <div
                            className='row mx-2 my-2'
                            key={index}
                            style={{ border: '1px solid gray', borderRadius: '10px' }}
                        >
                            <Link to={`/product/${item.id}`} className='col-5 my-auto'>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className='img-fluid'
                                    style={{ backgroundColor: 'whitesmoke', borderRadius: '10px' }}
                                />
                            </Link>
                            <div className='col-7 px-1 py-2'>
                                <h2>{item.title}</h2>
                                <p>{item.discription || item.description}</p>
                                <p className='d-flex justify-content-start align-items-center'>
                                    <span className='text-secondary'>&#8377;</span><span className='me-2 '>{item.price}</span>
                                    <span className='fs-1 text-success fw-light'>{item.offer}</span>
                                </p>

                                <button onClick={() => handleOrder(item)}
                                        className='me-1 btn bg-success text-light px-4 fw-bold'>Buy
                                </button>
                                <button onClick={() => handleRemove(index)}
                                        className='btn bg-danger text-light fw-bold'>Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='text-center'>
                <h2 className='btn' style={{border : '1px solid gray', borderRadius : '5px'}}>Total Price : &#8377; <span className='fs-2 text-success fw-bold'>{totalOrderPrice()}</span></h2>
            </div>
        </main>
    );
};

export default AddCarts
