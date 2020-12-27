import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import url from "../config";

const Main = () => {
  // const [resultArr, setResultArr] = useState([]);

  // useEffect(() => {
  //   setInterval(() => getData(), 30000);
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //   const stats = await fetch(
  //     `${proxyUrl}${url}/trading-pairs/stats`
  //   ).then((res) => res.json());

  //   const pairs = await fetch(`${proxyUrl}${url}/trading-pairs`).then((res) =>
  //     res.json()
  //   );

  //   const assets = await fetch(`${proxyUrl}${url}/assets`).then((res) =>
  //     res.json()
  //   );

  //   let results = [];

  //   for (let i = 0; i < stats.length; i++) {
  //     results.push({
  //       ...stats[i],
  //       ...pairs.find((pair) => pair.name === stats[i].name),
  //       ...assets.find((asset) => asset.id === pairs[i].baseAsset),
  //     });
  //   }
  //   setResultArr(results);
  // };

  return <MainContainer>123</MainContainer>;
};

export default withRouter(Main);

const MainContainer = styled.div``;
