const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const usersRouter = express.Router();
const fetchUser = require("../middleware/middleware");

//SignUp
usersRouter.post("/", async (req, res) => {
  let checkEmail = await Users.findOne({ email: req.body.email });
  if (checkEmail) {
    return res
      .status(400)
      .json({ success: false, error: "Existing user found with same email address" });
  }
  let checkUserName = await Users.findOne({ name: req.body.username });
  if (checkUserName) {
    return res
      .status(400)
      .json({ success: false, error: "Existing user found with same username" });
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
    userID: user.id,
    token: token,
  });
});
//Get All User
usersRouter.get("/", async (req, res) => {
  var page = req.query.page;
  var limit = req.query.limit || 6;
  if (page) {
    //get Page
    page = parseInt(page);
    limit = parseInt(limit);
    var skip = (page - 1) * limit;
    let users = await Users.find({}).skip(skip).limit(limit);
    console.log("Fetched Page " + page + ", Limit " + limit + " Users");
    res.send(users);
  } else {
    let users = await Users.find({});
    console.log("All User Fetched");
    res.send(users);
  }
});
// Get User By ID
usersRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await Users.findById(userId);
  if (user) {
    res.send(user);
  } else {
    res.send("Not Found user ID" + userId);
  }
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
