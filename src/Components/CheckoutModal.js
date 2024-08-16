import React, { useState } from "react";

const CheckoutModal = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!isOpen) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center py-12">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl relative">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Checkout Form</h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Your Email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Your Address"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Holder Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Card Holder Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Card Number"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Payment Method
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>PayPal</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700 w-32 "
            >
              Pay now
            </button>
          </div>
        </form>
      </div>
    </div>
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center my-6">
    //   <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
    //     <button
    //       className="absolute top-2 right-2 text-xl font-bold"
    //       onClick={onClose}
    //     >
    //       &times;
    //     </button>
    //     <h2 className="text-2xl font-bold mb-4">Checkout Form</h2>
    //     <form>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 text-sm font-bold mb-2">
    //           Name
    //         </label>
    //         <input
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           type="text"
    //           placeholder="Your Name"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 text-sm font-bold mb-2">
    //           Email
    //         </label>
    //         <input
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           type="email"
    //           placeholder="Your Email"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 text-sm font-bold mb-2">
    //           Address
    //         </label>
    //         <input
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           type="text"
    //           placeholder="Your Address"
    //         />
    //       </div>

    //       <button
    //         type="button"
    //         class="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
    //       >
    //         Pay now
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CheckoutModal;
