import React, { useState } from "react";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login = async () => {
    console.log("Login", formData);
    let responseData;
    await fetch("https://eg6-backend.onrender.com/user/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };
  const signup = async () => {
    console.log("Sign Up", formData);
    let responseData;
    await fetch("https://eg6-backend.onrender.com/user", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };
  return (
    <div className="h-screen-[80vh] bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 py-[100px]">
      <div className="w-[500px] h-[500px] bg-white m-auto p-[40px]  rounded-[20px]">
        <h1 className="text-[30px] font-semibold">{state}</h1>
        <div className="flex flex-col gap-[20px] my-[20px]">
          {state === "Sign Up" ? (
            <input
              className="p-[10px] border-[1px] border-grey-200 shadow-md"
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandle}
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}

          <input
            className="p-[10px] border-[1px] border-grey-200 shadow-md"
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandle}
            placeholder="Email Address"
          />
          <input
            className="p-[10px] border-[1px] border-grey-200 shadow-md"
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandle}
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          className="w-full bg-red-500 text-white py-[10px] font-medium"
        >
          {state === "Login" ? "Continue" : "Register"}
        </button>
        {state === "Sign Up" ? (
          <div className="flex items-center gap-[5px] my-[20px]">
            <p className="text-sm">Already have an account?</p>
            <p
              className="text-red-600 text-sm font-semibold cursor-pointer"
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-[5px] my-[20px]">
            <p className="text-sm">Create an account?</p>
            <p
              className="text-red-600 text-sm font-semibold cursor-pointer"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </p>
          </div>
        )}

        <div className="flex items-center gap-[10px]">
          <input className="mt-[3px]" placeholder="" type="checkbox" />
          <p className="text-sm">By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
