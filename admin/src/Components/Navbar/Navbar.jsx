import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  let title = "Products";
  if (location.pathname === "/") {
    title = "Products";
  } else if (location.pathname === "/addproduct") {
    title = "Add Product";
  } else if (location.pathname === "/products") {
    title = "Products";
  } else if (location.pathname === "/order") {
    title = "Order";
  }
  return (
    <div className="h-[65px] flex items-center justify-between">
      <div className="w-1/5 flex items-center px-[20px] gap-2 bg-slate-100">
        <img src={logo} alt="" />
        <p className="font-bold">EG6</p>
      </div>
      <div className="w-4/5 h-full flex items-center justify-between bg-slate-200 p-2 border-b-[1px] border-b-black">
        <p className="font-bold text-xl">{title}</p>
        <div className="flex items-center gap-2">
          <div className="bg-slate-300 w-[35px] h-[35px] flex items-center justify-center rounded-full">
            <MdOutlineNotifications className="w-[24px] h-[24px]" />
          </div>
          <img className="w-[45px] h-[45px] rounded-full" src={avatar} alt="" />
          <div className="flex flex-col text-[12px]">
            <p className="font-bold">Admin</p>
            <p>admin@eg6.com</p>
          </div>
          <IoIosArrowDown className="h-[20px] w-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
