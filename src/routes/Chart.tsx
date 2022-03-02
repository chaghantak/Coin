import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
import { fetchCoinsChart } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
interface ChartProps {
  //2. 굳이 선언할필요 x props로 받아보자
  coinId: string;
}
//3. api.ts에 https://api.coinpaprika.com/v1/coins/{coinId}/ohlcv/historical=${startData}&end=${endData}

//6.data 값 설정 x interface만들어주고 data받아온거 타입 ㄱ,<> 선언
interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

//7.apexchart import
//8.apexchart type="" height: width: ... *series={[{name"~ data:~}]
//options={apex페이지참고}}
function Chart({ coinId }: ChartProps) {
  //coin chart를 screen
  // const params = useParams();//1.useparam으로 값먼저 따오기
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinsChart(coinId),{
      refetchInterval:3000,
    }
  ); //5.useQuery 사용  fetcher받아오기

  return (
    <h1>
      {isLoading ? (
        "loading..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:data?.map((chart)=>({
                x:chart.time_open,
                y:[chart.open.toFixed(2),chart.high.toFixed(2),chart.low.toFixed(2),chart.close.toFixed(2)]
              }))
            },
          ]}
          options={{
            theme: {
              mode:isDark? "dark" : "light",
            },
            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
              height: 500,
              width: 500,
            },
            // grid: {
            //   show: true,
            // },
            xaxis: {
              axisTicks: { show: false },
              axisBorder:{show:false},
              labels:{show:false},
              type:"datetime",
            },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            // },
            // colors: ["red"],
            // stroke:{
            //   show:true,
            //   curve:"smooth",
            //   width:5,
            // },
           
          }}
        />
      )}
    </h1>
  );
}

export default Chart;
