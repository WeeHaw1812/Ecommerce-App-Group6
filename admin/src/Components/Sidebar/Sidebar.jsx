import { useEffect, useState } from "react";
import productCart from "../../assets/Product_Cart.svg";
import productList from "../../assets/Product_list_icon.svg";
import orderIcon from "../../assets/Order_icon.png";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("productList");
  useEffect(() => {
    if (location.pathname === "/addproduct") {
      setActive("productCart");
    } else if (location.pathname === "/products") {
      setActive("productList");
    } else if (location.pathname === "/order") {
      setActive("order");
    }
  }, [location]);
  const handleSetActive = (choose) => {
    setActive(choose);
  };
  return (
    <div className="h-full flex flex-col gap-5 p-[20px] bg-slate-100">
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
      <Link to={"/order"}>
        <div
          className={`rounded-lg p-3 flex items-center gap-5 cursor-pointer ${
            active === "order" ? "bg-yellow-400 font-semibold" : ""
          }`}
          onClick={() => handleSetActive("order")}
        >
          <img className="w-[33px] h-[31px]" src={orderIcon} alt="" />
          <p>Order</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
