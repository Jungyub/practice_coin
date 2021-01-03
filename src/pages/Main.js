import React, { useState, useEffect, useCallback } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import url from "../config";
import Card from "../components/Card";

const Main = () => {
  const [coinList, setCoinList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [currency, setCurrency] = useState("krw");
  const [isBookmark, setIsBookmark] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getDefaultData();
  }, [perPage, currency]);

  useEffect(() => {
    getData();
  }, [currentPage]);

  const getDefaultData = () => {
    try {
      fetch(`${url}/coins/markets?vs_currency=${currency}&order=market_cap_rank&price_change_percentage=1h,24h,7d&per_page=${perPage}&page=${currentPage}
      `)
        .then((res) => res.json())
        .then((res) => setCoinList(res));
    } catch (error) {
      throw error;
    }
  };

  const getData = useCallback(async () => {
    try {
      const addList = await fetch(
        `${url}/coins/markets?vs_currency=${currency}&order=market_cap_rank&price_change_percentage=1h,24h,7d&per_page=${perPage}&page=${currentPage}`
      ).then((res) => res.json());
      const mergedData = [...coinList, ...addList];
      setCoinList(mergedData);
    } catch (error) {
      throw error;
    }
  }, [currentPage]);

  const handleSelectAll = (e) => {
    const { value } = e.target;
    if (value === "bookmark") {
      setIsBookmark(true);
    } else {
      setIsBookmark(false);
    }
  };

  const handleSelectCurrency = (e) => {
    const { value } = e.target;
    setCurrency(value);
  };

  const handleSelectPagination = async (e) => {
    const { value } = e.target;
    setPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePagination = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBookmark = useCallback(
    (id, setActiveIcon) => {
      const selectedCoins = [...bookmark];
      if (selectedCoins.some((selectedCoin) => id === selectedCoin.id)) {
        selectedCoins.splice(
          selectedCoins.map((selectedCoin) => selectedCoin.id).indexOf(id),
          1
        );
        setActiveIcon(false);
      } else {
        selectedCoins.push(coinList.find((list) => id === list.id));
        setActiveIcon(true);
      }
      setBookmark(selectedCoins);
      localStorage.setItem("bookmark", JSON.stringify(selectedCoins));
    },
    [isBookmark, coinList, bookmark]
  );

  const goToBookmark = () => {
    history.push("/bookmark");
  };

  // console.log(coinList);

  return (
    <MainContainer>
      <TitleWrapper>
        <ListTitle>{"가상자산 시세 목록"}</ListTitle>
        <BookmarkTitle onClick={goToBookmark}>{"북마크 목록"}</BookmarkTitle>
      </TitleWrapper>

      <SelectBoxWrapper>
        <SelectAll onChange={handleSelectAll}>
          <option value="all">전체보기</option>
          <option value="bookmark">북마크보기</option>
        </SelectAll>
        <SelectCurrency onChange={handleSelectCurrency}>
          <option value="krw">KRW 보기</option>
          <option value="usd">USD 보기</option>
        </SelectCurrency>
        <SelectPagination onChange={handleSelectPagination}>
          <option value="50">50개 보기</option>
          <option value="30">30개 보기</option>
          <option value="10">10개 보기</option>
        </SelectPagination>
      </SelectBoxWrapper>
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
          {isBookmark
            ? localStorage.getItem("bookmark") &&
              JSON.parse(localStorage.getItem("bookmark")).map((list, idx) => {
                return (
                  <Card
                    key={idx}
                    id={list.id}
                    isBookmark={isBookmark}
                    currency={currency}
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
              })
            : coinList &&
              coinList.map((list, idx) => {
                return (
                  <Card
                    key={idx}
                    id={list.id}
                    isBookmark={isBookmark}
                    currency={currency}
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
      {!isBookmark && (
        <Pagination onClick={handlePagination}>+ 더보기</Pagination>
      )}
    </MainContainer>
  );
};

export default withRouter(Main);

const MainContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const ListTitle = styled.div`
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

const BookmarkTitle = styled.div`
  width: 500px;
  height: 50px;
  background-color: #dfe4ea;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4b4b4b;
  cursor: pointer;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SelectAll = styled.select`
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
  border: none;
  margin: 20px;
  cursor: pointer;
  /* &:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 15px;
    width: 0;
    height: 0;
    margin-top: -1px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
  } */
`;

const SelectCurrency = styled(SelectAll)``;

const SelectPagination = styled(SelectAll)`
  margin-right: 0px;
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

const Pagination = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  font-size: 15px;
  border-bottom: 1px solid #ecf0f1;
  cursor: pointer;
`;
