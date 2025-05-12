const express = require("express");
const Products = require("../models/products");
const productsRouter = express.Router();

// Middleware for validating product data
const validateProductData = (req, res, next) => {
  const { name, description, image, category, new_price, old_price } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Name is required and must be a non-empty string" });
  }
  if (!description || typeof description !== "string" || description.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Description is required and must be a non-empty string" });
  }
  if (!image || typeof image !== "string" || image.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Image URL is required and must be a non-empty string" });
  }
  if (!category || typeof category !== "string" || !["Women", "Men", "Kid"].includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Category is required and must be one of: Women, Men, Kid",
    });
  }
  if (!new_price || isNaN(new_price) || new_price <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "New price is required and must be a positive number" });
  }
  if (!old_price || isNaN(old_price) || old_price <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Old price is required and must be a positive number" });
  }

  next();
};

// Get All Products (with pagination)
productsRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Page and limit must be positive integers" });
    }

    const skip = (page - 1) * limit;
    const products = await Products.find({}).skip(skip).limit(limit);
    const total = await Products.countDocuments({});

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error while fetching products" });
  }
});

// Get Product by ID
productsRouter.get("/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId) || productId < 1) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Products.findOne({ id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: `Product with ID ${productId} not found` });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ success: false, message: "Server error while fetching product" });
  }
});

// Add Product
productsRouter.post("/", validateProductData, async (req, res) => {
  try {
    const products = await Products.find({}).sort({ id: -1 }).limit(1);
    const id = products.length > 0 ? products[0].id + 1 : 1;

    const product = new Products({
      id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      new_price: parseFloat(req.body.new_price),
      old_price: parseFloat(req.body.old_price),
    });

    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", data: product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Server error while adding product" });
  }
});

// Update Product by ID
productsRouter.put("/:productId", validateProductData, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId) || productId < 1) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const updatedProduct = await Products.findOneAndUpdate(
      { id: productId },
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        new_price: parseFloat(req.body.new_price),
        old_price: parseFloat(req.body.old_price),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: `Product with ID ${productId} not found` });
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error while updating product" });
  }
});

// Delete Product by ID
productsRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId) || productId < 1) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const deletedProduct = await Products.findOneAndDelete({ id: productId });
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: `Product with ID ${productId} not found` });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error while deleting product" });
  }
});

module.exports = productsRouter;
