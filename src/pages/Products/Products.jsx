import React, { useEffect } from "react";
import { Button, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../redux/actions/Product";

const Products = () => {
  const loading = useSelector((state) => state.productReducer.loading);
  const data = useSelector((state) => state.productReducer.data);
  const error = useSelector((state) => state.productReducer.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductRequest());
    console.log("data: ", data?.result);
  }, [dispatch]);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} className="w-24" />,
    },
    {
      title: "Giá",
      dataIndex: "minPrice",
      key: "price",
      render: (text) => <Typography>{text}</Typography>,
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

  return (
    <div>
      <Table
        rowKey="index"
        dataSource={data ? data.result : data}
        columns={columns}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default Products;
