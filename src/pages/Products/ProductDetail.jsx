import { Col, Flex, Layout, Row, Typography, Badge } from "antd";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}products/detail-product/${id}`)
        .then((resonse) => {
          setData(resonse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide > 0 ? prevSlide - 1 : data?.result.image.length - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide < data?.result.image.length - 1 ? prevSlide + 1 : 0
    );
  };

  return (
    <Layout>
      <Header className="flex flex-row bg-slate-50 shadow-lg justify-between items-center fixed w-full top-0 z-10">
        <div className="flex flex-row items-center">
          <ArrowLeftIcon
            className="w-8 h-8 mr-5"
            onClick={() => {
              navigate("/products");
            }}
          />
          <Typography className="text-lg font-semibold">
            {data?.result.name}
          </Typography>
        </div>
        <div className="">
          <button
            className={`flex justify-center items-center ${
              data?.result.is_active ? `bg-green-500  ` : `bg-red-500`
            } rounded-xl text-white w-20 h-10`}
          >
            {data?.result.is_active ? "Active" : "Inactive"}
          </button>
        </div>
      </Header>
      <Content className="p-10 bg-white">
        <div>
          <Row className=" mt-10">
            {/* TODO: slide show */}
            <Col
              span={12}
              className="relative flex flex-col justify-center items-center"
            >
              <div className="bg-white w-[70%] p-1 flex justify-center border rounded-3xl relative shadow-lg">
                {data?.result.image.length > 0 && (
                  <div>
                    <img
                      src={data?.result.image[currentSlide]}
                      alt={`slide-${currentSlide}`}
                      className=" object-cover"
                    />
                  </div>
                )}
                <div
                  className="flex absolute top-[40%] bottom-0 left-3 cursor-pointer bg-[rgba(120,120,120,0.4)] w-12 h-12 justify-center items-center rounded-full transform"
                  onClick={handlePrevSlide}
                >
                  <ChevronLeftIcon className="w-7" />
                </div>

                <div
                  className="flex absolute top-[40%] bottom-0 right-3 cursor-pointer bg-[rgba(120,120,120,0.4)] w-12 h-12 justify-center items-center rounded-full transform"
                  onClick={handleNextSlide}
                >
                  <ChevronRightIcon className="w-7" />
                </div>
              </div>
              <div className="flex flex-row mt-5 ">
                {data?.result.image.map((image, index) => (
                  <div
                    key={index}
                    className={`bg-white m-1 rounded-lg overflow-hidden shadow-md ${
                      index === currentSlide ? "border border-black" : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <img src={image} className=" w-16 object-cover" />
                  </div>
                ))}
              </div>
            </Col>
            {/* TODO: info option */}
            <Col span={12} className="">
              <div className="flex justify-between items-center">
                <Title level={3}>{data?.result.name}</Title>
                <div className="text-base">
                  {data?.result.discounted ? (
                    <div className="bg-red-500 p-3 text-white rounded-3xl">
                      giảm giá
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-wrap">
                {data?.result.option.map((option, index) => {
                  let discountedPrice = 0;
                  if (option.discount_value) {
                    discountedPrice =
                      option.price * (1 - option.discount_value / 100);
                  }
                  return (
                    <div key={index} className="relative mr-10 mt-10">
                      <Badge.Ribbon
                        text={`giảm ${option.discount_value}%`}
                        color="red"
                      >
                        <div className="flex flex-col flex-wrap border p-5 shadow-md rounded-xl ">
                          <div className={`flex flex-row items-center `}>
                            <img
                              src={option.image}
                              className=" w-16 object-cover"
                            />
                            <div className="pt-2">
                              <Typography className="text-lg font-medium">
                                {option.name_color}
                              </Typography>
                              {option.discount_value ? (
                                <>
                                  <Typography className="text-red-600 text-base line-through">
                                    {option.price
                                      ? `${option.price.toLocaleString(
                                          "vi-VN"
                                        )} VNĐ`
                                      : ""}
                                  </Typography>
                                  {/* tiền sau khi giảm */}
                                  <Typography className="text-red-600 text-base">
                                    {option.price
                                      ? `${discountedPrice.toLocaleString(
                                          "vi-VN"
                                        )} VNĐ`
                                      : ""}
                                  </Typography>
                                </>
                              ) : (
                                <Typography className="text-red-600 text-base">
                                  {option.price
                                    ? `${option.price.toLocaleString(
                                        "vi-VN"
                                      )} VNĐ`
                                    : ""}
                                </Typography>
                              )}
                            </div>
                          </div>
                          <Typography className="text-base">
                            Số lượng: {option.quantity}
                          </Typography>
                        </div>
                      </Badge.Ribbon>
                      {option.hot_option ? (
                        <img
                          src="/hot.png"
                          className="absolute w-10 -top-3 -left-3"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
          <div>
            <div>
              <div className="flex flex-row items-center">
                <Title level={4} className="mr-2" style={{ marginBottom: 0 }}>
                  Nhà Sản xuất:{" "}
                </Title>
                <Paragraph className="text-lg" style={{ marginBottom: 0 }}>
                  {" "}
                  {data?.result.manufacturer}
                </Paragraph>
              </div>
              <div className="flex flex-row items-center ">
                <Title level={4} className="mr-2" style={{ marginBottom: 0 }}>
                  Loại sản phẩm:{" "}
                </Title>
                <Paragraph className="text-lg" style={{ marginBottom: 0 }}>
                  {data?.result.category_id.name}
                </Paragraph>
              </div>
              <div className="flex flex-row items-center ">
                <Title level={4} className="mr-2" style={{ marginBottom: 0 }}>
                  Cửa hàng:{" "}
                </Title>
                <Paragraph className="text-lg" style={{ marginBottom: 0 }}>
                  {data?.result.store_id.name}
                </Paragraph>
              </div>
              <Title level={4}>Mô tả:</Title>
              <Paragraph>{data?.result.description}</Paragraph>
            </div>
            <hr />
            <Row>
              {/* TODO: */}
              <Col span={12}></Col>
              {/* TODO: thông số kỹ thuật */}
              <Col span={12}>
                <div>
                  <Title level={4}>Thông số kỹ thuật:</Title>
                  <div className="border rounded-xl shadow-xl">
                    {data?.result.screen ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Màn hình</Title>
                        </Col>
                        <Col span={20}>{data?.result.screen}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.camera ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Máy ảnh</Title>
                        </Col>
                        <Col span={20}>{data?.result.camera}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.chipset ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Chipset</Title>
                        </Col>
                        <Col span={20}>{data?.result.chipset}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.cpu ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>CPU</Title>
                        </Col>
                        <Col span={20}>{data?.result.cpu}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.gpu ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>GPU</Title>
                        </Col>
                        <Col span={20}>{data?.result.gpu}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.ram ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Ram</Title>
                        </Col>
                        <Col span={20}>{data?.result.ram} Gb</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.rom ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Rom</Title>
                        </Col>
                        <Col span={20}>{data?.result.rom} GB</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.operatingSystem ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Hệ điều hành</Title>
                        </Col>
                        <Col span={20}>{data?.result.operatingSystem}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.battery ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Pin</Title>
                        </Col>
                        <Col span={20}>{data?.result.battery}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.weight ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Trọng lượng</Title>
                        </Col>
                        <Col span={20}>{data?.result.weight} g</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.connection ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Kết nối</Title>
                        </Col>
                        <Col span={20}>{data?.result.connection}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.specialFeature ? (
                      <Row className="p-5">
                        <Col span={4} className="pr-3">
                          <Title level={5}>Tính năng đặc biệt</Title>
                        </Col>
                        <Col span={20}>{data?.result.specialFeature}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <hr />
                    {data?.result.other ? (
                      <Row className="p-5">
                        <Col span={4}>
                          <Title level={5}>Khác</Title>
                        </Col>
                        <Col span={20}>{data?.result.other}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ProductDetail;
