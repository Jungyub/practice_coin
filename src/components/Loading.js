import React from "react";
import styled from "styled-components";
import Loader from "../images/loading_icon.gif";

const Loading = () => {
  return (
    <Spin>
      <img src={Loader} alt={"spin"} />
    </Spin>
  );
};

export default Loading;

const Spin = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    @media all and (max-width: 1024px) {
      width: 40px;
      height: 40px;
    }
  }
`;
