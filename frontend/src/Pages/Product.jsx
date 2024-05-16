import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const productData = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrumbs product={productData} />
      <ProductDisplay productById={productData} />
    </div>
  );
};
export default Product;
