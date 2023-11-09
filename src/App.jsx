import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  PieChartFilled,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
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
    getItem(<Link to={"/products"}>Tất cả</Link>, "2"),
    getItem(<Link to={"/stores"}>Cửa hàng</Link>, "3"),
    getItem(<Link to="/banner">Quảng cáo</Link>, "4"),
  ]),
  getItem("Biểu đồ", "chart", <DocumentChartBarIcon className="w-5 h-5" />, [
    getItem(<Link to="/chart/product">Sản phẩm</Link>, "5"),
    getItem(<Link to="/chart/store">Cửa hàng</Link>, "6"),
  ]),
  getItem("Mọi người", "user", <UserGroupIcon className="w-5 h-5" />, [
    getItem(<Link to="/customers">Người dùng</Link>, "7"),
    getItem(<Link to="/staffs">Nhân viên</Link>, "8"),
  ]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const data = useSelector((state) => state.authReducer.data);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  //todo: check login
  // useEffect(() => {
  //   console.log(data);
  //   if (data == null) {
  //     navigate("/login");
  //   }
  // }, [data, navigate]);

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
