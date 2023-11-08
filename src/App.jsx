import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  PieChartFilled,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Content } = Layout;
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
  getItem(<Link to={"/"}>Home</Link>, "1", <PieChartOutlined />),
  getItem(<Link to={"/user"}>product</Link>, "2", <DesktopOutlined />),
  getItem("Chart", "chart", <PieChartFilled />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("User", "sub2", "", [getItem("Team 1", "6"), getItem("Team 2", "8")]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const data = useSelector((state) => state.loginReducer.data);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    if (data == null) {
      navigate("/login");
    }
  }, [data, navigate]);

  return (
    <Layout className="h-[100vh]">
      <SideBar collapsed={collapsed} itemMenu={itemMenu} />
      <Layout>
        <HeaderBar
          toggleMenu={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />
        <Content
          style={{
            margin: "10px 10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
