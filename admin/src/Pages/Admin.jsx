import { Route, Routes } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";

const Admin = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 bg-slate-200">
          <Routes>
            <Route path="/" element={<ListProduct />}></Route>
            <Route path="/addproduct" element={<AddProduct />}></Route>
            <Route path="/products" element={<ListProduct />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
