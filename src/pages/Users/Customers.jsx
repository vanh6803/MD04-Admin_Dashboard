import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerRequest } from "../../redux/actions/Customer";
import { Avatar, Pagination, Table } from "antd";

const Customers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customerReducer.data);
  const loading = useSelector((state) => state.customerReducer.loading);
  const error = useSelector((state) => state.customerReducer.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomerRequest(currentPage, pageSize, "customer"));
  }, [dispatch, currentPage, pageSize]);

  const columns = [
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
      render: (active, record) => {
        return (
          <>
            <button
              className={`${
                record.active ? "bg-green-500" : "bg-red-500"
              } rounded-xl w-16 h-7 text-white transition-colors duration-300 ${
                activeButton === record.key ? "active" : ""
              }`}
              onClick={() => handleActivation(record._id)}
            >
              {record.active ? "true" : "false"}
            </button>
          </>
        );
      },
    },
  ];

  const handleActivation = (key) => {
    console.log(key);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div>
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
    </div>
  );
};

export default Customers;
