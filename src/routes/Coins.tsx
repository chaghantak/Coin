// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Container = styled.div`
  padding: 0px 20px; //위아래 0 좌우 10 여백
  max-width: 480px;
  margin: 0 auto; //인터넷창을 움직여도 가운데 고정
`;

const Header = styled.header`
  height: 10vh; //viewport hight 10%
  display: flex;
  justify-content: center; //x축 center
  align-items: center; //y축 center
`;
const animation = keyframes`
    0%{
        transform: rotate(0deg);
        border-radius: 0px;
    }
    50%{
        border-radius: 100%;
    }
    100%{
        transform: rotate(360deg);
        border-radius: 0%;
    }
`;

const Loading = styled.div`
  display: block;
  text-align: center;
  padding: 30px;
  animation: ${animation} 3s linear infinite;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props)=>props.theme.bgColor};
  border: solid 1px;
  color: ${(props) => props.theme.textColor};
  
  margin-bottom: 10px; //밑공간 10px

  border-radius: 15px;
  a {
    display: flex;
    align-items: center; //가운데정렬느낌
    padding: 20px; //anchor에 padding을 넣어줌으로써 , 클릭 위아래 범위ㅏ가커짐
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
export default function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setterFn = useSetRecoilState(isDarkAtom); // isdarkatom을 직접수정하는 setter
  const toggleAtoms = ()=> setterFn(prev=>!prev)
  //coin.id - never coin이 뭔지 알려줄게 interface가져오자!
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);
  // //특정한 시기에만 코드를 실행하기위해 useEffect 나의 컴포넌트가 시작될때,끝날때,변화가 일어날때마다 실행할지 고를 수 있음
  // useEffect(() => { //()()
  //   (async () => {
  //     //함수를 바로 실행 시킬 수 있는 꿀팁 console.log 넣어놓으면 바로실행된다.

  //     setCoins(json.slice(0, 100));
  //       setLoading(false)
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>React연습 코인</Title>
        <button onClick={toggleAtoms}>Click</button> {/*setterFn(false)라고하면 false에갇혀있음 */}
      </Header>

      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 30).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}&rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
