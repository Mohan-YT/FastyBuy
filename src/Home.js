import React from 'react'
import  './Home.scss'
import Carousel from 'react-bootstrap/Carousel';
import Mydata from './data/index.json'
import Content from './Content';
import Categories from './Categories'
const Home = () => {
    const slid = Mydata.slids;
  return (
    <>
        
        <section>
            <Carousel>
                {slid.map((items) => (
                    <Carousel.Item key={items.id} className='Carousel-Item'>
                        <img src={items.image} alt={items.text} className='img-fluid carousel-image'/>
                    </Carousel.Item>
                    ))}
            </Carousel>
        </section>
        <Categories />
        <Content />
        

    </>
  )
}

export default Home
