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

  // return (
  //   <MainContainer>
  //     <MainWrap>
  //       <TableContainer>
  //         <TableWrap>
  //           <thead>
  //             <tr>
  //               <th>이름</th>
  //               <th>현재가</th>
  //               <th>변동</th>
  //               <th>최고가</th>
  //               <th>최저가</th>
  //               <th>거래대금</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {resultArr &&
  //               resultArr.map((result, idx) => (
  //                 <Card
  //                   key={idx}
  //                   name={result.name}
  //                   baseAsset={result.baseAsset}
  //                   quoteAsset={result.quoteAsset}
  //                   open={result.open}
  //                   close={result.close}
  //                   high={result.high}
  //                   low={result.low}
  //                   volume={result.volume}
  //                 />
  //               ))}
  //           </tbody>
  //         </TableWrap>
  //       </TableContainer>
  //     </MainWrap>
  //   </MainContainer>
  // );

  return (
    <MainContainer>
      <TitleWrap>
        <ListTitle>{"가상자산 시세 목록"}</ListTitle>
        <BookmarkTitle>{"북마크 목록"}</BookmarkTitle>
      </TitleWrap>
    </MainContainer>
  );
};

export default withRouter(Main);

const MainContainer = styled.div``;

const TitleWrap = styled.div`
  display: flex;
  font-size: 20px;
`;

const ListTitle = styled.div``;

const BookmarkTitle = styled.div``;
