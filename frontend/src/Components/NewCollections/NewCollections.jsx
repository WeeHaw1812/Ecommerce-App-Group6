import React, { useContext } from "react";
//import all_product from "../../Assets/all_product";
import "./NewCollections.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";
const NewCollections = () => {
  const { all_product } = useContext(ShopContext);
  console.log("All Product", all_product);
  return (
    <div className="new-collection">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="grid grid-cols-4 gap-5 py-[30px]">
        {all_product.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
