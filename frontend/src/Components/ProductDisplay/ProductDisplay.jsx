import React, { useContext } from "react";
import star_icon from "../../Assets/star_icon.png";
import star_dull from "../../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { toast } from "react-toastify";
const ProductDisplay = ({ productById }) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="flex px-[100px]">
      <div className="props-img flex gap-2">
        <div className="left-list flex flex-col gap-[10px]">
          <img className="h-[150px] w-[120px]" src={productById.image} alt="" />
          <img className="h-[150px] w-[120px]" src={productById.image} alt="" />
          <img className="h-[150px] w-[120px]" src={productById.image} alt="" />
          <img className="h-[150px] w-[120px]" src={productById.image} alt="" />
        </div>
        <div className="right-main">
          <img className="h-[630px] w-[586px]" src={productById.image} alt="" />
        </div>
      </div>
      <div className="props-info w-1/2 flex flex-col gap-5 px-[20px]">
        <h1 className="text-2xl font-medium">{productById.name}</h1>
        <div className="flex gap-2">
          <img className="w-[20px] h-[20px]" src={star_icon} alt="" />
          <img className="w-[20px] h-[20px]" src={star_icon} alt="" />
          <img className="w-[20px] h-[20px]" src={star_icon} alt="" />
          <img className="w-[20px] h-[20px]" src={star_icon} alt="" />
          <img className="w-[20px] h-[20px]" src={star_dull} alt="" />
          <span>(122)</span>
        </div>

        <p>
          This character description generator will generate a fairly random description of a
          belonging to a random race.
        </p>
        <p className="text-xl text-gray-700 font-medium drop-shadow-md">Select Size</p>
        <div className="flex gap-5">
          <div className="w-[30px] h-[30px] font-semibold border-[1px] border-slate-700 cursor-pointer text-center">
            S
          </div>
          <div className="w-[30px] h-[30px] font-semibold border-[1px] border-slate-700 cursor-pointer text-center">
            M
          </div>
          <div className="w-[30px] h-[30px] font-semibold border-[1px] border-slate-700 cursor-pointer text-center">
            L
          </div>
          <div className="w-[30px] h-[30px] font-semibold border-[1px] border-slate-700 cursor-pointer text-center">
            XL
          </div>
          <div className="w-[35px] h-[30px] font-semibold border-[1px] border-slate-700 cursor-pointer text-center">
            XXL
          </div>
        </div>
        <div className="price flex gap-5">
          <p className="line-through text-xl text-gray-400">${productById.old_price}</p>
          <p className="text-xl text-red-600">${productById.new_price}</p>
        </div>
        <button
          onClick={() => {
            addToCart(productById.id);
            toast.success("Add Product successfully");
          }}
          className="w-[200px] px-[40px] py-[10px] bg-red-500 text-white font-bold rounded-md"
        >
          Add To Cart
        </button>
        <p className="font-bold text-sm">
          CateGory: <span className="font-normal">Men,T-shirt,Crop Top</span>
        </p>
        <p className="font-bold text-sm">
          Tags: <span className="font-normal">Modern,Latest</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
