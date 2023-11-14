import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const data = useSelector((state) => state.authReducer.data);
  return (
    <>
      <div>{data?.token}</div>
      
    </>
  );
};

export default Home;
