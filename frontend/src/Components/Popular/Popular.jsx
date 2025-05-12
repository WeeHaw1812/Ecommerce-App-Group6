import React, { useContext } from "react";
import "./Popular.css";

import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const Popular = () => {
  const { all_product } = useContext(ShopContext);

  // Lọc các sản phẩm thuộc danh mục "Women" và lấy 4 sản phẩm đầu tiên
  const womenProducts = all_product.filter((item) => item.category === "Women").slice(0, 4);

  return (
    <div className="popular">
      <h1>POPULAR IN SHOP</h1>
      <hr />
      <div className="popular-item py-[30px]">
        {womenProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
