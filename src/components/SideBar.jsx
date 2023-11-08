import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, Avatar, Typography, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Sider } = Layout;
import { useDispatch, useSelector } from "react-redux";

const SideBar = ({ collapsed, itemMenu }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loginReducer.loading);
  const error = useSelector((state) => state.loginReducer.error);
  const data = useSelector((state) => state.loginReducer.data);

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const confirmLogout = () => {
    axios.get("http://localhost:3000/api/logout", {
      headers: { Authorization: "Bearer " + data.token },
    });
    navigate("/login");
    hideLogoutModal();
  };
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <div className="flex flex-col justify-center items-center my-6">
            <Avatar
              size={collapsed ? 50 : 100}
              src="https://image-us.24h.com.vn/upload/3-2023/images/2023-09-12/q--2--1694514524-739-width641height960.jpg"
            />
            {collapsed ? null : (
              <Typography className="text-white text-xl mt-2">Admin</Typography>
            )}
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={itemMenu}
          />
        </div>
        <button
          onClick={showLogoutModal}
          className={`flex ${
            collapsed ? `justify-center` : `justify-start`
          } items-center px-6 py-2.5 mb-5 rounded-xl logout-button`}
        >
          <LogoutOutlined className="text-gray-100" />
          {collapsed ? null : (
            <span className="text-gray-100 ml-3">Logout</span>
          )}
        </button>
        <Modal
          title="Confirm Logout"
          open={logoutModalVisible}
          onOk={confirmLogout}
          onCancel={hideLogoutModal}
          okText="Logout"
          cancelText="Cancel"
          okButtonProps={{ style: { background: "red" } }}
        >
          Are you sure you want to logout?
        </Modal>
      </Sider>
    </>
  );
};

export default SideBar;
