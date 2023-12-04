import React, { useEffect, useState } from "react";
import { Layout, notification, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Content } = Layout;
import {
  HomeIcon,
  Squares2X2Icon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import "./App.css";
import SideBar from "./components/SideBar";
import HeaderBar from "./components/HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { fetchMyProfileRequest } from "./redux/actions/MyProfile";
import { fetchCategoryRequest } from "./redux/actions/Category";
import { fetchStoreRequest } from "./redux/actions/Store";
import { fetchStaffRequest } from "./redux/actions/Staff";
import { fetchProductRequest } from "./redux/actions/Product";
import { fetchCustomerRequest } from "./redux/actions/Customer";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const itemMenu = [
  getItem(
    <Link to={"/"}>Trang chủ</Link>,
    "1",
    <HomeIcon className="w-5 h-5" />
  ),
  getItem("Sản phẩm", "product", <Squares2X2Icon className="w-5 h-5" />, [
    getItem(<Link to={"/products"}>Sản phẩm</Link>, "2"),
    getItem(<Link to={"/categories"}>Loại sản phẩm</Link>, "3"),
    getItem(<Link to="/banner">Quảng cáo</Link>, "4"),
  ]),
  getItem("Biểu đồ", "chart", <DocumentChartBarIcon className="w-5 h-5" />, [
    getItem(<Link to="/chart/product">Sản phẩm</Link>, "5"),
    getItem(<Link to="/chart/store">Cửa hàng</Link>, "6"),
  ]),
  getItem("Mọi người", "user", <UserGroupIcon className="w-5 h-5" />, [
    getItem(<Link to={"/stores"}>Cửa hàng</Link>, "7"),
    getItem(<Link to="/customers">Người dùng</Link>, "8"),
    // getItem(<Link to="/staffs">Nhân viên</Link>, "8"),
  ]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  //todo: check login
  const token = Cookies.get("token");
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token has expired, redirect to the login page
          Cookies.remove("token");
          notification.error({
            message: "Token Expired",
            description: "Your session has expired. Please log in again.",
            duration: 3,
          }); // Clear the expired token
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    checkTokenExpiration(); // Check token expiration on initial render

    // Check token expiration on every route change
    const unlisten = navigate(checkTokenExpiration);

    return () => {
      unlisten; // Cleanup the listener when the component is unmounted
    };
  }, [token, navigate]);

  useEffect(() => {
    dispatch(fetchCategoryRequest());
  }, []);

  useEffect(() => {
    dispatch(fetchStoreRequest(token));
  }, []);

  useEffect(() => {
    dispatch(fetchCustomerRequest("customer", token));
  }, []);

  useEffect(() => {
    dispatch(fetchStaffRequest("staff", token));
  }, []);

  useEffect(() => {
    dispatch(fetchProductRequest());
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(fetchMyProfileRequest(decodedToken.userId, token));
    }
  }, []);

  return (
    <Layout className="h-[100vh]">
      <SideBar collapsed={collapsed} itemMenu={itemMenu} />
      <Layout className="h-[100vh]">
        <HeaderBar
          toggleMenu={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />
        <Content
          style={{
            margin: "10px 10px",
            padding: 24,
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
