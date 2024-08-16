import React, { useState } from "react";
import { addProduct } from "../../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
const AddProduct = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [filename, setFilename] = useState();
  const [isDragging, setIsDragging] = useState(false);
  // form validation
  const [error, setError] = useState({
    title: false,
    description: false,
    price: false,
    image: false,
  });
  // theme change function

  const theme = useSelector((state) => state.themeStore.theme);
  const handleProduct = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {
      title: !title,
      description: !description,
      price: !price,
      image: !image,
    };
    if (
      newErrors.title ||
      newErrors.description ||
      newErrors.price ||
      newErrors.image
    ) {
      setError(newErrors);
      formIsValid = false;
    }
    if (formIsValid) {
      try {
        const products = { title, description, price, image };
        await addProduct(products);
        // alert("added ho gia");
        toast.success("Product added to cart", {
          positiont: toast.POSITION.TOP_LEFFT,
          autoClose: 500,
        });
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
        setImagePreview("");
        setFilename("");
        setError({
          title: false,
          description: false,
          price: false,
          image: false,
        });
      } catch (e) {
        // alert(e.message);
        toast.success(`Error:${e.message}`);
      }
    }
  };
  // to show image and set in state
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFilename(file.name);
      error.image = false;
    }
  };

  // Drag and drop function
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFilename(file.name);
      setError((prevErrors) => ({ ...prevErrors, image: false }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // to remove image from input fiel
  const removeImage = () => {
    setImage(null);
    setImagePreview("");
    setFilename("");
  };
  return (
    <>
      <section
        className="rounded-md p-2 py-8"
        style={{ backgroundColor: theme.color, color: theme.textColor }}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <div className="flex items-center justify-center my-3 ">
          <div
            className={`xl:mx-auto rounded-md shadow-lg p-4 xl:w-full xl:max-w-sm 2xl:max-w-md ${
              theme.color === "#262527" ? "bg-black/20" : "bg-white"
            }`}
          >
            <div className="mb-2">
              {" "}
              <h2 className="text-2xl font-bold leading-tight">Add Product</h2>
            </div>

            <form className="mt-5" onSubmit={handleProduct}>
              <div className="space-y-4">
                <div>
                  <label className="text-base font-medium ">Title</label>
                  <div className="mt-2">
                    <input
                      placeholder="Title"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error.title ? "border-red-600" : "border-gray-300 "
                      }`}
                      name="user_name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-base font-medium">Description</label>
                  <div className="mt-2">
                    <textarea
                      id="w3review"
                      rows="4"
                      cols="50"
                      placeholder="Description"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      className={`flex w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error.description
                          ? "border-red-600"
                          : "border-gray-300 "
                      }`}
                      name="description"
                    />
                  </div>
                </div>
                <div>
                  {/* <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        Category
                      </label>
                    </div> 
                  <div className="mt-2">
                      <input
                        placeholder="Category"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="category"
                      />
                    </div> */}
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium ">Price</label>
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Price"
                      type="number"
                      // onChange={(e) => setPrice(e.target.value)}
                      onChange={(e) => {
                        setPrice(e.target.value);
                        if (e.target.value)
                          setError((prevErrors) => ({
                            ...prevErrors,
                            price: false,
                          }));
                      }}
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error.price ? "border-red-600" : "border-gray-300"
                      }`}
                      name="price"
                    />
                  </div>
                  {/* <div className="flex items-center justify-between mt-3">
                    <label className="text-base font-medium text-gray-900">
                      Product Picture
                    </label>
                  </div> */}

                  <div className="items-center justify-center max-w-xl mx-auto mt-6">
                    <label
                      className={`flex justify-center w-full h-12 px-4 transition border-2  border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${
                        error.image
                          ? "border-red-600"
                          : "border-gray-300" && isDragging
                          ? "bg-blue-100 border-blue-500"
                          : error.image
                      }  `}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      id="drop"
                    >
                      <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-6 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <span className="font-medium ">
                          Drop files to Attach, or
                          <span className="text-blue-600 underline ml-[4px]">
                            browse
                          </span>
                        </span>
                      </span>
                      <input
                        type="file"
                        name="file_upload"
                        className="hidden"
                        accept="image/png,image/jpeg"
                        id="input"
                        // onChange={(e) => setImage(e.target.files[0])}
                        onChange={handleImageChange}
                      />
                    </label>

                    {imagePreview && (
                      <div className=" relative flex  justify-center flex-col items-center mt-2">
                        <p className="my-2">{filename}</p>
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-32 h-32 rounded-md border border-gray-300 "
                        />
                        <div className="absolute top-10 right-[33%]">
                          <button onClick={removeImage}>
                            <RxCross2 className="text-red-600 font-bold text-lg" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="mt-2">
                    <input
                      className="file-input w-full max-w-xs"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div> */}
                </div>
                <div>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-700 px-3.5 py-2.5 font-semibold leading-7 text-white transition-all ease-in-out duration-500 hover:bg-blue-600"
                    type="submit"
                  >
                    Upload Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
