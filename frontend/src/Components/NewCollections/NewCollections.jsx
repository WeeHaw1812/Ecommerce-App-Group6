import React from "react";
import all_product from "../../Assets/all_product";
import "./NewCollections.css";
import Item from "../Item/Item";
const NewCollections = () => {
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
