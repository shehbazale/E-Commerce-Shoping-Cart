import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { onAuthStateChanged, auth, signOut } from "../config/firebase.js";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { setTheme } from "../store/ThemeSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem.js";
import { FcBusinessman } from "react-icons/fc";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeStore.theme || {});
  const cart = useSelector((state) => state.cartStore.cart);
  // console.table("products data ha bai", cart);
  // const color = useSelector(state=>state.color)
  console.log("color a gia  gg", theme);
  const [user, setUser] = useState();
  const [showCartItem, setShowCartItem] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("user ", user);
        // ...
      } else {
        console.log("user logout hua ha");
        // User is signed out
        // ...
      }
    });
  }, [user]);

  // function to get to qunatity
  const getTotalQuantity = () => {
    let totalQuanity = 0;
    cart.forEach((item) => {
      totalQuanity += item.quantity;
    });
    return totalQuanity;
  };

  // Logout function
  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleToggleChange = (e) => {
    console.log("clicked hua");
    const ischecked = e.target.checked;
    dispatch(
      setTheme({
        color: ischecked ? "#262527" : "white",
        textColor: ischecked ? "white" : "black",
      })
    );
  };

  // show cart items
  const showCart = () => {
    setShowCartItem((prev) => !prev);
  };

  // function to show useremail and logout button
  const showDropdown = () => setIsOpen(true);
  const hideDropdown = () => setIsOpen(false);
  return (
    <>
      <header
        className="header sticky top-0 bg-white flex items-center justify-between px-4 py-2 z-50 shadow-xl overflow-hidden"
        style={{ backgroundColor: theme.color, color: theme.textColor }}
      >
        <h1 className="w-3/12 flex-shrink-0">
          <Link to="/dashboard">
            <img
              src="/logo.png"
              className="h-[70px]"
              alt="The North Store"
            ></img>
          </Link>
        </h1>

        <nav className="nav font-semibold text-lg hidden flex-grow lg:flex ">
          <ul className="flex items-center">
            <li
              className="p-4 transition-all duration-500 ease-in-out  border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 cursor-pointer active"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 transition-all duration-500 ease-in-out cursor-pointer">
              <a href="/">About</a>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 transition-all duration-500 ease-in-out cursor-pointer">
              <a href="/">Collections</a>
            </li>
            <li
              className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 transition-all duration-500 ease-in-out cursor-pointer"
              onClick={() => navigate("/addproduct")}
            >
              Add Products
            </li>
          </ul>
        </nav>

        <div
          className="w-3/12 flex justify-end space-x-4 items-center"
          style={{ color: theme.textColor }}
        >
          <div className="relative">
            <div className="t-1 absolute -right-2 -top-2">
              <p className="flex h-2 w-2 items-center justify-center rounded-full bg-gray-500 p-2.5 text-sm text-white ">
                {/* {cart.length} */}
                {getTotalQuantity() || 0}
              </p>
            </div>
            <MdOutlineShoppingCart
              className="text-3xl ml-4 hover:text-green-500 transition-all duration-500 ease-in-out cursor-pointer"
              onClick={showCart}
            />
            {/* toggle to show cart items */}
            {showCartItem && (
              <div
                className="fixed right-0 top-[86px] w-80  shadow-lg rounded-sm p-4 z-[9999] transition-opacity duration-700 ease-in-out opacity-100 h-screen bg-white overflow-y-auto border border-gray-200"
                style={{ backgroundColor: theme.color, color: theme.textColor }}
              >
                <div className="absolute right-2 ">
                  <RxCross2
                    className="text-xl hover:cursor-pointer ease-in-out transition-all duration-300 hover:text-red-600"
                    onClick={showCart}
                  />
                </div>
                <CartItem />
              </div>
            )}
          </div>
          {/* add to cart button  end*/}
          {/* dark and light section */}
          <label className="inline-flex items-center relative">
            <input
              className="peer hidden"
              id="toggle"
              type="checkbox"
              onChange={handleToggleChange}
            />
            <div className="relative w-[50px] h-[24px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[20px] after:h-[20px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[2px] after:left-[2px] peer-checked:after:left-[calc(100%-20px-2px)] peer-checked:after:translate-x-[calc(100%-20px-2px)] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
            <svg
              height="12"
              width="12"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white peer-checked:opacity-60 absolute w-3 h-3 left-1"
            >
              <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
            </svg>
            <svg
              height="12"
              width="12"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-3 h-3 right-1"
            >
              <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
            </svg>
          </label>
          {/* dark and light section  end*/}
          {/* user Profile */}
          <div className="relative inline-block text-left">
            {/* User Icon */}
            <div
              className="p-2"
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <div className="flex items-center cursor-pointer justify-center ">
                {/* <FcBusinessman size={20} /> */}
                <img src="/profile.png" alt="profile" width={35} height={35} />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className="fixed right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30 border-t border-gray-200"
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <div
                  className="py-1"
                  style={{
                    backgroundColor: theme.color,
                    color: theme.textColor,
                  }}
                >
                  <span className="block px-4 py-2 text-base truncate">
                    {user?.email}
                  </span>
                  <button
                    onClick={HandleLogout}
                    className=" w-full flex items-center gap-2 text-left px-4 py-2 text-base tranisition all ease-in-out duration-500 hover:text-red-400"
                  >
                    <RiLogoutCircleRLine />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          {/*user profile end  */}
        </div>
      </header>
    </>
  );
};

export default Navbar;
