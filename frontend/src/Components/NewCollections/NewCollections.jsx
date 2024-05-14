import React from "react";
import all_product from "../../Assets/all_product";
import "./NewCollections.css";
import Item from "../Item/Item";
const NewCollections = () => {
  return (
    <div className="products-container">
      {all_product.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default NewCollections;
