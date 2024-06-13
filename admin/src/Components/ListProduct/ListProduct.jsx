import { CgImport, CgMoreVertical } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaPlus, FaStar } from "react-icons/fa";
import { IoFilterCircle } from "react-icons/io5";
import "./ListProduct.css";
import ReactPaginate from "react-paginate";
import { MdDelete, MdEdit, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
const ListProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  // Get All
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/product")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove Product
  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/product", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  // More Button
  const [openProductId, setOpenProductId] = useState(null);
  const handleOpen = (idProduct) => {
    if (openProductId === idProduct) {
      setOpenProductId(null);
    } else {
      setOpenProductId(idProduct);
    }
  };

  return (
    <div className="h-full p-[10px]">
      <div className="h-max flex items-center justify-between">
        <div className="search flex items-center gap-[10px] p-[10px] bg-slate-300 rounded-full">
          <CiSearch style={{ height: "18px", width: "17px" }} />
          <input className="search-input" type="text" placeholder="Search product..." />
        </div>
        <div className="multi-option flex items-center gap-[20px]">
          <div className="filter flex items-center bg-slate-300 p-[10px] text-[14px] rounded-full gap-[5px]">
            <IoFilterCircle />
            <p>Filter</p>
          </div>
          <div className="import flex items-center bg-slate-300 p-[10px] text-[14px] rounded-full gap-[5px]">
            <CgImport />
            <p>Imports</p>
          </div>
          <div className="addProduct flex items-center bg-yellow-400 p-[10px] text-[14px] rounded-full gap-[5px]">
            <FaPlus />
            <p>New Product</p>
          </div>
        </div>
      </div>
      {/**========TABLE====== */}
      <div className="w-full h-max min-h-[400px] px-[20px] bg-white my-[10px] rounded-md flex flex-col">
        <div className="title-table grid grid-cols-7 py-[10px]">
          <div className="col-span-2 font-semibold">Item Name</div>
          <div className="font-semibold">Price</div>
          <div className="font-semibold ">Stock</div>
          <div className="font-semibold">Category</div>
          <div className="font-semibold">Rating</div>
          <div></div>
        </div>
        {allProduct.map((product, index) => {
          return (
            <div
              key={index}
              className="content-table grid grid-cols-7 items-center border-t-[1px] border-t-gray-300"
            >
              <div className="col-span-2 flex items-center gap-[10px] py-[10px]">
                <img className="w-[35px] h-[40px]" src={product.image} alt="" />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="opacity-40 text-sm">description</p>
                </div>
              </div>
              <p className="text-sm">${product.new_price}</p>
              <p className="text-sm">90</p>
              <div className="flex items-center gap-[5px]">
                <div className="w-[5px] h-[5px] bg-green-400 rounded-full"></div>
                <p className="text-sm">{product.category}</p>
              </div>
              <div className="rating flex items-center gap-[5px]">
                <FaStar className="w-[13px] h-[13px] text-yellow-400" />
                <p className="text-sm">4.9</p>
                <p className="opacity-40 text-sm">35 Reviews</p>
              </div>
              <div className="flex justify-center relative cursor-pointer">
                <CgMoreVertical
                  onClick={() => {
                    handleOpen(product.id);
                  }}
                />
                {openProductId === product.id && (
                  <div className="absolute top-[25px] left-[10px] w-max h-max p-[10px] bg-slate-100 text-xs z-10 flex flex-col gap-[5px]">
                    <div className="flex items-center gap-[5px] hover:opacity-50 cursor-pointer">
                      <MdEdit />
                      <p className="text-xs">Edit Product</p>
                    </div>
                    <div
                      onClick={() => {
                        removeProduct(product.id);
                      }}
                      className=" flex items-center gap-[5px] hover:opacity-50 cursor-pointer"
                    >
                      <MdDelete />
                      <p className="text-xs">Remove Product</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <p>Show 6 of 145</p>
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
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
          //onPageChange
        />
      </div>
    </div>
  );
};

export default ListProduct;
