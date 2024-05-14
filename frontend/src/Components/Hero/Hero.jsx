import React from "react";
import "./Hero.css";
import hand_icon from "../../Assets/hand_icon.png";
import hero_image from "../../Assets/hero_image.png";
import arrow from "../../Assets/arrow.png";
const Hero = () => {
  return (
    <div className="hero py-[100px] pl-[100px] justify-between">
      <div className="hero-left">
        <h2 className="font-semibold text-[26px]">NEW ARRIVALS ONLY</h2>
        <div className="flex items-center gap-[20px]">
          <p className="text-[100px] leading-[100px] font-bold">new</p>
          <img className="w-[105px]" src={hand_icon} alt="" />
        </div>
        <p className="text-[100px] leading-[100px] font-bold">collections</p>
        <p className="text-[100px] leading-[120px] font-bold">for everyone</p>
        <div className="mt-[20px] bg-red-500 flex items-center justify-center gap-[10px] w-1/2 h-[50px] rounded-full px-[10px]">
          <p className="text-white text-sm">Latest Collection</p>
          <img className="w-[20px] h-[10px]" src={arrow} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} className="w-[400px] h-[500px]" alt="" />
      </div>
    </div>
  );
};

export default Hero;
