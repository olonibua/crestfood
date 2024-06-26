import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiCart } from "react-icons/bi";
import CartView from "../../pages/cartView/CartView";
import { useSelector } from "react-redux";

const MenuBar = ({ searchWord, handleSearchChange }) => {
  const [showCart, setShowCart] = useState(false); // State for quantity
  const cartItems = useSelector((state) => state.cart.items);

  const HandleShowCart = () => {
    setShowCart(!showCart);
  };

  const cartCount = cartItems.length;
  return (
    <div className="h-16 sticky top-0 bg-white z-10 border-b flex py-8 md:py-[47px] justify-center w-full mx-auto items-center">
      <div>
        <h2 className="pl-10 md:pl-16 md:text-[20px] font-[700]">CrestFood</h2>
      </div>
      <div className=" bg-[#f5f5f5] flex p-2 w-[250px] md:w-[350px] cursor-pointer mx-auto h-10 rounded-full items-center">
        <FiSearch className="text-gray-500" />
        <input
          className="ml-[2px] bg-[#f5f5f5] outline-none w-full p-1 text-[15px]"
          value={searchWord}
          onChange={handleSearchChange}
          placeholder="Search for meal..."
          type="text"
        />
      </div>
      <div className="relative mr-[40px]">
        <BiCart
          onClick={HandleShowCart}
          className="h-5 w-5 mr-2 cursor-pointer"
        />
        {cartCount > 0 && (
          <span className="bg-red-500 rounded-full h-5 w-5 flex items-center justify-center text-white absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            {cartCount}
          </span>
        )}
      </div>

      {showCart && (
        <CartView showCart={showCart} HandleShowCart={HandleShowCart} />
      )}
    </div>
  );
};

export default MenuBar;
