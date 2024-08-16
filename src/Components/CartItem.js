import React, { useState } from "react";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/CartSlice";
import CheckoutModal from "./CheckoutModal";

const Cartcart = () => {
  const cart = useSelector((state) => state.cartStore.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [animatedProductId, setAnimatedProductId] = useState(null);
  // function to remove item from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    console.log("cart ID", id);
  };
  //fucntion to increment the quantity
  const quantityIncrement = (id) => {
    dispatch(incrementQuantity(id));
    triggerAnimation(id);
  };

  //fucntion to decrement the quantity
  const quantityDecrement = (id) => {
    dispatch(decrementQuantity(id));
    triggerAnimation(id);
  };

  //function to animate quantity onchange
  const triggerAnimation = (id) => {
    setAnimatedProductId(id);
    setTimeout(() => setAnimatedProductId(null), 200); // Reset animation class after 200ms
  };

  // function to total
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="relative">
            <div className="overflow-y-auto h-[360px] mt-8">
              {cart.map((product) => (
                <div className="flex flex-col" key={product.id}>
                  <div className="flex carts-center justify-between p-2 border-b border-gray-300 mt-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <h4 className="text-lg font-semibold">{product.title}</h4>
                      {/* <p className="text-gray-600 text-sm">{product.description}</p> */}
                      <p className="text-sm font-semibold mt-1">
                        Rs {product.price * product.quantity}
                      </p>
                    </div>

                    <div className="flex items-end w-fit">
                      <div className="flex justify-center  gap-1 border border-gray-300 rounded-full px-2 py-1">
                        {product.quantity > 1 ? (
                          <button
                            onClick={() => quantityDecrement(product.id)}
                            className="hover:opacity-90 transition-colors duration-300 items-end animate-scaleUp"
                          >
                            <FaMinus size={10} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="hover:opacity-90 transition-colors duration-300 items-end "
                          >
                            <FaRegTrashAlt size={10} />
                          </button>
                        )}
                        <p
                          className={`mx-2 ${
                            animatedProductId === product.id
                              ? "animate-scaleUp"
                              : ""
                          } `}
                        >
                          {product.quantity}
                        </p>
                        <button
                          onClick={() => quantityIncrement(product.id)}
                          className="hover:opacity-90 transition-colors duration-300 items-end"
                        >
                          <FaPlus size={10} className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* total price section */}
            <div className="flex justify-between items-center p-4 ">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-semibold">
                Rs {totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end p-4 absolute bottom-[-70px] left-0 right-0">
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-green-600 transition-all duration-300 w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img src="/cart/empty-cart.png" alt="empty-cart"></img>
          <p className=" text-center text-red-600 font-bold">
            No items in cart
          </p>
        </div>
      )}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Cartcart;
