const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const productRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
// Database Connection with MongoDB
mongoose.connect("mongodb+srv://loneacc195:195@cluster0.qf5rb9y.mongodb.net/e-commerce");

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Router
app.use("/product", productRouter);
app.use("user", usersRouter);

app.listen(port, (error) => {
  if (!error) {
    console.log("Sever Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
