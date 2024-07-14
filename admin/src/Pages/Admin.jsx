import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import ListOrder from "../Components/ListOrder/ListOrder";

const Admin = () => {
  return (
    <div className="h-full">
      <div className="flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 bg-slate-200">
          <Routes>
            <Route path="/" element={<ListProduct />}></Route>
            <Route path="/addproduct" element={<AddProduct />}></Route>
            <Route path="/products" element={<ListProduct />}></Route>
            <Route path="/order" element={<ListOrder />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
