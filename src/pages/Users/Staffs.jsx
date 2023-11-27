import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerRequest } from "../../redux/actions/Customer";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
} from "antd";
import Cookies from "js-cookie";

const Staffs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customerReducer.data);
  const loading = useSelector((state) => state.customerReducer.loading);
  const error = useSelector((state) => state.customerReducer.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openDialogAddStaff, setOpenDialogAddStaff] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    dispatch(fetchCustomerRequest(currentPage, pageSize, "staff", token));
  }, [dispatch, currentPage, pageSize]);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <Avatar
          src={
            text
              ? text
              : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
          }
          className=""
        />
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Kích hoạt",
      dataIndex: "active",
      key: "active",
      render: (active) => {
        return (
          <>
            <button
              className={`${
                active ? `bg-green-500  ` : `bg-red-500`
              } rounded-xl w-16 h-7 text-white`}
            >
              {active ? "true" : "false"}
            </button>
          </>
        );
      },
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  return (
    <div>
      <div className="flex flex-row justify-end mb-5">
        <Button
          onClick={() => {
            setOpenDialogAddStaff(true);
          }}
          type="primary"
          className="bg-[#407cff] px-10"
        >
          Add
        </Button>
      </div>
      <Table
        dataSource={data ? data.result : data}
        columns={columns}
        loading={loading}
        bordered
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data ? data.totalPages : 0,
        }}
        onChange={handleTableChange}
        rowKey={(record) => record._id}
      />
      <DialogAddStaff
        visible={openDialogAddStaff}
        onCancel={() => {
          setOpenDialogAddStaff(false);
        }}
      />
    </div>
  );
};

const DialogAddStaff = ({ visible, onCancel }) => {
  return (
    <Modal open={visible} footer={null} onCancel={onCancel}>
      <Flex className="bg-white" vertical>
        <p className="text-xl font-bold self-center my-5">Add Staff</p>
        <Form layout="vertical" size="middle">
          <Form.Item name="email" label="Email">
            <Input placeholder="enter email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password placeholder="enter password" />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm password">
            <Input.Password placeholder="enter confirm password" />
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

export default Staffs;
