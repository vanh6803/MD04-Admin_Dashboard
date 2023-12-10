import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  theme,
  Badge,
  Dropdown,
  Modal,
  Form,
  Input,
  Typography,
  DatePicker,
  Space,
  Flex,
  notification,
} from "antd";
const { Header } = Layout;
import { UserIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchMyProfileRequest } from "./../redux/actions/MyProfile";
import Cookies from "js-cookie";
import moment from "moment";

const HeaderBar = ({ toggleMenu, collapsed }) => {
  const [count, setCount] = useState(0);
  const [openDialogChangePassword, setOpenDialogChangePassword] =
    useState(false);
  const [openDialogChangeProfile, setOpenDialogChangeProfile] = useState(false);
  const myProfile = useSelector((state) => state.myProfileReducer.data);

  const itemsUser = [
    {
      label: "Đổi mật khẩu",
      key: "0",
    },
    {
      label: "Chỉnh sửa profile",
      key: "1",
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickDropdown = (e) => {
    switch (e.key) {
      case "0":
        return setOpenDialogChangePassword(true);
      case "1":
        return setOpenDialogChangeProfile(true);
    }
  };

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
          <Dropdown
            menu={{ items: itemsUser, onClick: handleClickDropdown }}
            arrow={{
              pointAtCenter: true,
            }}
            trigger={["click"]}
          >
            <Button
              onClick={(e) => e.preventDefault()}
              icon={<UserIcon className="h-5 w-5" />}
            />
          </Dropdown>
        </div>
        <DialogChangeProfile
          visible={openDialogChangeProfile}
          data={myProfile}
          onCancel={() => {
            setOpenDialogChangeProfile(false);
          }}
        />
        <DialogChangePassword
          visible={openDialogChangePassword}
          onCancel={() => {
            setOpenDialogChangePassword(false);
          }}
        />
      </Header>
    </>
  );
};

const DialogChangeProfile = ({ visible, data, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dateFormat = "DD/MM/YYYY";
  const token = Cookies.get("token");

  const handleFinish = (values) => {
    console.log("Form values:", values);

    const { username, birthday, full_name } = values;

    const formattedBirthday = moment(birthday);

    axios
      .put(
        `${import.meta.env.VITE_BASE_URL}user/edit-profile/${data?.data._id}`,
        {
          username: username,
          full_name: full_name,
          birthday: formattedBirthday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(fetchMyProfileRequest(data?.data._id, token));
        notification.success({
          message: "Thành công",
          description: "Cập nhật thông tin cá nhân thành công!",
          duration: 3,
          type: "success",
        });
        form.resetFields();
        onCancel();
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          error: "Thất Bại",
          description: "Cập nhật thông tin cá nhân thất bại!",
          duration: 3,
          type: "error",
        });
      });
  };

  return (
    <Modal open={visible} footer={null} onCancel={onCancel}>
      <Flex className="bg-white" vertical>
        <p className="text-xl font-bold self-center my-5">
          Chỉnh sửa thông tin cá nhân
        </p>
        <Form
          form={form}
          layout="vertical"
          size="middle"
          onFinish={handleFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            initialValue={data?.data?.email}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            initialValue={data?.data?.username}
          >
            <Input placeholder="enter your username" />
          </Form.Item>
          <Form.Item
            name="full_name"
            label="Full Name"
            initialValue={data?.data?.full_name}
          >
            <Input placeholder="enter your full name" />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Birthday"
            initialValue={
              data?.data?.birthday ? moment(data?.data?.birthday) : null
            }
          >
            <DatePicker
              format={dateFormat}
              className="w-full"
              placeholder="select birthday"
              showToday
              picker="date"
            />
          </Form.Item>

          <div className="flex flex-row items-center justify-between ">
            <Form.Item>
              <Button htmlType="reset" className="w-[230px]">
                Clear
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-[#407cff] px-10 w-[230px]"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Flex>
    </Modal>
  );
};

const DialogChangePassword = ({ visible, onCancel }) => {
  const handleFinish = (value) => {};

  return (
    <Modal open={visible} footer={null} onCancel={onCancel}>
      <Flex vertical>
        <p className="text-xl font-bold self-center my-5">Change Password</p>
        <Form layout="vertical">
          <Form.Item
            label="Old password"
            name={"oldPassword"}
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New password"
            name={"newPassword"}
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name={"confitmPassword"}
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match.")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex flex-row items-center justify-between">
            <Form.Item>
              <Button htmlType="reset" className="w-[230px]">
                Clear
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-[#407cff] px-10 w-[230px]"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Flex>
    </Modal>
  );
};

export default HeaderBar;
