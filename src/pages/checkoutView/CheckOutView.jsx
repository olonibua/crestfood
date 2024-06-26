import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import "./CheckOutView.css";
import { CSSTransition } from "react-transition-group";

const CheckOutView = ({ HandleCheckOut, getSubTotal }) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [countryCodeOptions, setCountryCodeOptions] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [isProceedEnabled, setIsProceedEnabled] = useState(false);

  const [countryFlags, setCountryFlags] = useState([]);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState("");

  useEffect(() => {
    setSubtotal(getSubTotal);
    setDeliveryFee(1500);
  }, [getSubTotal]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((response) => {
        const flags = response.data.data;
        axios
          .get("https://restcountries.com/v3.1/all")
          .then((response) => {
            const countries = response.data;
            const options = countries.map((country, index) => ({
              code: country.cca2,
              country: country.name.common,
              flag: flags[index], // Assuming flags are ordered the same way as countries
            }));
            setCountryCodeOptions(options);
            setSelectedCountryCode(options[0].code);
          })
          .catch((error) => {
            console.error("Error fetching country codes:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching country flags:", error);
      });
  }, []);

  useEffect(() => {
    setIsProceedEnabled(
      fullName.trim() !== "" &&
        isEmailValid &&
        phoneNumber.trim() !== "" &&
        deliveryAddress.trim() !== ""
    );
  }, [fullName, isEmailValid, phoneNumber, deliveryAddress]);

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const generateTransactionReference = () => {
    return "ref-" + Math.random().toString(36).substr(2, 9);
  };

  const handlePayment = () => {
    if (!validateEmail(email.trim())) {
      setIsEmailValid(false);
      return;
    }

    const publicKey = "pk_live_a67f578a8b967c8be74b803552da226a466d29f9"; // Replace with your Paystack public key
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: (subtotal + deliveryFee) * 100,
      currency: "NGN",
      ref: generateTransactionReference(),
      callback: function (response) {
        alert("Success. Transaction ref is " + response.reference);
      },
      onClose: function () {
        alert("Window closed.");
      },
    });
    handler.openIframe();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center transition-transform duration-300 justify-center overflow-hidden outline-none focus:outline-none ${
        HandleCheckOut ? "-translate-x-50" : "translate-x-full"
      }`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="modal-content overflow-y-scroll bg-white w-[90%] md:w-[50%] max-w-2xl h-[90%] p-6 md:p-8 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold mt-2">Delivery Information</p>
          <button
            className="text-2xl leading-none text-black hover:text-gray-500 focus:outline-none"
            onClick={HandleCheckOut}
          >
            <IoIosClose className="bg-gray-100 rounded-full" />
          </button>
        </div>
        <div className="mt-4">
          <div className="grid gap-2 mt-2">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="h-10 border border-gray-200 focus:shadow-sm p-2 rounded-lg outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mt-2">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className={`h-10 border border-gray-200 focus:shadow-sm p-2 rounded-lg outline-none ${
                !isEmailValid ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(true);
              }}
            />
            {!isEmailValid && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div className="grid gap-2 mt-2">
            <label>Phone Number</label>
            <div className="flex border border-gray-200 rounded-lg focus:shadow-sm">
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="border-r border-gray-200 rounded-l-lg focus:shadow-lg p-2"
              >
                {countryCodeOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    <img
                      src={option.flag}
                      alt={option.country}
                      className="w-4 h-4 mr-2"
                    />{" "}
                    {/* Display flag image */}
                    {/* {option.country} */}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="h-10 p-2 flex-1 rounded-r-lg outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <h2 className="text-lg font-semibold mt-6 mb-4">Address details</h2>
          <div className="grid gap-2 mt-2">
            <label>Delivery address</label>
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="h-10 border border-gray-200 focus:shadow-sm p-2 rounded-lg outline-none"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mt-2">
            <label>LandMark (optional)</label>
            <input
              type="text"
              placeholder="Enter a landmark (optional)"
              className="h-10 border border-gray-200 focus:shadow-sm p-2 rounded-lg outline-none"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div className="bg-orange-50 rounded-lg mt-6 p-4">
            <div className="py-3 grid gap-3">
              <div className="text-sm flex justify-between text-gray-600 font-medium">
                <p>SubTotal</p>
                <p className="font-semibold">₦{subtotal.toLocaleString()}</p>
              </div>
              <div className="text-sm flex justify-between text-gray-600 font-medium">
                <p>Delivery fee</p>
                <p className="font-semibold">₦{deliveryFee.toLocaleString()}</p>
              </div>
              <div className="text-sm flex justify-between font-semibold">
                <p>Total</p>
                <p>₦{(deliveryFee + subtotal).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={handlePayment}
              className={`w-full md:w-3/4 bg-black text-white rounded-full py-2 px-4 ${
                isProceedEnabled ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isProceedEnabled}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutView;
