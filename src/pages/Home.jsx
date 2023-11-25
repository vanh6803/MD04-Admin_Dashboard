import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./home.css";
import Cookies from "js-cookie";

const Home = () => {
  const token = Cookies.get("token");
  return (
    <>
      <div>{token}</div>
    </>
  );
};

export default Home;
