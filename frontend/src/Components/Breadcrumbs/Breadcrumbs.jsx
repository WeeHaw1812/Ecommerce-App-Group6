import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";

const Breadcrumbs = (props) => {
  const { product } = props;
  return (
    <div className="flex gap-2 text-sm items-center p-[20px] pt-0">
      <p>Home</p>
      <MdOutlineNavigateNext className="text-red-600 w-[18px] h-[18px] mt-[3px]" />
      <p>Shop</p>
      <MdOutlineNavigateNext className="text-red-600 w-[18px] h-[18px] mt-[3px]" />
      <p>{product.category}</p>
      <MdOutlineNavigateNext className="text-red-600 w-[18px] h-[18px] mt-[3px]" />
      <p> {product.name}</p>
    </div>
  );
};

export default Breadcrumbs;
