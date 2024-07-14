import React, { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import { RiSubtractFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import VoucherCode from "../VoucherCode/voucherCode";
import { toast } from "react-toastify";
import ProceedOrder from "../ProceedOrder/ProceedOrder";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    incProductCart,
    decProductCart,
    removeFromCart,
    getTotalPrice,
    getTotalItemsInCart,
  } = useContext(ShopContext);
  const [voucher, setVoucher] = useState("");
  const [applyCode, setApplyCode] = useState("");
  const handleApplyVoucher = () => {
    if (voucher === "discount10" || voucher === "discount20" || voucher === "discount50") {
      setApplyCode(voucher);
      toast.success("Apply Voucher success");
    } else {
      setApplyCode("");
      return toast.warning("Invalid or used code.");
    }
  };
  const renderDiscount = () => {
    if (applyCode === "discount10") {
      return (
        <div>
          <VoucherCode code={10} />
        </div>
      );
    } else if (applyCode === "discount20") {
      return <VoucherCode code={20} />;
    } else if (applyCode === "discount50") {
      return <VoucherCode code={50} />;
    } else {
      return null;
    }
  };

  const calculateFinalPrice = () => {
    const totalPrice = getTotalPrice();
    let discount = 0;

    if (applyCode === "discount10") {
      discount = 0.1;
    } else if (applyCode === "discount20") {
      discount = 0.2;
    } else if (applyCode === "discount50") {
      discount = 0.5;
    }

    const finalPrice = totalPrice - totalPrice * discount + 15;
    return finalPrice;
  };
  const [totalAmount, setTotalAmount] = useState(0);

  // useEffect để cập nhật totalAmount mỗi khi applyCode hoặc totalPrice thay đổi
  useEffect(() => {
    const totalPrice = getTotalPrice();
    const finalPrice = calculateFinalPrice(totalPrice, applyCode);
    setTotalAmount(finalPrice);
  }, [applyCode, getTotalPrice]);

  const totalItems = getTotalItemsInCart();
  const [openProceed, setOpenProceed] = useState(false);
  const handleOpenProceed = () => {
    setOpenProceed(true);
  };

  const handleCloseProceed = () => {
    setOpenProceed(false);
  };

  return (
    <div className="px-[50px] flex gap-[20px] relative">
      <div className="products w-2/3 ">
        <div className="w-full flex justify-between pb-[10px] border-b-black border-b-[1px] text-xl font-medium">
          <p>Shopping Cart</p>
          <p>{totalItems} Items</p>
        </div>
        {/**================Product Item ===============*/}
        {totalItems === 0 ? (
          <p className="text-center py-4 text-red-600 font-semibold">Cart is Empty</p>
        ) : (
          <div className="scroll-cart max-h-[480px] overflow-y-auto border-b-black border-b-[1px]">
            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <div
                    key={e.id}
                    className="w-full grid grid-cols-5 gap-4 items-center py-[10px] border-b-black border-b-[1px] last:border-none"
                  >
                    <img className="col-span-1 h-[220px]" src={e.image} alt="" />
                    <div className="flex flex-col col-span-2">
                      <div className="flex gap-2 items-center font-bold">
                        <p className="w-[200px] truncate">{e.name}</p>
                        <p>| {e.category}</p>
                      </div>
                      <p>Size: L</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
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
                    <div className="col-span-1 flex items-center justify-center">
                      <p className="relative">
                        ${e.new_price * cartItems[e.id]}
                        <span
                          onClick={() => {
                            removeFromCart(e.id);
                          }}
                          className="absolute top-[40px] left-0 underline decoration-red-400 text-red-400 font-bold hover:decoration-red-500 hover:text-red-500 cursor-pointer"
                        >
                          Remove
                        </span>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="order w-1/3 flex flex-col items-center gap-[20px] pt-[38px]">
        <div className="w-[300px] h-max p-[20px] shadow-md border-[1px] rounded-md">
          <p className="font-medium text-xl mb-[20px]">
            <span className="border-b-red-500 border-b-[2px]">Order S</span>ummary
          </p>
          <div className="flex flex-col gap-[20px]">
            <div className="border-dashed border-b-[2px] border-gray-400 pb-[5px] flex justify-between">
              <p>Subtotal</p> <p>${getTotalPrice()}</p>
            </div>
            {/**Render voucherCode */}
            {renderDiscount()}
            <div className="border-dashed border-b-[2px] border-gray-400 pb-[5px] flex justify-between">
              <p>Vat & Tax</p> <p>$15</p>
            </div>
            <div className="flex justify-between">
              <p>Total Price</p> <p>${calculateFinalPrice()}</p>
            </div>
          </div>
        </div>
        <div className="voucher w-[300px] h-[120px] p-[20px] shadow-md border-[1px] rounded-sm flex flex-col gap-[10px]">
          <p className="font-semibold">Add promo code or voucher</p>
          <div className="flex items-center gap-[2px]">
            <input
              className="w-[180px] h-[35px] p-[5px] shadow-md border-[0.1px] border-t-slate-300 rounded-md"
              type="text"
              placeholder="Voucher code"
              onChange={(e) => {
                setVoucher(e.target.value);
              }}
            />
            <button
              onClick={handleApplyVoucher}
              className="w-[100px] h-[35px] bg-yellow-500 text-white p-[5px] rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
        <button
          className="w-[300px] text-white bg-red-500 p-[10px]"
          onClick={() => {
            handleOpenProceed();
          }}
        >
          Proceed To Order
        </button>
      </div>
      {openProceed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ProceedOrder handleClose={handleCloseProceed} totalPrice={totalAmount} />
        </div>
      )}
    </div>
  );
};

export default CartItems;
