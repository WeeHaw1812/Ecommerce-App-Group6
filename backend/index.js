const port=4000;
const express=require("express")
const app= express();
const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const path=require("path")
const cors=require("cors");
app.use(express.json())
app.use(cors())

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://loneacc195:195@cluster0.qf5rb9y.mongodb.net/e-commerce")

// API Creation
app.get("/",(req,res)=>{
res.send("Express App is Running")
})
// Image Storage Engine
const storage=multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})

// Creating Upload Endpoint for images
app.use("/images",express.static("upload/images"))
app.post("/upload",upload.single("product"),(req,res)=>{
res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})
const Products=require("./models/products")
// Get All Product API
app.get("/allproduct",async(req,res)=>{
    let products =await Products.find({})
    console.log("All Product Fetched");
    res.send(products)
})

// Add Product API
app.post("/addproduct",async(req,res)=>{
    let products=await Products.find({})
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1)
        let last_product=last_product_array[0];
        id=last_product.id+1
    }else{
        id=1;
    }
const product=new Products({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
})
console.log(product);
await product.save();
console.log("Saved Mongo success");
res.json({
    success:true,
    name:req.body.name
})
})

// Delete Product API
app.post("/deleteproduct",async(req,res)=>{
    await Products.findOneAndDelete({id:req.body.id})
    console.log("Deleted successfully id "+ req.body.id);
    res.json({
        success:true,
        name:req.body.name
    })
})

// Update Product API
app.put("/updateproduct",async(req,res)=>{
    await Products.findOneAndUpdate({
        id:req.body.id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        old_price:req.body.old_price,
        new_price:req.body.new_price
    })
    console.log("Update successfully id "+ req.body.id);
    res.json({
        success:true,
        id:req.body.id
    })
})
app.listen(port,(error)=>{
if(!error){
    console.log("Sever Running on Port "+ port);
}else{
    console.log("Error: "+ error);
}
})