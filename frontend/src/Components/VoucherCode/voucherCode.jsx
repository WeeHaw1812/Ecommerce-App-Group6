import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";

const VoucherCode = ({ code }) => {
  const { voucherCode } = useContext(ShopContext);
  return (
    <div className="border-dashed border-b-[2px] border-gray-400 pb-[5px] flex justify-between">
      <p> Discount {code}%</p>
      <p className="text-red-400 font-bold">
        -${typeof voucherCode(code) === "number" ? voucherCode(code).toFixed(2) : "0.00"}
      </p>
    </div>
  );
};

export default VoucherCode;
