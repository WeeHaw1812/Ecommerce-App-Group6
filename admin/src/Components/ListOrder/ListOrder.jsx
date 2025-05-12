import { CgExport, CgImport, CgMoreVertical } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { IoFilterCircle } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { MdDelete, MdEdit, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
import UpdateOrder from "../UpdateOrder/UpdateOrder";
import "./ListOrder.css";
const ListOrder = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [orderPage, setOrderPage] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  // Get All for Pagination
  const fetchInfo = async () => {
    await fetch("https://eg6-backend.onrender.com/order")
      .then((res) => res.json())
      .then((data) => {
        setAllOrder(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  // Get order Page
  const fetchOrderPage = async () => {
    await fetch(`https://eg6-backend.onrender.com/order?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderPage(data);
      });
  };
  useEffect(() => {
    fetchOrderPage();
  }, [page, limit]);
  // Change Page
  // Handle Page Click
  const handlePageClick = (selectedItem) => {
    setPage(parseInt(selectedItem.selected) + 1); // +1 because ReactPaginate uses 0-based index
  };
  // Remove order
  const removeOrder = async (id) => {
    await fetch(`https://eg6-backend.onrender.com/order/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    await fetchOrderPage();
    await fetchInfo();
  };
  // More Button
  const [openOrderId, setOpenOrderId] = useState(null);
  const handleOpen = (idOrder) => {
    if (openOrderId === idOrder) {
      setOpenOrderId(null);
    } else {
      setOpenOrderId(idOrder);
    }
  };
  // Update Modal
  const [openUpdateOrderModalById, setUpdateOrderModal] = useState(null);
  const openUpdateModal = (idOrder) => {
    if (openUpdateOrderModalById === idOrder) {
      setUpdateOrderModal(null);
    } else {
      setUpdateOrderModal(idOrder);
    }
  };
  const closeUpdateModal = () => {
    setUpdateOrderModal(null);
  };
  const updateSuccess = () => {
    fetchOrderPage();
  };
  const statusColor = (status) => {
    if (status === "pending") {
      return "bg-yellow-600";
    } else if (status === "processing") {
      return "bg-blue-600";
    } else if (status === "shipped") {
      return "bg-orange-600";
    } else if (status === "delivered") {
      return "bg-green-600";
    }
  };
  return (
    <div className="h-full min-h-[535px] p-[10px] flex flex-col justify-center">
      {/**========SEARCH,EXPORT====== */}
      <div className="h-max flex items-center justify-between">
        <div className="search flex items-center gap-[10px] p-[10px] bg-slate-300 rounded-full">
          <CiSearch style={{ height: "18px", width: "17px" }} />
          <input className="search-input" type="text" placeholder="Search order..." />
        </div>
        <div className="multi-option flex items-center gap-[10px]">
          <div className="filter flex items-center bg-slate-300 p-[10px] text-[14px] rounded-full gap-[5px] cursor-pointer">
            <IoFilterCircle />
            <p>Filter</p>
          </div>
          <div className="import flex items-center bg-slate-300 p-[10px] text-[14px] rounded-full gap-[5px] cursor-pointer">
            <CgImport />
            <p>Imports</p>
          </div>
          <div className="addOrder flex items-center bg-slate-300 p-[10px] text-[14px] rounded-full gap-[5px] cursor-pointer">
            <CgExport />
            <p>Exports</p>
          </div>
        </div>
      </div>
      {/**========TABLE====== */}
      <div className="w-full h-max min-h-[410px] px-[20px] bg-white my-[10px] rounded-md flex flex-col">
        <div className="title-table grid grid-cols-11 py-[10px]">
          <div className="font-semibold col-span-2">Order Number</div>
          <div className="font-semibold flex justify-center">Items</div>
          <div className="font-semibold flex justify-center col-span-2">Total Amount</div>
          <div className="font-semibold col-span-2">Shipping Address</div>
          <div className="font-semibold flex justify-center col-span-2">Phone Number</div>
          <div className="font-semibold flex justify-center">Status</div>
          <div></div>
        </div>
        {/**Sử dụng map theo order Page*/}
        {orderPage.map((order, index) => {
          return (
            <div
              key={index}
              className="content-table grid grid-cols-11 items-center border-t-[1px] border-t-gray-300 py-[10px]"
            >
              {openUpdateOrderModalById === order._id && (
                <div className="fixed inset-0 flex items-center justify-center">
                  <UpdateOrder
                    idOrder={order._id}
                    closeModal={closeUpdateModal}
                    updateSuccess={() => {
                      updateSuccess();
                    }}
                  />
                </div>
              )}
              <p
                className="font-medium text-sm col-span-2 cursor-pointer"
                onClick={() => {
                  openUpdateModal(order._id);
                }}
              >
                {order.orderNumber}
              </p>
              <p className="text-sm flex justify-center">{order.items.length} Product</p>
              <p className="text-sm flex justify-center col-span-2">${order.totalAmount}</p>
              <p className="text-sm truncate col-span-2">{order.shippingAddress}</p>
              <p className="text-sm flex justify-center col-span-2">{order.phoneNumber}</p>
              <div className="flex items-center justify-center gap-[5px] ">
                <div
                  className={`w-[5px] h-[5px] ${statusColor(order.status)} rounded-full haha`}
                ></div>
                <p className="text-sm">{order.status}</p>
              </div>
              <div className="flex justify-center relative cursor-pointer">
                <CgMoreVertical
                  onClick={() => {
                    handleOpen(order._id);
                  }}
                />{" "}
                {openOrderId === order._id && (
                  <div className="absolute top-[20px] left-[0px] w-max h-max p-[5px] bg-slate-100 text-xs z-10 flex flex-col gap-[5px]">
                    <div
                      className="flex items-center gap-[5px] hover:opacity-50 cursor-pointer"
                      onClick={() => {
                        openUpdateModal(order._id);
                      }}
                    >
                      <MdEdit />
                      <p className="text-xs">Edit order</p>
                    </div>
                    <div
                      onClick={() => {
                        removeOrder(order._id);
                      }}
                      className=" flex items-center gap-[5px] hover:opacity-50 cursor-pointer"
                    >
                      <MdDelete />
                      <p className="text-xs">Remove order</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/**========PAGINATION====== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <p>Show</p>
          <select
            className="w-[36px] h-[25px] px-[3px] bg-slate-300 text-sm font-medium rounded-md"
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
            }}
          >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          <p>of {allOrder.length} orders</p>
        </div>

        <ReactPaginate
          previousLabel={<MdNavigateBefore />}
          nextLabel={<MdNavigateNext />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={Math.ceil(allOrder.length / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default ListOrder;
