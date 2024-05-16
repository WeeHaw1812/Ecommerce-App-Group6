import React from "react";
import Hero from "../Components/Hero/Hero";
import NewCollections from "../Components/NewCollections/NewCollections";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";

const Shop = () => {
  return (
    <div>
      <Hero />
      <div className="px-[50px]">
        <NewCollections />
        <Popular />
      </div>
      <Offers />
    </div>
  );
};

export default Shop;
