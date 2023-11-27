import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";
import App from "../App";
import Customers from "../pages/Users/Customers";
import Staffs from "../pages/Users/Staffs";
import Products from "./../pages/Products/Products";
import ProductsChart from "./../pages/Charts/Products";
import StoreChart from "./../pages/Charts/Store";
import Store from "./../pages/Products/Store";
import Banner from "./../pages/Products/Banner";
import ProductDetail from "../pages/Products/ProductDetail";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/customers", element: <Customers /> },
      { path: "/staffs", element: <Staffs /> },
      { path: "/products", element: <Products /> },
      { path: "/stores", element: <Store /> },
      { path: "/banner", element: <Banner /> },
      { path: "/chart/product", element: <ProductsChart /> },
      { path: "/chart/store", element: <StoreChart /> },
    ],
  },
  { path: "/product/:id", element: <ProductDetail /> },
]);
