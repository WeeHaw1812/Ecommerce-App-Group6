import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";

const UpdateProduct = ({ idProduct, closeModal, updateSuccess }) => {
  const [image, setImage] = useState(false);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "Women",
    new_price: "",
    old_price: "",
  });
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  //Fetch Product
  const fetchProductById = async () => {
    const response = await fetch(`http://localhost:4000/product/${idProduct}`);
    const productData = await response.json();
    // Đặt trạng thái chi tiết sản phẩm ban đầu
    setProductDetails({
      name: productData.name || "",
      description: productData.description || "",
      image: productData.image || "",
      category: productData.category || "Women",
      new_price: productData.new_price || "",
      old_price: productData.old_price || "",
    });
  };
  useEffect(() => {
    fetchProductById();
  }, [idProduct]);

  //Update Product
  const updateProductById = async () => {
    try {
      const product = productDetails;
      console.log("Product Details ID", product);
      let updatedImage = product.image; // Giữ nguyên ảnh hiện tại nếu không có ảnh mới được chọn

      // Kiểm tra xem có chọn ảnh mới không
      if (image) {
        let formData = new FormData();
        formData.append("product", image);

        // Gọi API để tải lên ảnh mới
        const uploadResponse = await fetch("http://localhost:4000/upload", {
          method: "POST",
          body: formData,
        });

        // Xử lý phản hồi từ API upload
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          throw new Error("Image upload unsuccessful");
        }

        // Cập nhật đường dẫn ảnh mới vào updatedImage
        updatedImage = uploadData.image_url;
      }

      // Gọi API để cập nhật sản phẩm
      const response = await fetch(`http://localhost:4000/product/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idProduct,
          name: product.name,
          description: product.description,
          category: product.category,
          image: updatedImage,
          new_price: product.new_price,
          old_price: product.old_price,
        }),
      });

      // Xử lý kết quả từ API cập nhật sản phẩm
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Product Update Success");
          closeModal();
          updateSuccess();
        } else {
          alert("Failed to Update Product");
        }
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Failed to Process");
    }
  };
  return (
    <div className="w-[400px] h-[440px] bg-slate-100">
      <div className="w-full p-[20px] flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Update Product</p>
          <CgCloseO className="cursor-pointer w-[20px] h-[20px]" onClick={closeModal} />
        </div>
        {/**Container Product Name and Description */}
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
              name="name"
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
            <p className="text-sm"> New Price</p>
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
        {/**Container Image and Category */}
        <div className="w-full flex gap-[30px]">
          <div className="image w-[165px] h-[60px]">
            <label htmlFor="file-input">
              <img src={image ? URL.createObjectURL(image) : productDetails.image} alt="" />
            </label>
            <input onChange={imageHandler} type="file" id="file-input" hidden />
          </div>
          <div className="category flex flex-col gap-[10px]">
            <p>Product Category</p>
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
        </div>
        <div className="w-full flex gap-[30px]">
          <div className="w-1/2"></div>
          <button
            className="w-1/2 h-[30px] bg-indigo-300 rounded-md text-white"
            onClick={() => {
              updateProductById();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
