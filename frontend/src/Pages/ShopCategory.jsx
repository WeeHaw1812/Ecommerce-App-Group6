import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import { RiArrowDropDownLine } from "react-icons/ri";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="px-[100px]">
      <img src={props.banner} alt="" />
      <div className="flex items-center justify-between my-[30px]">
        <p>
          <span className="font-bold">Showing 1-12</span> out of 36 products
        </p>
        <div className="w-[120px] h-[35px] flex items-center justify-center  border-[1px] border-slate-500 rounded-full shadow-md">
          <p className="font-semibold text-sm">Sort by</p>
          <RiArrowDropDownLine style={{ height: "25px", width: "25px", marginTop: "3px" }} />
        </div>
      </div>

      <div className="products grid grid-cols-4 gap-4">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={item.id} {...item} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
