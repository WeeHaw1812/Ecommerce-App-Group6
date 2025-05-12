import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ShopContext } from "../../Context/ShopContext";
import { RiSubtractFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";

const ProceedOrder = ({ handleClose, totalPrice }) => {
  console.log("Total Price", totalPrice);
  const {
    all_product,
    cartItems,
    incProductCart,
    decProductCart,
    removeFromCart,
    getTotalPrice,
    getTotalItemsInCart,
  } = useContext(ShopContext);

  const totalItems = getTotalItemsInCart();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // Thêm hàm decodeToken vào đây
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };
  const createOrder = async () => {
    const token = localStorage.getItem("auth-token");
    console.log("Token", token);
    if (!token) {
      console.error("No auth token found");
      return;
    }

    const decodedToken = decodeToken(token);
    console.log("Decode Token", decodedToken);
    if (!decodedToken || !decodedToken.user.id) {
      console.error("Invalid token or missing userId");
      return;
    }

    const userId = decodedToken.user.id;
    console.log("USER ID", userId);
    const orderItems = Object.entries(cartItems)
      .filter(([productId, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = all_product.find((p) => p.id === parseInt(productId));
        if (!product) {
          console.error(`Product with id ${productId} not found`);
          return null;
        }
        return {
          productId: productId,
          quantity: quantity,
          price: product.new_price,
        };
      })
      .filter((item) => item !== null);
    console.log("Order Items", orderItems);
    const orderData = {
      customer: userId,
      fullName: fullName,
      items: orderItems,
      totalAmount: getTotalPrice(),
      shippingAddress: address,
      phoneNumber: phone,
      status: "pending",
    };

    try {
      const response = await fetch("https://eg6-backend.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      console.log("Order created:", result);
      toast.success("Order Successfully Thank You <3");
      // Xử lý sau khi tạo đơn hàng thành công (ví dụ: clear giỏ hàng, hiển thị thông báo)
    } catch (error) {
      console.error("Error creating order:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
    }
  };
  return (
    <div className="bg-white w-[400px] h-max p-[10px] flex flex-col gap-[10px]">
      <div className="title flex items-center justify-between">
        <p className="text-red-400 font-medium">Order Information</p>
        <IoClose className="w-[20px] h-[20px] cursor-pointer text-gray-800" onClick={handleClose} />
      </div>
      <div className="form flex flex-col gap-[10px] p-[10px]">
        <div className="name w-full flex items-center justify-between gap-[5px]">
          <p className="w-1/3">Full Name</p>
          <input
            className="w-2/3 border-[1px] border-slate-500 px-[5px] py-[2px]"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="phone w-full flex items-center justify-between gap-[5px]">
          <p className="w-1/3">Phone</p>
          <input
            className="w-2/3 border-[1px] border-slate-500 px-[5px] py-[2px]"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="address w-full flex items-center justify-between gap-[5px]">
          <p className="w-1/3">Address</p>
          <input
            className="w-2/3 border-[1px] border-slate-500 px-[5px] py-[2px]"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="products w-full ">
          <div className="w-full flex justify-between pb-[10px] border-b-black border-b-[1px] text-base font-medium">
            <p>Shopping Cart</p>
            <p>{totalItems} Items</p>
          </div>
          {/**================Product Item ===============*/}
          {totalItems === 0 ? (
            <p className="text-center py-4 text-red-600 font-semibold">Cart is Empty</p>
          ) : (
            <div className="scroll-cart max-h-[120px] overflow-y-auto border-b-black border-b-[1px]">
              {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                  return (
                    <div
                      key={e.id}
                      className="w-full grid grid-cols-7 gap-4 items-center py-[10px] border-b-black border-b-[1px] last:border-none"
                    >
                      <img className="col-span-1 h-[40px]" src={e.image} alt="" />
                      <div className="flex flex-col col-span-2 text-xs">
                        <div className="flex gap-2 items-center font-bold">
                          <p className="w-[20px] truncate">{e.name}</p>
                          <p>| {e.category}</p>
                        </div>
                        <p>Size: L</p>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="control-quantity flex w-[100px] border-[1px] border-black">
                          <div
                            onClick={() => {
                              decProductCart(e.id);
                            }}
                            className="flex items-center justify-center border-r-[1px] border-black w-[30px] h-[30px] cursor-pointer"
                          >
                            <RiSubtractFill />
                          </div>
                          <div className="w-[40px] h-[30px] text-sm flex justify-center items-center">
                            {cartItems[e.id]}
                          </div>
                          <div
                            onClick={() => {
                              incProductCart(e.id);
                            }}
                            className="flex items-center justify-center border-l-[1px] border-black w-[30px] h-[30px] cursor-pointer"
                          >
                            <GoPlus />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <p className="relative">
                          ${e.new_price * cartItems[e.id]}
                          <IoClose
                            onClick={() => {
                              removeFromCart(e.id);
                            }}
                            className="absolute top-[5px] right-[-20px] underline decoration-red-400 text-red-400 font-bold hover:decoration-red-500 hover:text-red-500 cursor-pointer"
                          />
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className="total flex justify-between">
          <div></div>
          <div className="flex items-center gap-[10px] mr-[29px]">
            <p className="font-semibold">Total Amount:</p>
            <p>${totalPrice}</p>
          </div>
        </div>
      </div>
      <div className="order flex justify-center pb-[5px]">
        <button
          className="w-[100px] h-[40px] bg-red-600 text-sm text-white rounded-md"
          onClick={createOrder}
        >
          ORDER
        </button>
      </div>
    </div>
  );
};

export default ProceedOrder;
