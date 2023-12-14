import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./home.css";
import Cookies from "js-cookie";
import { Card, Col, Flex, Row, Statistic } from "antd";
import CountUp from "react-countup";

const formatter = (value) => <CountUp end={value} separator="," />;
const Home = () => {
  const token = Cookies.get("token");

  const dataUser = useSelector((state) => state.customerReducer.data);
  const dataStore = useSelector((state) => state.storeReducer.data);
  const dataProduct = useSelector((state) => state.productReducer.data);

  return (
    <div>
      <Flex vertical={false}>
        <Card bordered size="default" className="shadow-md  m-3">
          <Statistic
            title="Người dùng kích hoạt"
            value={dataUser ? dataUser?.result.length : 0}
            formatter={formatter}
          />
        </Card>
        <Card bordered size="default" className="shadow-md m-3">
          <Statistic
            title="Cửa hàng kích hoạt"
            value={dataStore ? dataStore?.data.length : 0}
            formatter={formatter}
          />
        </Card>
        <Card bordered size="default" className="shadow-md  m-3">
          <Statistic
            title="Sản phẩm hiện có"
            value={dataProduct ? dataProduct?.result.length : 0}
            formatter={formatter}
          />
        </Card>
      </Flex>
      <div>
        <Row>
          <Col span={12} className="">
            <Card>
              
            </Card>
          </Col>
          <Col span={12} className=""></Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
