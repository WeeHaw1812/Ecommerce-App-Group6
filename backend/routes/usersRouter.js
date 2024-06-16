const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, error: "Existing user found with same email address" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token: token,
  });
});

// Login
usersRouter.post("/login", async (req, res) => {
  let user = await Users.findOne({
    email: req.body.email,
  });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email" });
  }
});
// Middle ware to fetchUser
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
  }
};
// Add To Cart
usersRouter.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({
    _id: req.user.id,
  });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    {
      _id: req.user.id,
    },
    {
      cartData: userData.cartData,
    }
  );
  res.send("Added");
});

// Reduce From Cart
usersRouter.post("/reducefromcart", fetchUser, async (req, res) => {
  console.log("reduced", req.body.itemId);
  let userData = await Users.findOne({
    _id: req.user.id,
  });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    {
      _id: req.user.id,
    },
    {
      cartData: userData.cartData,
    }
  );
  res.send("Removed");
});
// Remove From Cart
usersRouter.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({
    _id: req.user.id,
  });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] = 0;
  }
  await Users.findOneAndUpdate(
    {
      _id: req.user.id,
    },
    {
      cartData: userData.cartData,
    }
  );
  res.send("Removed");
});
// Get User Cart Data
usersRouter.post("/getallcart", fetchUser, async (req, res) => {
  console.log("Get User Cart Data");
  let userCartData = await Users.findOne({ _id: req.user.id });
  res.json(userCartData.cartData);
});
module.exports = usersRouter;
