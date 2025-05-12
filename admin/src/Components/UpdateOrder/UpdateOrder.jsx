import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";

const UpdateOrder = ({ idOrder, closeModal, updateSuccess }) => {
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "",
    customer: "",
    fullName: "",
    items: [],
    totalAmount: 0,
    phoneNumber: "",
    shippingAddress: "",
    status: "pending",
  });

  const changeHandler = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };
  // Map Product API in items
  const [products, setProducts] = useState([]);

  console.log("Products", products);
  const fetchOrderById = async () => {
    try {
      const response = await fetch(`https://eg6-backend.onrender.com/order/${idOrder}`);
      const orderData = await response.json();
      console.log("Order Data", orderData);
      setOrderDetails({
        orderNumber: orderData.orderNumber || "",
        fullName: orderData.fullName || "",
        customer: orderData.customer || "",
        items: orderData.items || [],
        totalAmount: orderData.totalAmount || 0,
        phoneNumber: orderData.phoneNumber || "",
        shippingAddress: orderData.shippingAddress || "",
        status: orderData.status || "pending",
      });

      // Fetch product details
      const fetchProductDetails = async (productId) => {
        try {
          const response = await fetch(`https://eg6-backend.onrender.com/product/${productId}`);
          return await response.json();
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          return null;
        }
      };

      const productPromises = orderData.items.map((item) => fetchProductDetails(item.productId));
      const productDetails = await Promise.all(productPromises);

      // Combine product details with quantity from order items
      const productsWithQuantity = orderData.items
        .map((item, index) => {
          const productDetail = productDetails[index];
          if (productDetail) {
            return {
              ...productDetail,
              quantity: item.quantity,
              itemPrice: item.price, // Assuming there's a price field in the order item
            };
          }
          return null;
        })
        .filter((product) => product !== null);

      setProducts(productsWithQuantity);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchOrderById();
  }, [idOrder]);

  const updateOrderById = async () => {
    try {
      const response = await fetch(`https://eg6-backend.onrender.com/order/${idOrder}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Order Update Success");
          closeModal();
          updateSuccess();
        } else {
          alert("Failed to Update Order");
        }
      } else {
        throw new Error("Failed to update Order");
      }
    } catch (error) {
      console.error("Failed to Process", error);
    }
  };

  return (
    <div className="w-[400px] h-[600px] bg-slate-100 overflow-y-auto">
      <div className="w-full p-[20px] flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Update Order</p>
          <CgCloseO className="cursor-pointer w-[20px] h-[20px]" onClick={closeModal} />
        </div>

        <div className="orderNumber flex items-center gap-[10px]">
          <p className="text-sm">Order Number:</p>
          <p>{orderDetails.orderNumber}</p>
        </div>

        <div className="fullName flex items-center  gap-[10px]">
          <p className="text-sm">Customer Name:</p>
          <p>{orderDetails.fullName}</p>
        </div>
        <div className="products w-full">
          {/**================Product Item ===============*/}
          <div className="title w-full grid grid-cols-5 py-[10px] text-sm  border-b-black border-b-[1px]">
            <div className="col-span-3">Product</div>
            <div className="flex justify-center col-span-1">Quantity</div>
            <div className="flex justify-center col-span-1">Price</div>
            <div></div>
          </div>
          <div className="scroll-cart max-h-[120px] overflow-y-auto border-b-black border-b-[1px]">
            {products.map((e) => {
              return (
                <div
                  key={e.id}
                  className="w-full grid grid-cols-5 gap-4 items-center py-[10px] border-b-black border-b-[1px] last:border-none"
                >
                  <img className="col-span-1 h-[40px]" src={e.data.image} alt="" />
                  <div className="flex flex-col col-span-2 text-xs">
                    <div className="flex gap-2 items-center font-bold">
                      <p className="w-[20px] truncate">{e.name}</p>
                      <p>| {e.category}</p>
                    </div>
                    <p>Size: L</p>
                  </div>
                  <div className="flex justify-center col-span-1 text-xs">{e.quantity}</div>
                  <div className="flex justify-center col-span-1 text-xs">${e.itemPrice}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="totalAmount flex items-center justify-end gap-[10px] mr-[25px]">
          <p className="text-sm font-medium">Total Amount</p>
          <p className="text-xs">${orderDetails.totalAmount}</p>
        </div>

        <div className="phone flex items-center gap-[10px]">
          <p className="text-sm">Phone Number:</p>
          <p className="text-sm">{orderDetails.phoneNumber}</p>
        </div>

        <div className="ship flex flex-col gap-[10px]">
          <p className="text-sm">Shipping Address</p>
          <textarea
            name="shippingAddress"
            value={orderDetails.shippingAddress}
            onChange={changeHandler}
            className="w-full h-[60px] border-[1px] border-gray-500 p-[10px] rounded-sm"
          />
        </div>

        <div className="status flex flex-col gap-[10px]">
          <p className="text-sm">Status</p>
          <select
            name="status"
            value={orderDetails.status}
            onChange={changeHandler}
            className="w-full h-[30px] border-[1px] border-gray-500 p-[5px] rounded-sm text-xs"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="button w-full flex justify-end">
          <button
            className="w-1/2 h-[30px] bg-indigo-300 rounded-md text-white"
            onClick={updateOrderById}
          >
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
