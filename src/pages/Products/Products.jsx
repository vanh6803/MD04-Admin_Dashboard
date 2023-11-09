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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} className="w-40" />,
    },
    {
      title: "Price",
      dataIndex: "minPrice",
      key: "price",
      render: (text) => <Typography>{text}</Typography>,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => {
        return (
          <>
            <button>{active ? "true" : "false"}</button>
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
      />
    </div>
  );
};

export default Products;
