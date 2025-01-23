import React, { useState } from 'react'
import './Profile.scss'
import Orders from './Orders'
import Wishlist from './Wishlist'
import { NavLink } from 'react-router-dom'

const Profile = ({handleShow}) => {
    const [isView,setIsView] = useState(true);
    const handleCheck1 = ()=>{
            setIsView(true)
    }
    const handleCheck2 = ()=>{
        setIsView(false)
    }
   
  return (
    <>
        <main>
            <div>
                <div className='d-flex head-box'>
                    <NavLink to="/login" className="w-100 m-1">
                         <button className='btn w-100  p-auto fs-3 fw-bolder' onClick={handleShow}>Log in</button>
                    </NavLink>
                    
                </div>
                <div className='d-flex head-box'>
                    <NavLink onClick={handleCheck1} className=' w-100 m-1 nav-btn' style={{backgroundColor : isView ? 'rgb(148, 2, 2) ': 'transparent'}}>
                        <button className='btn w-100 fs-3 fw-bolder p-auto' style={{color : isView ? 'white' : 'black'}}>
                            Orders 
                        </button>
                    </NavLink>

                    <NavLink onClick={handleCheck2} className=' w-100 m-1 nav-btn' style={{backgroundColor : isView ? 'transparent': 'rgb(148, 2, 2)'}}>
                        <button className='btn w-100 fs-3 fw-bolder p-auto' style={{color : isView ? 'black' : 'white'}}>
                            wishlist 
                        </button>
                    </NavLink>
                </div>
            </div>
            <div>
                {isView ? (<Orders />) : (<Wishlist />)}
                
            </div>
        </main>
    </>
  )
}

export default Profile
