import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import url from "../config";
import CompareIcon from "../images/compare_arrows.png";

const Detail = ({ location }) => {
  const [details, setDetails] = useState([]);
  const [currency, setCurrency] = useState("krw");
  const [cryptoValue, setCryptoValue] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [activeIcon, setActiveIcon] = useState(false);

  const getQueryVariable = (variable) => {
    let query = location.search.substring(4);
    return query;
  };

  const parsedQuery = getQueryVariable(location.search);

  const getData = () => {
    try {
      fetch(`${url}/coins/${parsedQuery}
      `)
        .then((res) => res.json())
        .then((res) => {
          setDetails(res);
          console.log(res.market_data.current_price);
          // setCurrencyValue(res.market_data?.current_price.krw);
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getData();
  });

  const handleSelectCurrency = (e) => {
    const { value } = e.target;
    setCurrency(value);
  };

  const handleCurrentPrice = (e) => {
    if (currency === "krw") {
      return `₩${e?.krw.toLocaleString()}`;
    } else {
      return `$${e?.usd.toLocaleString()}`;
    }
  };

  const handleCryptoCurrency = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setCryptoValue(value);
  };

  const handleCurrency = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setCurrencyValue(value);
  };

  // const handleBookmark = () => {
  //   const bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
  //   if (bookmarkList?.some((bookmarkEach) => parsedQuery === bookmarkEach.id)) {
  //     bookmarkList.splice(
  //       bookmarkList
  //         .map((bookmarkEach) => bookmarkEach.id)
  //         .indexOf(parsedQuery),
  //       1
  //     );
  //     setActiveIcon(false);
  //   } else {
  //     bookmarkList?.push(
  //       bookmarkList.find((bookmarkEach) => parsedQuery === bookmarkEach.id)
  //     );
  //     setActiveIcon(true);
  //   }
  //   localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  // };

  // useEffect(() => {
  //   const bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
  //   if (
  //     bookmarkList?.some((bookmarkEach) => parsedQuery === bookmarkEach?.id)
  //   ) {
  //     setActiveIcon(true);
  //   } else {
  //     setActiveIcon(false);
  //   }
  // }, []);
  // console.log(details);

  return (
    <DetailContainer>
      <DetailHeader>
        <CoinTitle>
          <BookmarkIcon>
            <Icon
              src={
                activeIcon
                  ? "https://www.korbit.co.kr/images/resources/trades/star.png"
                  : "https://www.korbit.co.kr/images/resources/trades/unfilled-star.png"
              }
              // onClick={() => handleBookmark(parsedQuery, setActiveIcon)}
            ></Icon>
          </BookmarkIcon>
          <CoinIcon src={details.image?.thumb}></CoinIcon>
          <CoinName>{details.localization?.ko}</CoinName>
          <CoinSymbol>{`(${details.symbol?.toUpperCase()})`}</CoinSymbol>
        </CoinTitle>
        <SelectCurrency onChange={handleSelectCurrency}>
          <option value="krw">KRW 보기</option>
          <option value="usd">USD 보기</option>
        </SelectCurrency>
      </DetailHeader>
      <DetailBody>
        <BodyLeft>
          <MarketCapRankWrapper>
            <MarketCapRankTitle>시가총액 Rank</MarketCapRankTitle>
            <MarketCapRankContent>{`Rank #${details.market_cap_rank}`}</MarketCapRankContent>
          </MarketCapRankWrapper>
          <WebsiteWrapper>
            <WebsiteTitle>웹사이트</WebsiteTitle>
            <WebsiteContent>{details.links?.homepage[0]}</WebsiteContent>
          </WebsiteWrapper>
        </BodyLeft>
        <BodyRight>
          <CoinPriceWrapper>
            <CurrentPriceWrapper>
              <CurrentPrice>
                {handleCurrentPrice(details.market_data?.current_price)}
              </CurrentPrice>
              <CurrnetPercentage>1.2%</CurrnetPercentage>
            </CurrentPriceWrapper>
            <StandardCoinWrapper>
              <StandardCoin>{`1.000000000${details.symbol?.toUpperCase()}`}</StandardCoin>
              <StandardCoinPercentage>0.1%</StandardCoinPercentage>
            </StandardCoinWrapper>
          </CoinPriceWrapper>
          <TotalVolumeWrapper>
            <MarketCapWrapper>
              <MarketCapTitle>시가총액</MarketCapTitle>
              <MarketCapContent>
                {handleCurrentPrice(details.market_data?.market_cap)}
              </MarketCapContent>
            </MarketCapWrapper>
            <TotalVolumePerDayWrapper>
              <TotalVolumePerDayTitle>24시간 거래대금</TotalVolumePerDayTitle>
              <TotalVolumePerDayContent>
                {handleCurrentPrice(details.market_data?.total_volume)}
              </TotalVolumePerDayContent>
            </TotalVolumePerDayWrapper>
          </TotalVolumeWrapper>
        </BodyRight>
      </DetailBody>
      <CalculateContainer>
        <CalcultateTitle>가격계산</CalcultateTitle>
        <CalculateWrapper>
          <CryptoCurrencyWrapper>
            <CryptoCurrencyTitle>
              {details.symbol?.toUpperCase()}
            </CryptoCurrencyTitle>
            <CryptoCurrencyInput
              value={cryptoValue}
              onChange={handleCryptoCurrency}
            ></CryptoCurrencyInput>
          </CryptoCurrencyWrapper>
          <ExchangeIcon src={CompareIcon} alt="compare_icon"></ExchangeIcon>
          <CurrencyWrapper>
            <CurrencyTitle>{currency === "krw" ? "KRW" : "USD"}</CurrencyTitle>
            <CurrencyInput
              value={currencyValue}
              onChange={handleCurrency}
            ></CurrencyInput>
          </CurrencyWrapper>
        </CalculateWrapper>
      </CalculateContainer>
      <DescriptionWrapper>
        <DescriptionTitle>설명보기</DescriptionTitle>
        <DescriptionContent>
          {details.description?.ko
            ? details.description.ko
            : details.description?.en
            ? details.description.en
            : null}
        </DescriptionContent>
      </DescriptionWrapper>
    </DetailContainer>
  );
};

