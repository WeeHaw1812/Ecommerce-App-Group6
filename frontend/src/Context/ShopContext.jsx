import React, { createContext, useState } from "react";
import all_product from "../Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      updatedCartItems[itemId] = 0;
      return updatedCartItems;
    });
  };

  // tăng giảm số lượng trong cart (sau này còn thêm size loại...)
  const incProductCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const decProductCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
