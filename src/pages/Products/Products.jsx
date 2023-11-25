import React, { useEffect, useState } from "react";
import { Button, Carousel, Flex, Modal, Table, Typography } from "antd";
const { Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../redux/actions/Product";
import axios from "axios";

const Products = () => {
  const loading = useSelector((state) => state.productReducer.loading);
  const data = useSelector((state) => state.productReducer.data);
  const error = useSelector((state) => state.productReducer.error);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(fetchProductRequest());
    console.log("data: ", data?.result);
  }, [dispatch]);

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

  const onRow = (record) => {
    return {
      onClick: () => {
        console.log(record._id); // Assuming there is an 'id' property in your data
        setSelected(record._id);
        setOpenDialog(true);
      },
    };
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  return (
    <div>
      <Table
        dataSource={data ? data.result : data}
        columns={columns}
        loading={loading}
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
      <DialogDetailProduct
        visible={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        productId={selected}
      />
    </div>
  );
};

const DialogDetailProduct = ({ visible, onClose, productId }) => {
  const [data, setData] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}products/detail-product/${productId}`
      )
      .then((response) => {
        console.log("product detail: ", response.data);
        setData(response.data.result);
      }).the;
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={false}
      closeIcon={false}
      width={"60%"}
    >
      <Flex vertical>
        <Title level={3}>{data?.name}</Title>
        <div>
          {data?.image.map((image, index) => (
            <div key={index}>
              <img src={image} />
            </div>
          ))}
        </div>
      </Flex>
    </Modal>
  );
};

export default Products;
