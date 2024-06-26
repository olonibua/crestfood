import React, { useState } from "react";
import "./ProductContainer.css";
import ProductView from "../../pages/productView/ProductView";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import data from "../../Api/Data";

const ProductContainer = ({ searchWord }) => {
  const [openItem, setOpenItem] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const itemsPerPage = 12;

  const categories = ["all", "protein", "carbohydrates", "snack", "vegetables"];

  const handleOpenItem = (itemID) => {
    setSelectedItemId(itemID);
    setOpenItem(!openItem);
  };

  const selectedItem = data.find((item) => item.id === selectedItemId);

  const filteredData = data.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchWord.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page whenever category changes
  };

  return (
    <div className="w-full overflow-hidden p-10 md:pt-5 sm:max-w-[800px] md:max-w-[1200px] mx-auto justify-center">
      <div className="flex justify-center max-w-[300px] md:max-w-[800px] mx-auto my-2 md:mt-7 ">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`mx-2 p-1 md:p-[10px] rounded-full w-full text-[13px] md:text-[15px] font-[600] hover:text-[#929292] transition duration-200 ease-in-out cursor-pointer ${
              selectedCategory === category
                ? "bg-orange-50 border-[2px] border-[#797979] text-black"
                : "bg-gray-100"
            }`}
          >
            {category.charAt(0).toLocaleUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid overflow-y-scroll scrollbar-hide sm:grid-cols-2 md:grid-cols-4 sm:p-1 gap-3 sm:space-x-1 sm:mt-10">
        {currentItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenItem(item.id)}
            className="h-44 border cursor-pointer w-full md:w-full rounded-[11px] sm:mt-4 transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="h-[90px] overflow-clip items-center align-middle justify-self-center ">
              <img
                src={item.img}
                className="border-top-rounded item-center "
                alt="food"
              />
            </div>
            <div className="grid p-3">
              <div className="flex justify-between sm:pt-3">
                <p className="text-[12px] sm:text-[14px] font-[600] text-[#585858]">
                  {item.name}
                </p>
                <p className="text-[12px] sm:text-[14px] font-semibold">
                  ₦{Number(item.price).toLocaleString()}
                </p>
              </div>
              <p className="text-[10px] font-[500] sm:text-[12px] text-[#585858] sm:pt-2">
                {item.category || ""}
              </p>
            </div>
          </div>
        ))}
        {openItem && (
          <ProductView
            setOpenItem={setOpenItem}
            openItem={openItem}
            handleOpenItem={handleOpenItem}
            selectedItem={selectedItem}
          />
        )}
      </div>
      <div className="max-w-[400px] font-[500] md:max-w-[1100px] my-4 mx-auto pl-5 pr-5 flex mt-4 justify-between items-center">
        <span>Page {currentPage}</span>
        <div className="flex">
          {/* <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="mx-2 p-2 bg-gray-200 rounded-full"
          >
            <IoIosArrowBack className="h-6 w-6" />
          </button> */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`mx-2 p-1 h-10 w-10 justify-center rounded-full text-[14px] hover:text-[#929292] transition duration-200 ease-in-out cursor-pointer ${
                currentPage === index + 1
                  ? "bg-black text-white justify-center  mx-2 p-1 rounded-full"
                  : "mx-2 p-1 bg-gray-200 justify-center rounded-full "
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="mx-2 p-2 bg-black text-white w-24 rounded-full hover:text-[#929292] transition duration-200 ease-in-out cursor-pointer"
          >
            Next page
            {/* <IoIosArrowForward className="h-6 w-6" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
