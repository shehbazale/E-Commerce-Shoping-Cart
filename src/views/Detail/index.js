import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { doc, getDoc, db, getSingleProduct } from "../../config/firebase"; // Adjust the import based on your file structure
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
export default function Detail() {
  const theme = useSelector((state) => state.themeStore.theme || {});
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getSingleProductData();
    AOS.init();
    AOS.refresh();
  }, []);
  // get product function
  const getSingleProductData = async () => {
    const singleProduct = await getSingleProduct(params.id);
    setProduct(singleProduct);
  };
  // add to cart function
  const addTocart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };
  return (
    <>
      <ToastContainer />
      <section
        className="text-gray-600 body-font overflow-hidden"
        style={{ backgroundColor: theme?.color, color: theme?.textColor }}
      >
        <button
          className="border border-gray-300 px-4 py-2 ml-4 mt-4 rounded-full text-2xl hover:bg-slate-50 transition-all duration-300 ease-in-out"
          onClick={() => {
            navigate(-1);
          }}
        >
          <TbArrowBackUp />
        </button>
        <div className="container px-5 py-16 mx-auto">
          <h1 className="text-center text-3xl font-bold mb-10">
            Product Detail
          </h1>
          <div
            className="lg:w-[60%] mx-auto rounded-md flex flex-wrap p-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            data-aos="zoom-out-up"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              alt={product.title}
              className=" lg:w-1/2 w-full  h-64 object-contain object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-lg font-bold title-font text-gray-500 tracking-widest">
                {product.title}
              </h2>

              <p className="leading-relaxed mt-3 text-black">
                {product.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs {product.price}
                </span>
                <button
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={addTocart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
