import { Avatar, Button, Flex, FloatButton, Modal, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/24/solid";

const Category = () => {
  const data = useSelector((state) => state.categoryReducer.data);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: "Tên loại sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <Avatar src={image} size={50} />,
    },
    {
      title: "",
      key: "action",
      render: () => {
        return (
          <div className="flex flex-row justify-around items-center">
            <Button onClick={() => {}}>Sửa</Button>
            <Button
              danger
              onClick={() => {
                Modal.confirm({
                  title: "Bạn muốn xóa loại sản phẩm?",
                  okButtonProps: {
                    style: {
                      backgroundColor: "#407cff",
                    },
                  },
                });
              }}
            >
              xóa
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-end mb-5">
        <Button type="primary" className="bg-[#407cff] px-10">
          Add
        </Button>
      </div>
      <Table columns={columns} dataSource={data?.data} bordered />
    </div>
  );
};

export default Category;
