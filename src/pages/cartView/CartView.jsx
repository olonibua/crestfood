import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { removeFromCart } from "../../redux/actions";
import CheckOutView from "../checkoutView/CheckOutView";

const CartView = ({ showCart, HandleShowCart }) => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [displayCart, setDisplayCart] = useState(showCart);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const [getSubTotal, setGetSubTotal] = useState(0);

  // Calculate subtotal dynamically based on cart items and their quantities
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * (quantities[item.id] || 1);
  }, 0);

  // Function to increment quantity of an item in the cart
  const incrementQuantity = (itemId) => {
    setQuantities({
      ...quantities,
      [itemId]: (quantities[itemId] || 0) + 1,
    });
  };

  // Function to decrement quantity of an item in the cart
  const decrementQuantity = (itemId) => {
    if (quantities[itemId] > 1) {
      setQuantities({
        ...quantities,
        [itemId]: quantities[itemId] - 1,
      });
    }
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    setQuantities({
      ...quantities,
      [itemId]: 0, // Reset quantity of removed item to 0
    });
  };

  const HandleCheckOut = () => {
    setShowCheckOut(!showCheckOut);
    setGetSubTotal(subtotal);
    setDisplayCart(false);
    // HandleShowCart();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-transform duration-300 ${
          displayCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="fixed right-0 top-0 h-full bg-white w-[70%] md:w-1/4 cart-content">
          <div className="flex p-2 items-center border-b fixed bg-white w-full">
            <button
              className="text-3xl leading-none justify-start text-black hover:text-gray-500 focus:outline-none"
              onClick={HandleShowCart}
            >
              <IoIosClose className="bg-gray-100 rounded-[8px] p-1" />
            </button>
            <p className="mx-32 font-[600]">My order</p>
          </div>
          <div className="overflow-y-scroll h-[80%] pt-7">
            {cartItems.map((item) => (
              <div key={item.id} className="mt-3 p-5 border-b ">
                <div className="flex items-start">
                  <div className="h-1/4 w-1/4 rounded-lg overflow-clip">
                    <img className="rounded-lg" src={item.img} alt="" />
                  </div>
                  <div className="px-3">
                    <p className="text-[12px] font-[600] sm:text-[14px] text-[₦6d6d6d]">
                      {item.name}
                    </p>
                    <p className="text-[12px] my-2 sm:text-[15px] font-semibold">
                      ₦{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex pt-4 justify-between items-center">
                  <AiOutlineDelete
                    className="h-6 w-6 bg-gray-100 rounded-full cursor-pointer p-[4px]  justify-center"
                    onClick={() => handleRemoveFromCart(item.id)}
                  />
                  <div className="flex bg-gray-100 rounded-full w-1/4 items-center justify-between">
                    <FiMinus
                      onClick={() => decrementQuantity(item.id)}
                      className="bg-gray-100 rounded-full cursor-pointer p-2 h-7 w-7"
                    />
                    <span>{quantities[item.id] || 1}</span>
                    <FiPlus
                      onClick={() => incrementQuantity(item.id)}
                      className="bg-gray-100 rounded-full cursor-pointer p-2 h-7 w-7"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="py-3 p-4 bg-orange-50 border-t flex items-center justify-between">
              <p className="text-[12px] sm:text-[14px] font-medium">SubTotal</p>
              <p className="text-[12px] sm:text-[14px] font-semibold">
                ₦{subtotal.toLocaleString()}
              </p>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <button
                onClick={HandleCheckOut}
                className="w-[80%] max-w-xs mt-7 bg-black text-white rounded-full py-2 px-4"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCheckOut && (
        <CheckOutView
          HandleCheckOut={HandleCheckOut}
          getSubTotal={getSubTotal}
        />
      )}
    </>
  );
};

export default CartView;
