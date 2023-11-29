import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Pagination, Table } from "antd";
import Cookies from "js-cookie";

const Store = () => {
  const data = useSelector((state) => state.storeReducer.data);
  const loading = useSelector((state) => state.storeReducer.loading);
  const error = useSelector((state) => state.storeReducer.error);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh đại diện",
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
      title: "Ảnh bìa",
      dataIndex: "banner",
      key: "banner",
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kích hoạt",
      dataIndex: "is_active",
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

  return (
    <div>
      <Table
        dataSource={data ? data.data : data}
        columns={columns}
        loading={loading}
        bordered
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default Store;
