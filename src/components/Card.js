import React, { useState, useEffect, useCallback } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";

const Card = ({
  id,
  handleBookmark,
  name,
  symbol,
  current_price,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  total_volume,
  currency,
  isBookmark,
}) => {
  const [activeIcon, setActiveIcon] = useState(false);

  const history = useHistory();

  const handleChangePercentage = (e) => {
    const parsedNumber = Number(Number(e).toFixed(1));

    if (parsedNumber > 0) {
      return parsedNumber;
    } else if (parsedNumber < 0) {
      return parsedNumber;
    } else {
      return 0;
    }
  };

  const handlePrice = (e) => {
    if (currency === "krw") {
      return `₩${e?.toLocaleString()}`;
    } else {
      return `$${e?.toLocaleString()}`;
    }
  };

  const handleCapital = (e) => {
    return e.toUpperCase();
  };

  const goToDetail = () => {
    history.push(`/detail/?id=${id}`);
  };

  useEffect(() => {
    const bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    if (bookmarkList?.some((bookmarkEach) => id === bookmarkEach.id)) {
      setActiveIcon(true);
    } else {
      setActiveIcon(false);
    }
  }, [isBookmark]);

  return (
    <CardContainer>
      <BookmarkIcon>
        <Icon
          src={
            activeIcon
              ? "https://www.korbit.co.kr/images/resources/trades/star.png"
              : "https://www.korbit.co.kr/images/resources/trades/unfilled-star.png"
          }
          onClick={() => handleBookmark(id, setActiveIcon)}
        ></Icon>
      </BookmarkIcon>
      <CoinTitle>
        <Name onClick={goToDetail}>{name}</Name>
      </CoinTitle>
      <td>
        <Symbol>{handleCapital(symbol)}</Symbol>
      </td>
      <CurrentPrice>{handlePrice(current_price)}</CurrentPrice>
      <Per1H>{`${handleChangePercentage(
        price_change_percentage_1h_in_currency
      )}%`}</Per1H>
      <PerDay>{`${handleChangePercentage(
        price_change_percentage_24h_in_currency
      )}%`}</PerDay>
      <PerWeek>{`${handleChangePercentage(
        price_change_percentage_7d_in_currency
      )}%`}</PerWeek>
      <VolumePerDay>{handlePrice(total_volume)}</VolumePerDay>
    </CardContainer>
  );
};

export default withRouter(Card);

const CardContainer = styled.tr`
  height: 50px;
  border-bottom: 1px solid #ecf0f1;
  td {
    vertical-align: middle;
  }
`;

const BookmarkIcon = styled.td`
  text-align: center;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const CoinTitle = styled.td``;

const Name = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

const Symbol = styled.div``;

const CurrentPrice = styled.td`
  font-weight: bold;
  text-align: right;
`;

const Per1H = styled.td`
  text-align: right;
`;

const PerDay = styled.td`
  text-align: right;
`;

const PerWeek = styled.td`
  text-align: right;
`;

const VolumePerDay = styled.td`
  font-weight: bold;
  text-align: right;
  padding-right: 30px;
`;
