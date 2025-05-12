import React, { createContext, useEffect, useState } from "react";

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
    // Lấy toàn bộ sản phẩm (tăng limit để lấy tất cả sản phẩm nếu cần)
    fetch("https://eg6-backend.onrender.com/product?limit=300")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAllProduct(data.data); // Chỉ lấy mảng sản phẩm từ data.data
        } else {
          console.error("Failed to fetch products:", data.message);
          setAllProduct([]); // Đặt mặc định là mảng rỗng nếu API thất bại
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setAllProduct([]); // Đặt mặc định là mảng rỗng nếu có lỗi
      });

    // Lấy giỏ hàng nếu người dùng đã đăng nhập
    if (localStorage.getItem("auth-token")) {
      fetch("https://eg6-backend.onrender.com/user/getallcart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Sửa "application/form-data" thành "application/json"
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "", // Body có thể để trống nếu API không yêu cầu dữ liệu
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCartItems(data.cart || getDefaultCart()); // Đảm bảo cartItems luôn hợp lệ
          } else {
            console.error("Failed to fetch cart:", data.message);
            setCartItems(getDefaultCart());
          }
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
          setCartItems(getDefaultCart());
        });
    }
  }, []); // Loại bỏ dependencies không cần thiết

  // Thêm sản phẩm vào cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://eg6-backend.onrender.com/user/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Add to cart response:", data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  // Xóa sản phẩm khỏi cart (đặt số lượng về 0)
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://eg6-backend.onrender.com/user/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Remove from cart response:", data))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  // Tăng số lượng sản phẩm trong cart
  const incProductCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://eg6-backend.onrender.com/user/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Increase cart response:", data))
        .catch((error) => console.error("Error increasing cart:", error));
    }
  };

  // Giảm số lượng sản phẩm trong cart
  const decProductCart = (itemId) => {
    setCartItems((prev) => {
      const newCount = prev[itemId] - 1;
      return { ...prev, [itemId]: newCount < 0 ? 0 : newCount }; // Không để số lượng âm
    });
    if (localStorage.getItem("auth-token")) {
      fetch("https://eg6-backend.onrender.com/user/reducefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Decrease cart response:", data))
        .catch((error) => console.error("Error decreasing cart:", error));
    }
  };

  // Tính tổng giá tiền
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

  // Áp dụng mã giảm giá
  const voucherCode = (code) => {
    return getTotalPrice() * (code / 100);
  };

  // Đếm số loại sản phẩm trong cart
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
