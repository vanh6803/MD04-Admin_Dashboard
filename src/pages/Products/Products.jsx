import React, { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tooltip,
  Typography,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../redux/actions/Product";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchProductDetailRequest } from "../../redux/actions/DetailProduct";
import Cookies from "js-cookie";
import ProductDetail from "./ProductDetail";
import { useForm } from "antd/es/form/Form";
const { Title } = Typography;
const { confirm } = Modal;

const Products = () => {
  const token = Cookies.get("token");
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
  const [selectedProduct, setSelectedProduct] = useState();
  const [openDialogSendEmail, setOpenDialogSendEmail] = useState(false);

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
      render: (text, record) => (
        <button
          onClick={() => {
            navigate(`/products/${record._id}`);
            setOpenDialog(true);
          }}
        >
          <Typography>{text}</Typography>
        </button>
      ),
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
      render: (text) => <img src={text} className="w-20" />,
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
      render: (active, record) => (
        <button
          onClick={() => {
            confirm({
              title: "Bạn muốn thay đổi trạng thái của sản phẩm này?",
              onOk: () => {
                axios
                  .put(
                    `${
                      import.meta.env.VITE_BASE_URL
                    }products/change-active-product/${record._id}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((response) => {
                    dispatch(fetchProductRequest());
                    notification.success({
                      message: "Thành công",
                      description: "Chuyển trạng thái thành công!",
                      duration: 3,
                      type: "success",
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    notification.error({
                      error: "Thất Bại",
                      description: "Chuyển trạng thái thất bại!",
                      duration: 3,
                      type: "error",
                    });
                  });
              },
              okButtonProps: {
                style: {
                  backgroundColor: "#407cff",
                },
              },
            });
          }}
          className={`${
            active ? `bg-green-500  ` : `bg-red-500`
          } rounded-lg px-3 py-2 text-white`}
        >
          {active ? "Kích hoạt" : "Chưa kích hoạt"}
        </button>
      ),
    },
    {
      title: "",
      key: "sendEmail",
      render: (record) => (
        <Button
          disabled={record.active ? true : false}
          onClick={() => {
            setOpenDialogSendEmail(true);
            setSelectedProduct(record);
          }}
        >
          Gửi mail
        </Button>
      ),
    },
    {
      title: "",
      key: "action",
      render: (record) => {
        return (
          <Button
            disabled={record.active ? true : false}
            danger
            onClick={() => {
              Modal.confirm({
                title: "Xóa sản phẩm",
                content: `Bạn muốn xóa sản phẩm ${record.name} của cửa hàng ${record.store_id.name}?`,
                okButtonProps: {
                  style: {
                    backgroundColor: "#407cff",
                  },
                },
                onOk: () => {
                  axios
                    .delete(
                      `${
                        import.meta.env.VITE_BASE_URL
                      }products/delete-product/${record?._id}`,
                      { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((response) => {
                      notification.success({
                        message: "Thành công",
                        description: "Xóa sản phẩm thành công!",
                        duration: 3,
                        type: "success",
                      });
                      dispatch(fetchProductRequest());
                    })
                    .catch((error) => {
                      console.log(error);
                      notification.error({
                        error: "Thất Bại",
                        description: "Xóa sản phẩm thất bại",
                        duration: 3,
                        type: "error",
                      });
                    });
                },
              });
            }}
          >
            Xóa
          </Button>
        );
      },
    },
  ];
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
        rowKey={(record) => record._id}
      />
      <DialogSendEmail
        open={openDialogSendEmail}
        onCancel={() => {
          setOpenDialogSendEmail(false);
        }}
        data={selectedProduct}
      />
    </div>
  );
};

export default Products;

const DialogSendEmail = ({ open, onCancel, data }) => {
  const [formRef] = Form.useForm();
  const token = Cookies.get("token");
  const handleFinish = (value) => {
    const { content } = value;
    const dataSend = {
      productId: data._id,
      storeId: data.store_id._id,
      content,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}products/send-email`, dataSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        notification.success({
          message: "Thành công",
          description: "Gửi email thành công!",
          duration: 3,
          type: "success",
        });
        formRef.resetFields();
        onCancel();
      })
      .catch((error) => {
        notification.error({
          error: "Thất Bại",
          description: "Gửi email thất bại",
          duration: 3,
          type: "error",
        });
      });
  };
  const handleCancel = () => {
    formRef.resetFields();
    onCancel();
  };
  return (
    <Modal open={open} footer={null} onCancel={onCancel} closeIcon={false}>
      <Flex vertical justify="center">
        <Typography.Title level={3} className="self-center">
          Gửi email cảnh báo
        </Typography.Title>
        <Form
          form={formRef}
          layout="vertical"
          size="middle"
          onFinish={handleFinish}
        >
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Please input your content email!" },
            ]}
          >
            <Input.TextArea placeholder="nội dung email" rows={6} />
          </Form.Item>
          <div className="flex flex-row items-center justify-between ">
            <Form.Item>
              <Button
                htmlType="button"
                className="w-[230px]"
                onClick={handleCancel}
              >
                Hủy
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-[#407cff] px-10 w-[230px]"
              >
                Gửi
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Flex>
    </Modal>
  );
};
