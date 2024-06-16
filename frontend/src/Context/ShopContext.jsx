import React, { createContext, useEffect, useState } from "react";
//import all_product from "../Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/product")
      .then((response) => response.json()) // Implicit return
      .then((data) => setAllProduct(data))
      .catch((error) => {
        console.error("Error fetching data: ", error); // Xử lý lỗi nếu có
      });
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/user/getallcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, [setAllProduct, setCartItems]);
  // Thêm sản phẩm vào cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/user/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  // Xóa sản phẩm vào cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      updatedCartItems[itemId] = 0;
      return updatedCartItems;
    });
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/user/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // Tăng & Giảm số lượng trong cart (sau này còn thêm size loại...)
  const incProductCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/user/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  const decProductCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/user/reducefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalPrice += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalPrice;
  };
  const voucherCode = (code) => {
    return getTotalPrice() * (code / 100);
  };
  // Ví dụ, nếu cartItems là {0: 2, 1: 0, 2: 3}, thì Object.values(cartItems) sẽ trả về [2, 0, 3].
  const getTotalItemsInCart = () => {
    return Object.values(cartItems).filter((itemCount) => itemCount > 0).length;
  };
  const contextValue = {
    all_product,
    cartItems,
    incProductCart,
    decProductCart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    voucherCode,
    getTotalItemsInCart,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
export default ShopContextProvider;
