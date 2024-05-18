import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import shirt from "../../Assets/product_3.png";
import { RiSubtractFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";

const CartItems = () => {
  const { all_product, cartItems, incProductCart, decProductCart, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className="px-[50px] flex gap-[20px]">
      <div className="products w-2/3 ">
        <div className="w-full flex justify-between pb-[10px] border-b-black border-b-[1px] text-xl font-medium">
          <p>Shopping Cart</p>
          <p>3 Items</p>
        </div>
        {/**================Product Item ===============*/}
        <div className="scroll-cart max-h-[600px] overflow-y-auto border-b-black border-b-[1px]">
          <div className="w-full grid grid-cols-5 gap-4 items-center py-[10px] border-b-black border-b-[1px] last:border-none">
            <img className="col-span-1 h-[220px]" src={shirt} alt="" />
            <div className="flex flex-col col-span-2">
              <div className="flex gap-2 items-center font-bold">
                <p className="w-[200px] truncate">
                  Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse
                </p>
                <p>| Women</p>
              </div>
              <p>Size: L</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <div className="control-quantity flex w-[100px] border-[1px] border-black">
                <div className="flex items-center justify-center border-r-[1px] border-black w-[30px] h-[30px] cursor-pointer">
                  <RiSubtractFill />
                </div>
                <div className="w-[40px] h-[30px] text-sm flex justify-center items-center">1</div>
                <div className="flex items-center justify-center border-l-[1px] border-black w-[30px] h-[30px] cursor-pointer">
                  <GoPlus />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="relative">
                $178
                <span className="absolute top-[40px] left-0 underline decoration-red-400 text-red-400 font-bold hover:decoration-red-500 hover:text-red-500 cursor-pointer">
                  Remove
                </span>
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-5 gap-4 items-center py-[10px] border-b-black border-b-[1px] last:border-none">
            <img className="col-span-1 h-[220px]" src={shirt} alt="" />
            <div className="flex flex-col col-span-2">
              <div className="flex gap-2 items-center font-bold">
                <p className="w-[200px] truncate">
                  Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse
                </p>
                <p>| Women</p>
              </div>
              <p>Size: L</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <div className="control-quantity flex w-[100px] border-[1px] border-black">
                <div className="flex items-center justify-center border-r-[1px] border-black w-[30px] h-[30px] cursor-pointer">
                  <RiSubtractFill />
                </div>
                <div className="w-[40px] h-[30px] text-sm flex justify-center items-center">1</div>
                <div className="flex items-center justify-center border-l-[1px] border-black w-[30px] h-[30px] cursor-pointer">
                  <GoPlus />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="relative">
                $178
                <span className="absolute top-[40px] left-0 underline decoration-red-400 text-red-400 font-bold hover:decoration-red-500 hover:text-red-500 cursor-pointer">
                  Remove
                </span>
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-5 gap-4 items-center py-[10px] border-b-black border-b-[1px] last:border-none">
            <img className="col-span-1 h-[220px]" src={shirt} alt="" />
            <div className="flex flex-col col-span-2">
              <div className="flex gap-2 items-center font-bold">
                <p className="w-[200px] truncate">
                  Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse
                </p>
                <p>| Women</p>
              </div>
              <p>Size: L</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <div className="control-quantity flex w-[100px] border-[1px] border-black">
                <div className="flex items-center justify-center border-r-[1px] border-black w-[30px] h-[30px] cursor-pointer">
                  <RiSubtractFill />
                </div>
                <div className="w-[40px] h-[30px] text-sm flex justify-center items-center">1</div>
                <div className="flex items-center justify-center border-l-[1px] border-black w-[30px] h-[30px] cursor-pointer">
                  <GoPlus />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="relative">
                $178
                <span className="absolute top-[40px] left-0 underline decoration-red-400 text-red-400 font-bold hover:decoration-red-500 hover:text-red-500 cursor-pointer">
                  Remove
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="order w-1/3 flex flex-col items-center gap-[20px] pt-[38px]">
        <div className="w-[300px] h-[270px] p-[20px] shadow-md border-[1px] rounded-md">
          <p className="font-medium text-xl mb-[20px]">
            <span className="border-b-red-500 border-b-[2px]">Order S</span>ummary
          </p>
          <div className="flex flex-col gap-[20px]">
            <div className="border-dashed border-b-[2px] border-gray-400 pb-[5px] flex justify-between">
              <p>Subtotal</p> <p>$550</p>
            </div>
            <div className="border-dashed border-b-[2px] border-gray-400 pb-[5px] flex justify-between">
              <p> Discount 10%</p> <p className="text-red-400 font-bold">-$80</p>
            </div>
            <div className="border-dashed border-b-[2px] border-gray-400 pb-[5px] flex justify-between">
              <p>Vat & Tax</p> <p>$30</p>
            </div>
            <div className="flex justify-between">
              <p>Total Price</p> <p>$500</p>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-[120px] p-[20px] shadow-md border-[1px] rounded-sm flex flex-col gap-[10px]">
          <p className="font-semibold">Add promo code or voucher</p>
          <div className="flex items-center gap-[2px]">
            <input
              className="w-[180px] h-[35px] p-[5px] shadow-md border-[0.1px] border-t-slate-300 rounded-md"
              type="text"
              placeholder="Voucher code"
              name=""
              id=""
            />
            <button className="w-[100px] h-[35px] bg-yellow-500 text-white p-[5px] rounded-md">
              Apply
            </button>
          </div>
        </div>
        <button className="w-[300px] text-white bg-red-500 p-[10px]">Proceed To Order</button>
      </div>
    </div>
  );
};

export default CartItems;
