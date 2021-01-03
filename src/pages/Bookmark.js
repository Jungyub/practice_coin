import React, { useState, useEffect, useCallback } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import url from "../config";
import Card from "../components/Card";

const Bookmark = () => {
  const [bookmark, setBookmark] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setBookmark(JSON.parse(localStorage.getItem("bookmark")));
  }, []);

  const goToMain = () => {
    history.push("/");
  };

  const handleBookmark = useCallback(
    (id) => {
      const selectedCoins = [...bookmark];
      if (selectedCoins.some((selectedCoin) => id === selectedCoin.id)) {
        selectedCoins.splice(
          selectedCoins.map((selectedCoin) => selectedCoin.id).indexOf(id),
          1
        );
      }
      setBookmark(selectedCoins);
      localStorage.setItem("bookmark", JSON.stringify(selectedCoins));
    },
    [bookmark]
  );

  return (
    <BookmarkContainer>
      <TitleWrapper>
        <ListTitle onClick={goToMain}>{"가상자산 시세 목록"}</ListTitle>
        <BookmarkTitle>{"북마크 목록"}</BookmarkTitle>
      </TitleWrapper>
      <TableWrapper>
        <thead>
          <tr>
            <IconHeader></IconHeader>
            <NameHeader>자산</NameHeader>
            <SymbolHeader></SymbolHeader>
            <PriceHeader>Price</PriceHeader>
            <Per1H>1H</Per1H>
            <PerDay>24H</PerDay>
            <PerWeek>7D</PerWeek>
            <VolumePerDay>24H Volume</VolumePerDay>
          </tr>
        </thead>
        <tbody>
          {localStorage.getItem("bookmark") &&
            JSON.parse(localStorage.getItem("bookmark")).map((list, idx) => {
              return (
                <Card
                  key={idx}
                  id={list.id}
                  handleBookmark={handleBookmark}
                  name={list.name}
                  symbol={list.symbol}
                  current_price={list.current_price}
                  price_change_percentage_1h_in_currency={
                    list.price_change_percentage_1h_in_currency
                  }
                  price_change_percentage_7d_in_currency={
                    list.price_change_percentage_7d_in_currency
                  }
                  price_change_percentage_24h_in_currency={
                    list.price_change_percentage_24h_in_currency
                  }
                  total_volume={list.total_volume}
                />
              );
            })}
        </tbody>
      </TableWrapper>
    </BookmarkContainer>
  );
};

export default withRouter(Bookmark);

const BookmarkContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 61px;
  font-weight: bold;
`;

const ListTitle = styled.div`
  width: 500px;
  height: 50px;
  background-color: #dfe4ea;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4b4b4b;
  cursor: pointer;
`;

const BookmarkTitle = styled.div`
  width: 500px;
  height: 50px;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  cursor: pointer;
`;

const TableWrapper = styled.table`
  width: 100%;

  thead {
    background-color: #f1f2f6;

    tr {
      height: 25px;
      font-size: 13px;
      color: #4b4b4b;
      th {
        vertical-align: middle;
      }
    }
  }
`;

const IconHeader = styled.th`
  width: 30px;
`;

const NameHeader = styled.th`
  width: 170px;
  text-align: left;
`;

const SymbolHeader = styled.th`
  width: 100px;
`;

const PriceHeader = styled.th`
  width: 100px;
  text-align: right;
`;

const Per1H = styled.th`
  width: 150px;
  text-align: right;
`;

const PerDay = styled.th`
  width: 100px;
  text-align: right;
`;

const PerWeek = styled.th`
  width: 100px;
  text-align: right;
`;

const VolumePerDay = styled.th`
  text-align: right;
  padding-right: 30px;
`;
