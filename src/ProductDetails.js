import React, { useEffect, useState , useReducer } from "react";
import {  useParams } from "react-router-dom";
import './ProductDetails.scss'

const ProductDetails = ({ allItems, toggleWishList}) => {

    //useParams is a hook provided by React Router.It is used to access parameters from the current route's path.its provide only string value
    const { id } = useParams();  

    //wishlist page (use only product is in wishlist or not)
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []

    // Find the product by ID. allItems.find() is used to find the specific product with the matching id. parseInt(id) used for convert 'id' to id
    const product = allItems.find(item => item.id === parseInt(id));  
                                                                    
    const [order,setOrder] = useState([])

    //manage quantity
    const initialState = { count: 0 };
    function Reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return { count: state.count < 10 ? state.count + 1 : state.count };
            case 'decrement':
                return { count: state.count > 0 ? state.count - 1 : state.count };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(Reducer, initialState)

    const productData = {...product,quantity: state.count}

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('Orders')) || [];
        setOrder(storedOrders);
    }, []);

    if (!product) {
        return <p>Product not found</p>;
    }

    const handleOrder = (e)=>{
        
        e.preventDefault()
        try {
            //  store product geted time and unique id for handle cancel button
                const getOrders = {...productData,uniqueId: Date.now()}

                const updateOrders = [...order,getOrders]; //Add the current product to the order list
                setOrder(updateOrders)
                localStorage.setItem('Orders',JSON.stringify(updateOrders))  //Store the updated list to localStorage
                alert(`your Prodect ${`"${product.title}"`} is order placed`)

        } catch (error) {
            return(<p>{`Error adding product to order list: ${error.message}`}</p>)
        }
    }

    const handleCancel = (uniqueId)=>{
        const updatedOrders = order.filter((orders) => orders.uniqueId !== uniqueId);
        localStorage.setItem('Orders', JSON.stringify(updatedOrders));
        alert(`Order for ${`"${product.title}"`} has been canceled.`);
        setOrder(updatedOrders)
    }
    const ckeckOrder = order.some((orders)=>orders.id === productData.id) //product.id is means curent taken product.id

    //Addcort page
    const handleAddCard = (e) =>{
        e.preventDefault()
            try{
                const getCart = JSON.parse(localStorage.getItem('Addcard')) || [];
                const updateCart = [...getCart,{ ...productData}]
                alert(`Order for ${`"${product.title}"`} has been add to cart.`);
                localStorage.setItem('Addcard',JSON.stringify(updateCart))
            }catch(err){
                return(<p>{`Error adding product to order list: ${err.message}`}</p>)
            }   
    }
    // const [count ,setCount] = useState()
   
   

  return (
    <>
        <main className="mb-4 mb-md-0">
            <div className="row product-details p-2">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center image">
                    <div>
                        <img className=" img-fluid p-2 mb-3" 
                            src={productData.image} 
                            alt={productData.title} 
                            style={{ maxWidth: "300px", maxHeight: "300px" }} 
                        />
                    </div>
                     <div>
                        <i onClick={()=>toggleWishList(productData)} 
                            className={`bi ${
                                wishlist.find((wishlistItem) => wishlistItem.id === productData.id)
                                ? "bi-heart-fill text-danger"
                                : "bi-heart"
                            } heart`}>
                        </i>
                     </div>
                </div>
                <div className="col-12 col-md-6">
                    <h1 className="title ">{productData.title}</h1>
                    <p className="col-12 description">{productData.discription || productData.description}</p>
                    <div className="">
                       <div className="d-flex justify-content-start align-items-center">
                            <button className="btn text-center  fs-4 fw-bold" style={{backgroundColor : "whitesmoke"}} onClick={()=>dispatch({type:'decrement'})}>-</button>

                                    <span className="fs-2 fw-bold m-2">{state.count}</span>

                            <button className="btn fs-4 fw-bold" style={{backgroundColor : "whitesmoke"}} onClick={()=>dispatch({type:'increment'})}>+</button>
                       </div>
                        <span className="spanrice col-2 me-2 fs-4"> <span className="text-secondary fs-6 pe-1">₹</span>{productData.price}</span>
                        <span className="offer col-10 fs-1 text-success">{productData.offer}</span>
                    </div>

                    <table className="bordered-table  my-3">

                            <th className="table-head w-100" >Details :</th>
                          
                        <tbody>
                            <tr>
                                <th className="table-cell ">Title</th>
                                <td className="table-cell">{productData.title}</td>
                            </tr>
                            <tr>
                                <th className="table-cell ">Discription</th>
                                <td className="table-cell ">{product.discription || product.description}</td>
                            </tr>
                            <tr>
                                <th className="table-cell ">Quantity</th>
                                <td className="table-cell ">{state.count}</td>
                            </tr>
                            <tr>
                                <th className="table-cell ">Price</th>
                                <td className="table-cell ">{product.price}</td>
                            </tr>
                            <tr>
                                <th className="table-cell col-4">Discount</th>
                                <td className="table-cell ">{product.offer}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-flex gap-1 mb-4 add-btn">
                        { ckeckOrder ? (
                                order
                                    .filter((orderItem) => orderItem.id === product.id)
                                    .map((orderItem) => (
                                    
                                        <button key={order.uniqueId} onClick={() => handleCancel(orderItem.uniqueId)} className="w-100 bg-danger text-light fs-4 fw-bolder p-2 border-0 rounded"> Cancel </button>
                                    ))
                                ) : (
                                    <>
                                        <button onClick={handleOrder} className=" w-100 bg-success text-light fs-4 fw-bolder p-2 border-0 rounded">Buy</button>
                                        <button onClick={handleAddCard} className=" w-100 bg-primary text-light fs-4 fw-bolder p-2 border-0 rounded">Add Cart</button>
                                    </>
                                ) 
                        }
                         
                       
                    </div>
                
                </div>
                
            </div>
           
        </main>
    </>
  );
};

export default ProductDetails;
