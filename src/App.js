import React, { useState, useEffect  } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NavbarPage from "./Navbar";
import MainCategories from "./MainCategories";
import Home from "./Home";
import Profile from "./Profile";
import Orders from './Orders'
import AddCarts from './AddCarts'
import Wishlist from './Wishlist'
import MyData from "./data/index.json";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./ProductDetails";
import Login from "./Login";

function App() {
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      const [store, setStore] = useState([]);
      const [search,setSearch] = useState('')
      useEffect(() => {
          try {
            // Construct the allItems array from MyData
            const box1 = MyData.content[0]?.boxOne || [];
            const box2 = MyData.content[0]?.boxTwo || [];
            const fashion = MyData.content[0]?.fashion || [];
            const all = MyData.content[0]?.all || [];
            const allItems = [...box1, ...box2, ...fashion, ...all];
            setStore(allItems); // Set the items into the state
            setError(null);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
      }, []);
      
      //WishList Page
      const [wishlist,setWishList] = useState([]);

     

      const toggleWishlist = (product) => {
        // Get the current wishlist from localStorage
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      
        // some() used for Check if the product is already in the wishlist. it return true or false
        const exists = storedWishlist.some((item) => item.id === product.id);
      
        let updatedWishlist;
      
        if (exists) {
          // Remove the product matching  from the wishlist
          updatedWishlist = storedWishlist.filter((item) => item.id !== product.id);
        } else {
          // Add the product to the wishlist
          updatedWishlist = [...storedWishlist, product];
        }
      
        // Save the updated wishlist to localStorage
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      
        // Update the state
        setWishList(updatedWishlist);
      };
      

      

      return (
            <Router>
              <NavbarPage search={search} setSearch={setSearch} />
              <main>
                  {loading && <p className="fs-2 text-center">Loading Items...</p>}
                  {error && <p className="fs-2 text-center">{`Error : ${error}`}</p>}
              </main>    
              <Routes>
                <Route path="/" element={<Home  />} />
                <Route path="/categories" element={<MainCategories allItems={store} search={search} toggleWishList={toggleWishlist}/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders  />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductDetails allItems={store} wishlist={wishlist} toggleWishList={toggleWishlist} />} />
                <Route path="/addcart" element={<AddCarts />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Router>
        );
}

export default App;
