const express = require("express");
const Products = require("../models/products");
const productsRouter = express.Router();

// Get All Product API
productsRouter.get("/", async (req, res) => {
  let products = await Products.find({});
  console.log("All Product Fetched");
  res.send(products);
});

// Add Product API
productsRouter.post("/", async (req, res) => {
  let products = await Products.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Products({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved Mongo success");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Delete Product API
productsRouter.delete("/", async (req, res) => {
  await Products.findOneAndDelete({ id: req.body.id });
  console.log("Deleted successfully id " + req.body.id);
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Update Product API
productsRouter.put("/", async (req, res) => {
  await Products.findOneAndUpdate(
    { id: req.body.id },
    {
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      old_price: req.body.old_price,
      new_price: req.body.new_price,
    }
  );
  console.log("Update successfully id " + req.body.id);
  res.json({
    success: true,
    id: req.body.id,
  });
});
module.exports = productsRouter;
