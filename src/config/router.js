import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Detail from "../views/Detail";
import Login from "../views/Login";
import Register from "../views/Register";
import Navbar from "../Components/Navbar";
import Herosection from "../Components/Herosection";
import Footer from "../Components/Footer";
import AddProduct from "../views/AddProduct";
import { useEffect, useState } from "react";
import { onAuthStateChanged, auth } from "./firebase";
const DashboardLayout = ({ children }) => (
  <>
    <Navbar />
    <Herosection />
    {children}
    <Footer />
  </>
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ),
      },
      {
        path: "/detail/:id",
        element: (
          <DashboardLayout>
            <Detail />
          </DashboardLayout>
        ),
      },
      {
        path: "/addproduct",
        element: (
          <DashboardLayout>
            <AddProduct />
          </DashboardLayout>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [ischecked, setIschecked] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIschecked(true);
    });
  }, []);

  useEffect(() => {
    // const path = window.location.pathname;
    const { pathname } = window.location;
    if (ischecked) {
      if (user) {
        console.log("user logged in", user);
        if (pathname === "/login" || pathname === "/register") {
          navigate("/");
        }
      } else {
        console.log("user log out");
        if (pathname === "/addproduct") {
          navigate("/login");
        }
      }
    }
  }, [window.location.pathname, user, navigate]);
  if (!ischecked) {
    return null;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default function Router() {
  return <RouterProvider router={router} />;
}
