import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinsTickers } from "../api";

const Span= styled.span`
  
  color: #1dc018;
  padding: 0 10px;
`

interface PriceProps {
  coinId: string;
}

interface IData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number; 
      volume_24h: number; 
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IData>(
    ["price", coinId],
    () => fetchCoinsTickers(coinId),
    {
      refetchInterval: 3000,
    }
  );

  return (
    <>
    {isLoading?(
      "lodaing..."
    ):(<>
      <Span>1시간:{data?.quotes.USD.percent_change_1h}%</Span>
      <Span>24시간:{data?.quotes.USD.percent_change_24h}%</Span>
      <Span>7일:{data?.quotes.USD.percent_change_7d}%</Span>
      <Span>거래량(24시간):${data?.quotes.USD.volume_24h.toFixed(2)}</Span>
      <Span>시가 총액:${data?.quotes.USD.market_cap}</Span>
      </>
    )}
 
  </>
    )
}

export default Price;
