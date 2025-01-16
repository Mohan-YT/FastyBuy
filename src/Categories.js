import React from 'react'
import { Link } from "react-router-dom";
import MyData from './data/index.json'
import './Categories.scss'

const Categories = () => {
    const logos = MyData.logo
    // console.log(logos)
  return (
    <>
    <section>
        <div className='catagories'>
            {logos.map((logo)=>(
                <Link className="lists" to="/categories" key={logo.id}>
                    <div className='image-box'>
                        <img src={logo.image} alt={logo.text}/>
                    </div>
                    <p>{logo.text}</p>
                </Link>
            ))}
        </div>
    </section>
    </>
  )
}

export default Categories
