import React from "react";

const LoginSignUp = () => {
  return (
    <div className="h-screen-[80vh] bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 py-[100px]">
      <div className="w-[500px] h-[500px] bg-white m-auto p-[40px]  rounded-[20px]">
        <h1 className="text-[30px] font-semibold">Sign Up</h1>
        <div className="flex flex-col gap-[20px] my-[20px]">
          <input
            className="p-[10px] border-[1px] border-grey-200 shadow-md"
            type="text"
            placeholder="Your Name"
          />
          <input
            className="p-[10px] border-[1px] border-grey-200 shadow-md"
            type="email"
            placeholder="Email Address"
          />
          <input
            className="p-[10px] border-[1px] border-grey-200 shadow-md"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="w-full bg-red-500 text-white py-[10px] font-medium">Register</button>

        <div className="flex items-center gap-[10px] my-[20px]">
          <p>Already have an account?</p>
          <p className="text-red-600 text-sm font-bold">Login Here</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <input className="mt-[3px]" placeholder="" type="checkbox" />
          <p className="text-sm">By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
