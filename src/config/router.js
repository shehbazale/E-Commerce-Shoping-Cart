import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Detail from "../views/Detail";
import Login from "../views/Login";
import Register from "../views/Register";
import Navbar from "../Components/Navbar";
import Herosection from "../Components/Herosection";
import Footer from "../Components/Footer";
import AddProduct from "../views/AddProduct";
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
    path: "dashboard",
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
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
