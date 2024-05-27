import { useState } from "react";
import productCart from "../../assets/Product_Cart.svg";
import productList from "../../assets/Product_list_icon.svg";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [active, setActive] = useState("productList");
  const handleSetActive = (choose) => {
    setActive(choose);
  };
  return (
    <div className="h-screen flex flex-col gap-5 p-[20px] bg-slate-100">
      <Link to={"/addproduct"}>
        <div
          className={`rounded-lg p-3 flex items-center gap-5 cursor-pointer ${
            active === "productCart" ? "bg-yellow-400 font-semibold" : ""
          }`}
          onClick={() => handleSetActive("productCart")}
        >
          <img src={productCart} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/products"}>
        <div
          className={`rounded-lg p-3 flex items-center gap-5 cursor-pointer ${
            active === "productList" ? "bg-yellow-400 font-semibold" : ""
          }`}
          onClick={() => handleSetActive("productList")}
        >
          <img src={productList} alt="" />
          <p>Products</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
