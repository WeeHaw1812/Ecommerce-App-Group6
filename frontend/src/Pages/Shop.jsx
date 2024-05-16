import React from "react";
import Hero from "../Components/Hero/Hero";
import NewCollections from "../Components/NewCollections/NewCollections";
import Footer from "../Components/Footer/Footer";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";

const Shop = () => {
  return (
    <div>
      <Hero />
      <NewCollections />
      <Popular/>
      <Offers/>
      <Footer/>
    </div>
  );
};

export default Shop;
