import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignUp from "./Pages/LoginSignUp";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/men" element={<ShopCategory category="men" />}></Route>
          <Route path="/women" element={<ShopCategory category="women" />}></Route>
          <Route path="/kids" element={<ShopCategory category="kids" />}></Route>
          <Route path="/login" element={<LoginSignUp />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path=":productId" element={<Product />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
