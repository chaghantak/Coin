import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from './routes/Coins'
import Coin from './routes/Coin'
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/:coinId" ><Coin/></Route> {/*상세페이지*/}
        <Route path="/" ><Coins/></Route> {/*홈화면*/}
      </Switch>
    </BrowserRouter>
  );
}
