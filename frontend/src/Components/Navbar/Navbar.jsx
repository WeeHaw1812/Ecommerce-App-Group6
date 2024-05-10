import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import data from "../../Assets/all_product";
import logo from "../../Assets/logo.png";
import cart from "../../Assets/cart_icon.png";
const Navbar = () => {
  const [selectTab, setSelectTab] = useState("Shop");
  return (
    <div className="w-full flex items-center justify-between p-[20px]">
      <div className="flex items-center gap-5">
        <img src={logo} alt="" />
        <p className="text-xl font-bold">EG6</p>
      </div>
      <ul className="flex gap-5">
        <li
          className={`text-lg cursor-pointer ${
            selectTab === "Shop" ? "text-red-500 font-bold" : "font-normal"
          }`}
          onClick={() => setSelectTab("Shop")}
        >
          <Link to={"/"}>Shop</Link>
        </li>
        <li
          className={`text-lg cursor-pointer ${
            selectTab === "Men" ? "text-red-500 font-bold" : "font-normal"
          }`}
          onClick={() => setSelectTab("Men")}
        >
          <Link to={"/men"}>Men</Link>
        </li>
        <li
          className={`text-lg cursor-pointer ${
            selectTab === "Women" ? "text-red-500 font-bold" : "font-normal"
          }`}
          onClick={() => setSelectTab("Women")}
        >
          <Link to={"/women"}>Women</Link>
        </li>
        <li
          className={`text-lg cursor-pointer ${
            selectTab === "Kids" ? "text-red-500 font-bold" : "font-normal"
          }`}
          onClick={() => setSelectTab("Kids")}
        >
          <Link to={"/kids"}>Kids</Link>
        </li>
      </ul>
      <div className="flex items-center gap-5">
        <Link to={"/login"}>
          <button className="w-[80px] h-[40px] bg-slate-600 rounded-full text-white m-auto">
            Login
          </button>
        </Link>
        <Link to={"/cart"}>
          <img className="cart cursor-pointer" src={cart} alt="" />
          <span className="cart-count">8</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
