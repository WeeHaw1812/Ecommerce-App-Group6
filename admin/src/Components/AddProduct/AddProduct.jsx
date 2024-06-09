import { useState } from "react";
import upload from "../../assets/upload_area.svg";
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log("Product", product);
      await fetch("http://localhost:4000/product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added Success") : alert("Failed");
        });
    }
  };
  return (
    <div className="h-full p-[10px]">
      <div className="w-4/6 h-max p-[40px] bg-white flex flex-col gap-[10px]">
        <div className="product flex flex-col gap-[10px]">
          <p> Product title</p>
          <input
            type="text"
            placeholder="Type here"
            name="name"
            value={productDetails.name}
            onChange={changeHandler}
            className="w-full h-[50px] border-[1px] border-gray-500 p-[10px] rounded-sm"
          />
        </div>
        <div className="price w-full flex gap-[30px]">
          <div className="w-1/2 flex flex-col gap-[10px]">
            <p>Price</p>
            <input
              type="text"
              placeholder="Type here"
              name="old_price"
              value={productDetails.old_price}
              onChange={changeHandler}
              className="w-full h-[50px] border-[1px] border-gray-500 p-[10px] rounded-sm"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-[10px]">
            <p> Offer Price</p>
            <input
              type="text"
              placeholder="Type here"
              name="new_price"
              value={productDetails.new_price}
              onChange={changeHandler}
              className="w-full h-[50px] border-[1px] border-gray-500 p-[10px] rounded-sm"
            />
          </div>
        </div>
        <div className="category flex flex-col gap-[10px]">
          <p> Product Category</p>
          <select
            className="w-[100px] h-[40px] p-[5px] border-[1px] border-gray-500 "
            name="category"
            id=""
            value={productDetails.category}
            onChange={changeHandler}
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="file-input">
            <img
              className="w-[100px] h-[100px]"
              src={image ? URL.createObjectURL(image) : upload}
              alt=""
            />
          </label>
          <input onChange={imageHandler} type="file" id="file-input" hidden />
        </div>
        <button
          onClick={() => {
            addProduct();
          }}
          className="w-[150px] p-[10px] bg-yellow-400 font-semibold rounded-md text-white"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
