const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinsInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetchCoinsTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

//4. data.now를 이용해 시간 쓰기 math floor내림 ceil 올림 enddata startdata구하기  enddata-60*60*24*7 일주일을 초로나타낸것
export function fetchCoinsChart(coinId: string) {
  const endData = Math.floor(Date.now() / 1000);
  const startData = endData - 60 * 60 * 24 * 7*2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startData}&end=${endData}`
  ).then((res) => res.json());
}
