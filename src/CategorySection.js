import React from "react";
import "./CategorySection.scss";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";


const CategorySection = ({ title, items,toggleWishList }) => {
      if (!items || items.length === 0) {
        return null;
      }
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      
      return (
        <div className="collection row mb-5 mb-md-0">
          <h3 className="fs-2 fw-bolder ms-2">{title}</h3>
          {items.map((item) => (
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
              <i onClick={()=>toggleWishList(item)} 
                        className={`bi ${
                          wishlist.find((wishlistItem) => wishlistItem.id === item.id)
                            ? "bi-heart-fill text-danger"
                            : "bi-heart"
                        } heart`}>
              </i>
            </div>
        )
          )}
        </div>
      );
};

export default CategorySection;
