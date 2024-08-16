import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { SiTrueup } from "react-icons/si";
import { getProducts } from "../../config/firebase.js";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const theme = useSelector((state) => state.themeStore.theme || {});
  // console.log("theme ma kia a rha ha", theme);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(SiTrueup);

  useEffect(() => {
    getAllProducts();
    AOS.init();
    AOS.refresh();
  }, []);
  // get all products data function
  const getAllProducts = async () => {
    const product = await getProducts();
    setProducts(product);
    setLoading(false);
  };
  const goToDetail = (item) => {
    navigate(`/detail/${item.id}`);
  };

  const Spinner = () => {
    return (
      <div class="flex justify-center items-center h-screen">
        <div class="flex flex-row gap-2">
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className="w-full h-full py-11 "
        style={{ backgroundColor: theme?.color, color: theme?.textColor }}
      >
        {/* Search section start */}
        <div>
          <form className="max-w-lg mx-auto">
            <div className="flex">
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                products
              </label>
              <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                All categories{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Mobile
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      TV
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Laptop
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Jacket
                    </button>
                  </li>
                </ul>
              </div>
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Mobile, TV, Laptop ..."
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Search section end */}
        <div
          className="container px-2 md:px-16 py-16 mx-auto "
          style={{ backgroundColor: theme.color }}
        >
          <div className="flex flex-wrap gap-2">
            {products.map((item, i) => {
              return (
                <div
                  className="w-[98%] mx-auto lg:w-[24%] md:w-[30%] p-4 rounded-md
  shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] backdrop-blur-[5px] bg-white overflow-hidden hover:cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105 my-1"
                  key={i}
                  onClick={() => goToDetail(item)}
                  data-aos="zoom-out-up"
                  data-aos-offset="100"
                  data-aos-easing="ease-in-sine"
                >
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-full h-full block"
                      src={item.image}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-800 text-xs tracking-widest title-font mb-1 ">
                      {item.title}
                    </h3>
                    <h2 className="text-black title-font text-sm truncate ">
                      {item.description}
                    </h2>
                    <p className="mt-1 text-black">Rs. {item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

//
