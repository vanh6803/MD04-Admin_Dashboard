import React, { useEffect, useState } from "react";
import { Button, Carousel, Flex, Modal, Select, Table, Typography } from "antd";
const { Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../redux/actions/Product";
import { useNavigate } from "react-router-dom";
import { fetchCategoryRequest } from "../../redux/actions/Category";

const Products = () => {
  const loadingProduct = useSelector((state) => state.productReducer.loading);
  const dataProduct = useSelector((state) => state.productReducer.data);
  const errorProduct = useSelector((state) => state.productReducer.error);

  const loadingCategory = useSelector((state) => state.categoryReducer.loading);
  const dataCategory = useSelector((state) => state.categoryReducer.data);
  const errorCategory = useSelector((state) => state.categoryReducer.error);

  const loadingStore = useSelector((state) => state.storeReducer.loading);
  const dataStore = useSelector((state) => state.storeReducer.data);
  const errorStore = useSelector((state) => state.storeReducer.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  // useEffect(() => {
  //   dispatch(fetchProductRequest());
  // }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography>{text}</Typography>,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category_id",
      key: "category_id",
      render: (category) => <Typography>{category.name}</Typography>,
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
      render: (text) => (
        <Typography>{text ? text.toLocaleString("vi-VN") : ""}</Typography>
      ),
    },
    {
      title: "Cửa hàng",
      dataIndex: "store_id",
      key: "store_id",
      render: (store) => <Typography>{store.name}</Typography>,
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

  const onRow = (record) => {
    return {
      onClick: () => {
        if (record) {
          setSelected(record._id);
          // setOpenDialog(true);
          navigate(`/product/${record._id}`);
        }
      },
    };
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <div>
      <div className="flex justify-end my-3">
        <Select
          showSearch
          style={{
            width: 300,
          }}
          allowClear
          size="middle"
          className=""
          placeholder="Search to select store"
          onChange={(value) => {
            console.log(value);
            setSelectedStore(value);
            dispatch(fetchProductRequest(selectedCategory, value));
          }}
          filterOption={(input, option) =>
            removeAccents(option?.label.toLowerCase() ?? "").includes(
              removeAccents(input.toLowerCase())
            )
          }
          options={
            dataStore
              ? dataStore?.data.map((category) => ({
                  label: category.name,
                  value: category._id,
                }))
              : null
          }
          loading={loadingCategory}
        />
        {/* select category */}
        <Select
          showSearch
          style={{
            width: 300,
            marginLeft: 10,
          }}
          allowClear
          size="middle"
          placeholder="Search to select category"
          onChange={(value) => {
            console.log(value);
            setSelectedCategory(value);
            dispatch(fetchProductRequest(value, selectedStore));
          }}
          filterOption={(input, option) =>
            removeAccents(option?.label.toLowerCase() ?? "").includes(
              removeAccents(input.toLowerCase())
            )
          }
          options={
            dataCategory
              ? dataCategory?.data.map((category) => ({
                  label: category.name,
                  value: category._id,
                }))
              : null
          }
          loading={loadingStore}
        />
      </div>
      <Table
        dataSource={dataProduct ? dataProduct.result : dataProduct}
        columns={columns}
        loading={loadingProduct}
        bordered
        // pagination={{
        //   current: page,
        //   pageSize: limit,
        //   total: data ? data.totalPages : 0,
        // }}
        // onChange={handleTableChange}
        onRow={onRow}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default Products;
