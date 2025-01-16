import React, { useEffect, useState} from 'react'
import {FormControl} from 'react-bootstrap'
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './Navbar.scss'
// import {  NavLink } from 'react-router-dom';
const Search = ({search,setSearch}) => {
  const [placeholder,setPlaceholder] = useState('');
  const [current,setCurrent] = useState(0)
  const array = ['Kids Zone', 'Mens Fashion', 'Womens Fashion', 'Mobiles', 'Gadgets', 'Home Appliances', 'Fresh Fruits', 'Fresh Vegitables'];
  const navigate = useNavigate();
  useEffect(()=>{
     setInterval(()=>{
        setCurrent((pre)=>(pre + 1) % array.length)
      },2500)
  },[array.length])
  useEffect(()=>{
    setPlaceholder(array[current])
  },[array[current]])

  const handleInputFocus = () => {

  console.log("Navigating to categories");
    navigate("/categories");
  };
  return (
    <>
        {/* <NavLink className='w-100 text-decoration-none text-dark' to="/categories"> */}
            <FormControl
                className='input '
                type="search"
                placeholder={placeholder}
                aria-label="Search"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onFocus={handleInputFocus}
                />
            <IoIosSearch className='search' />
         {/* </NavLink> */}
    </>
  )
}

export default Search
