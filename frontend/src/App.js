import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignUp from "./Pages/LoginSignUp";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import men_banner from "./Assets/banner_mens.png";
import women_banner from "./Assets/banner_women.png";
import kid_banner from "./Assets/banner_kids.png";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/men" element={<ShopCategory banner={men_banner} category="men" />}></Route>
          <Route
            path="/women"
            element={<ShopCategory banner={women_banner} category="women" />}
          ></Route>
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />}></Route>
          <Route path="/login" element={<LoginSignUp />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/product/:productId" element={<Product />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
