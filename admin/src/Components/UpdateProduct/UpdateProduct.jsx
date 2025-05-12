import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import upload from "../../assets/upload_area.svg"; // Import the placeholder image

const UpdateProduct = ({ idProduct, closeModal, updateSuccess }) => {
  const [image, setImage] = useState(false); // For new image file
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "Women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]); // Store the new image file
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Fetch Product
  const fetchProductById = async () => {
    const response = await fetch(`http://localhost:4000/product/${idProduct}`);
    const productData = await response.json();
    setProductDetails({
      name: productData.name || "",
      description: productData.description || "",
      image: productData.image || "", // Existing image URL
      category: productData.category || "Women",
      new_price: productData.new_price || "",
      old_price: productData.old_price || "",
    });
  };

  useEffect(() => {
    fetchProductById();
  }, [idProduct]);

  // Update Product
  const updateProductById = async () => {
    try {
      let updatedProduct = { ...productDetails };
      let updatedImage = updatedProduct.image; // Default to existing image

      // If a new image is selected, upload it
      if (image) {
        let formData = new FormData();
        formData.append("product", image);

        const uploadResponse = await fetch("http://localhost:4000/upload", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          throw new Error("Image upload failed");
        }

        updatedImage = uploadData.image_url; // Update with new image URL
      }

      // Update the product with the new or existing image
      updatedProduct.image = updatedImage;

      const response = await fetch(`http://localhost:4000/product/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idProduct,
          ...updatedProduct,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product Update Success");
        closeModal();
        updateSuccess();
      } else {
        alert("Failed to Update Product");
      }
    } catch (error) {
      console.error("Failed to Process:", error);
      alert("Failed to Process");
    }
  };

  return (
    <div className="w-[400px] h-[440px] bg-slate-100">
      <div className="w-full p-[20px] flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Update Product</p>
          <CgCloseO className="cursor-pointer w-[20px] h-[20px]" onClick={closeModal} />
        </div>
        {/** Container Product Name and Description */}
        <div className="w-full flex gap-[30px]">
          <div className="product flex flex-col gap-[10px]">
            <p className="text-sm">Product title</p>
            <input
              type="text"
              placeholder="Type here"
              name="name"
              value={productDetails.name}
              onChange={changeHandler}
              className="w-full h-[20px] border-[1px] border-gray-500 p-[10px] rounded-sm"
            />
          </div>
          <div className="description flex flex-col gap-[10px]">
            <p className="text-sm">Description</p>
            <input
              type="text"
              placeholder="Type here"
              name="description"
              value={productDetails.description}
              onChange={changeHandler}
              className="w-full h-[20px] border-[1px] border-gray-500 p-[10px] rounded-sm"
            />
          </div>
        </div>
        <div className="price w-full flex gap-[30px]">
          <div className="w-1/2 flex flex-col gap-[10px]">
            <p className="text-sm">Old Price</p>
            <input
              type="text"
              placeholder="Type here"
              name="old_price"
              value={productDetails.old_price}
              onChange={changeHandler}
              className="w-full h-[20px] border-[1px] border-gray-500 p-[10px] rounded-sm"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-[10px]">
            <p className="text-sm">New Price</p>
            <input
              type="text"
              placeholder="Type here"
              name="new_price"
              value={productDetails.new_price}
              onChange={changeHandler}
              className="w-full h-[20px] border-[1px] border-gray-500 p-[10px] rounded-sm"
            />
          </div>
        </div>
        {/** Container Image and Category */}
        <div className="w-full flex gap-[30px]">
          <div className="image w-[165px] h-[60px]">
            <label htmlFor="file-input">
              <img
                className="w-[100px] h-[100px]"
                src={
                  image ? URL.createObjectURL(image) : productDetails.image || upload // Fallback to placeholder if no image
                }
                alt="Product"
              />
            </label>
            <input onChange={imageHandler} type="file" id="file-input" hidden />
          </div>
          <div className="category flex flex-col gap-[10px]">
            <p>Product Category</p>
            <select
              className="w-[100px] h-[40px] p-[5px] border-[1px] border-gray-500"
              name="category"
              value={productDetails.category}
              onChange={changeHandler}
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kid</option>
            </select>
          </div>
        </div>
        <div className="w-full flex gap-[30px]">
          <div className="w-1/2"></div>
          <button
            className="w-1/2 h-[30px] bg-indigo-300 rounded-md text-white"
            onClick={updateProductById}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
