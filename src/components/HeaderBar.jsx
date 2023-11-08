import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Badge, Dropdown } from "antd";
const { Header } = Layout;
import { UserIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import ButtonSelected from "./ButtonSelected";

const itemsUser = [
  {
    label: "Change password",
    key: "0",
  },
  {
    label: "Edit profile",
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const HeaderBar = ({ toggleMenu, collapsed }) => {
  const [count, setCount] = useState(0);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleMenu}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="mx-10 flex items-center">
          {/* <Button icon={<SunIcon className="h-6 w-6" />} className="mr-5" /> */}
          <Badge count={count} className="mr-5" overflowCount={99}>
            <Button
              icon={<BellIcon className="h-5 w-5" />}
              onClick={() => {
                setCount(count + 1);
              }}
            />
          </Badge>

          <ButtonSelected
            items={itemsUser}
            icon={<UserIcon className="h-5 w-5" />}
          />
        </div>
      </Header>
    </>
  );
};

export default HeaderBar;
