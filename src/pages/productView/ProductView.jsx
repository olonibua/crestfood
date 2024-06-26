import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import CartView from "../cartView/CartView";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";

const ProductView = ({
  setOpenItem,
  openItem,
  handleOpenItem,
  selectedItem,
}) => {
  const [showModal, setShowModal] = useState();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const toggleModal = () => {
    handleOpenItem();
    // setShowModal(!showModal);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(selectedItem));
    handleOpenItem();
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="modal-content bg-white w-[80%] md:w-1/4 h-[62%] md:h-[75%] p-4 rounded-lg shadow-lg absolute">
          <div className="flex justify-end">
            <button
              className="text-3xl leading-none text-black hover:text-gray-500 focus:outline-none"
              onClick={toggleModal}
            >
              <IoIosClose className="bg-gray-100 rounded-full" />
              {/* &times; */}
            </button>
          </div>
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="h-[180px] overflow-clip rounded-lg">
            {" "}
            <img className="rounded-lg" src={selectedItem.img} alt="Product" />
          </div>
          <div className="pt-2">
            <div className="flex justify-between">
              <p className="text-[12px] sm:text-[14px] font-normal">
                {selectedItem.name}
              </p>
              <p className="text-[12px] sm:text-[14px] font-semibold">
                ₦{Number(selectedItem.price).toLocaleString()}
              </p>
            </div>
            <p className="text-[10px] sm:text-[12px] font-light mt-2">
              {selectedItem.category}
            </p>
          </div>
          {/* <div className="my-4">
            <p className="bg-gray-100 rounded-lg py-1 p-2">
              How do you want it?
            </p>
            <div className="flex items-center justify-between py-3 border-b p-2">
              <p>Hot</p>
              <IoIosRadioButtonOff />
            </div>
            <div className="flex items-center justify-between py-3 border-b p-2">
              <p>cold</p>
              <IoIosRadioButtonOff />
            </div>
          </div> */}
          <div className="flex items-center justify-between p-1">
            <FiMinus
              onClick={decrementQuantity}
              className="bg-gray-200 rounded-full p-2 h-7 w-7"
            />
            <span>{quantity}</span>

            <FiPlus
              onClick={incrementQuantity}
              className="bg-gray-200 rounded-full p-2 h-7 w-7"
            />
            <button
              onClick={() => handleAddToCart(selectedItem.id)}
              className="bg-black rounded-full text-[11px] md:text-[13px] text-white p-2"
            >
              Add to order (₦{(selectedItem.price * quantity).toLocaleString()})
            </button>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default ProductView;
