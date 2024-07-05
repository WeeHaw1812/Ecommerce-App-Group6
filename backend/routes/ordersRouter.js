const express = require("express");
const Orders = require("../models/orders");
const ordersRouter = express.Router();
const fetchUser = require("../middleware/middleware");
const Users = require("../models/users");
// Get All Product API
ordersRouter.get("/", async (req, res) => {
  var page = req.query.page;
  var limit = req.query.limit || 6;
  if (page) {
    //get Page
    page = parseInt(page);
    limit = parseInt(limit);
    var skip = (page - 1) * limit;
    let orders = await Orders.find({}).skip(skip).limit(limit);
    console.log("Fetched Page " + page + ", Limit " + limit + " orders");
    res.send(orders);
  } else {
    let orders = await Orders.find({});
    console.log("All Product Fetched");
    res.send(orders);
  }
});
// Get Order By ID
ordersRouter.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const order = await Orders.findById(orderId);
  if (order) {
    res.send(order);
  } else {
    res.send("Not Found Order ID" + orderId);
  }
});
// Handle Existing Number/Day
const generateOrderNumber = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const lastOrder = await Orders.findOne({
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ createdAt: -1 });

  const sequenceNumber = lastOrder ? parseInt(lastOrder.orderNumber.split("-").pop()) + 1 : 1;

  return `ORD-${year}${month}${day}-${sequenceNumber.toString().padStart(4, "0")}`;
};

ordersRouter.post("/", async (req, res) => {
  try {
    const orderNumber = await generateOrderNumber();

    const newOrder = new Orders({
      orderNumber: orderNumber,
      customer: req.body.customer,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress,
      phoneNumber: req.body.phoneNumber,
      status: req.body.status || "pending", // Mặc định là "pending" nếu không có trạng thái được cung cấp
    });

    const savedOrder = await newOrder.save();
    // Cập nhật người dùng với đơn hàng mới
    const userId = req.body.customer;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.orders.push(savedOrder.orderNumber);
    await user.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
ordersRouter.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const deletedOrder = await Orders.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    // Cập nhật người dùng để loại bỏ orderNumber khỏi mảng orders
    const userId = deletedOrder.customer;
    const user = await Users.findById(userId);
    if (user) {
      user.orders = user.orders.filter((orderNumber) => orderNumber !== deletedOrder.orderNumber);
      await user.save();
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
ordersRouter.put("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      {
        totalAmount: req.body.totalAmount,
        shippingAddress: req.body.shippingAddress,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status,
      },
      { new: true } // Trả về đối tượng đã cập nhật
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = ordersRouter;
