import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Use Link for routing
import { MdAccountCircle, MdWindow } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.scss";

const NavbarPage = ({search,setSearch}) => {

  return (
    <nav id="container-fluid">
      <div className="d-flex justify-content-around flex-wrap row w-100 m-0 pt-1">
        <h2 className="order-1 order-sm-0 col-12 col-sm-2 col-lg-2 d-flex justify-content-center align-items-center text-center">
          FastyBuy
        </h2>
        <form className="nav-form d-flex flex-grow-1 order-3 order-sm-1 col-12 col-sm-5 col-lg-6 my-2 ">
          <Search search={search} setSearch={setSearch} />
        </form>
        <div className="nav-content order-2 order-sm-2 d-flex justify-content-center align-items-center text-center col-12 col-sm-5 col-lg-4">
          <NavLink to="/" className="nav-tags col-2 col-sm-2 fs-sm-2 ">
            <GoHomeFill className="icons" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/categories" className="nav-tags col-3 col-sm-3">
            <MdWindow className="icons" />
            <span>Categories</span>
          </NavLink>

          <NavLink to="/profile" className="nav-tags col-4 col-sm-3">
              <MdAccountCircle className="icons " /> 
              <span>Profile</span>
          </NavLink>

          <NavLink to="/addcart" className="nav-tags col-2 col-sm-2">
            <FaCartShopping className="icons" />
            <span>Cart</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPage;
