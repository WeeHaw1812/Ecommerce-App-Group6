import { CgExport, CgImport, CgMoreVertical } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoFilterCircle } from "react-icons/io5";
import "./ListProduct.css";
import ReactPaginate from "react-paginate";
import { MdDelete, MdEdit, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
import UpdateProduct from "../UpdateProduct/UpdateProduct";

const ListProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [productPage, setProductPage] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, totalPages: 0 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  // Get All for Total Count
  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:4000/product");
      const data = await res.json();
      if (data.success) {
        setAllProduct(data.data);
      } else {
        console.error("Failed to fetch all products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Get Product Page
  const fetchProductPage = async () => {
    try {
      const res = await fetch(`http://localhost:4000/product?page=${page}&limit=${limit}`);
      const data = await res.json();
      if (data.success) {
        setProductPage(data.data); // Set to the array of products
        setPagination(data.pagination); // Store pagination metadata
      } else {
        console.error("Failed to fetch product page:", data.message);
        setProductPage([]); // Fallback to empty array on failure
      }
    } catch (error) {
      console.error("Error fetching product page:", error);
      setProductPage([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    fetchProductPage();
  }, [page, limit]);

  // Handle Page Click
  const handlePageClick = (selectedItem) => {
    setPage(selectedItem.selected + 1); // +1 because ReactPaginate uses 0-based index
  };

  // Remove Product
  const removeProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/product/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        await fetchProductPage();
        await fetchInfo();
      } else {
        console.error("Failed to remove product:", data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
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

  // Update Modal
  const [openUpdateProductModalById, setUpdateProductModal] = useState(null);
  const openUpdateModal = (idProduct) => {
    if (openUpdateProductModalById === idProduct) {
      setUpdateProductModal(null);
    } else {
      setUpdateProductModal(idProduct);
    }
  };
  const closeUpdateModal = () => {
    setUpdateProductModal(null);
  };
  const updateSuccess = () => {
    fetchProductPage();
    fetchInfo();
  };

  return (
    <div className="h-full min-h-[535px] p-[10px] flex flex-col justify-center">
      {/**========SEARCH,EXPORT====== */}
      <div className="h-max flex items-center justify-between">
        <div className="search flex items-center gap-[10px] p-[10px] bg-slate-300 rounded-full">
          <CiSearch style={{ height: "18px", width: "17px" }} />
          <input className="search-input" type="text" placeholder="Search product..." />
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
          <div className="addProduct flex items-center bg-slate-300 p-[10px] text-[14px] rounded-full gap-[5px] cursor-pointer">
            <CgExport />
            <p>Exports</p>
          </div>
        </div>
      </div>
      {/**========TABLE====== */}
      <div className="w-full h-max min-h-[410px] px-[20px] bg-white my-[10px] rounded-md flex flex-col">
        <div className="title-table grid grid-cols-7 py-[10px]">
          <div className="col-span-2 font-semibold">Item Name</div>
          <div className="font-semibold">Old Price</div>
          <div className="font-semibold">New Price</div>
          <div className="font-semibold">Category</div>
          <div className="font-semibold">Rating</div>
          <div></div>
        </div>
        {/** Render Product Page */}
        {productPage.length === 0 ? (
          <p className="text-center py-[20px]">No products found</p>
        ) : (
          productPage.map((product, index) => (
            <div
              key={index}
              className="content-table grid grid-cols-7 items-center border-t-[1px] border-t-gray-300"
            >
              {openUpdateProductModalById === product.id && (
                <div className="fixed inset-0 flex items-center justify-center">
                  <UpdateProduct
                    idProduct={product.id}
                    closeModal={closeUpdateModal}
                    updateSuccess={updateSuccess}
                  />
                </div>
              )}
              <div className="col-span-2 flex items-center gap-[10px] py-[10px]">
                <img className="w-[35px] h-[40px]" src={product.image} alt="" />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm truncate w-[200px]">{product.name}</p>
                  <p className="opacity-40 text-sm truncate w-[100px]">{product.description}</p>
                </div>
              </div>
              <p className="text-sm">${product.old_price}</p>
              <p className="text-sm">${product.new_price}</p>
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
                    <div
                      className="flex items-center gap-[5px] hover:opacity-50 cursor-pointer"
                      onClick={() => {
                        openUpdateModal(product.id);
                      }}
                    >
                      <MdEdit />
                      <p className="text-xs">Edit Product</p>
                    </div>
                    <div
                      onClick={() => {
                        removeProduct(product.id);
                      }}
                      className="flex items-center gap-[5px] hover:opacity-50 cursor-pointer"
                    >
                      <MdDelete />
                      <p className="text-xs">Remove Product</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
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
              setPage(1); // Reset to page 1 when limit changes
            }}
          >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          <p>of {pagination.total} products</p>
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
          pageCount={pagination.totalPages} // Use totalPages from API response
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

export default ListProduct;
