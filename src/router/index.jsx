import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import User from "../pages/User";
import Chart from "../pages/Chart";
import App from "../App";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "user", element: <User /> },
      { path: "chart", element: <Chart /> },
    ],
  },
]);