export default withRouter(Detail);

const DetailContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const DetailHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const CoinTitle = styled.div`
  display: flex;
  align-items: center;
`;

const BookmarkIcon = styled.div`
  margin-right: 10px;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const CoinIcon = styled.img`
  margin-right: 10px;
`;

const CoinName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const CoinSymbol = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SelectCurrency = styled.select`
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

const DetailBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const BodyLeft = styled.div`
  font-size: 14px;
`;

const BodyRight = styled.div``;

const MarketCapRankWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid lightgray;
`;

const MarketCapRankTitle = styled.div`
  width: 120px;
  height: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #f1f2f6;
  font-weight: bold;
`;

const MarketCapRankContent = styled.div`
  width: 380px;
  height: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const WebsiteWrapper = styled(MarketCapRankWrapper)`
  border-top: none;
`;

const WebsiteTitle = styled(MarketCapRankTitle)``;

const WebsiteContent = styled(MarketCapRankContent)``;

const CoinPriceWrapper = styled.div``;

const CurrentPriceWrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
`;

const CurrentPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
`;

const CurrnetPercentage = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-weight: bold;
  width: 60px;
`;

const StandardCoinWrapper = styled.div`
  height: 20px;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const StandardCoin = styled.div``;

const StandardCoinPercentage = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 60px;
  padding-right: 3px;
`;

const TotalVolumeWrapper = styled.div`
  display: flex;
  font-size: 14px;
`;

const MarketCapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MarketCapTitle = styled.div``;

const MarketCapContent = styled.div``;

const TotalVolumePerDayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 50px;
`;

const TotalVolumePerDayTitle = styled.div``;

const TotalVolumePerDayContent = styled.div``;

const CalculateContainer = styled.div`
  background-color: #bdc3c7;
  margin-bottom: 30px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CalcultateTitle = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  font-size: 15px;
`;

const CalculateWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CryptoCurrencyWrapper = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
`;

const CryptoCurrencyTitle = styled.div`
  font-weight: bold;
  width: 100px;
  height: 100%;
  background-color: #ecf0f1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  margin-right: 2px;
`;

const CryptoCurrencyInput = styled.input`
  height: 100%;
  width: 200px;
  border: none;
  text-align: right;
  padding-right: 20px;
  font-size: 14px;
  :focus {
    outline: none;
  }
`;

const ExchangeIcon = styled.img`
  margin-left: 10px;
  margin-right: 10px;
`;

const CurrencyWrapper = styled(CryptoCurrencyWrapper)``;

const CurrencyTitle = styled(CryptoCurrencyTitle)``;

const CurrencyInput = styled(CryptoCurrencyInput)``;

const DescriptionWrapper = styled.div``;

const DescriptionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ecf0f1;
  font-size: 14px;
`;

const DescriptionContent = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15px;
  line-height: 20px;
`;
