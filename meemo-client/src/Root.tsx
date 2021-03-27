import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Home from "./pages/home";
// import Auth from "./hoc/auth";

function Root() {
  // hoc rule
  // null => 아무나 출입가능
  // true => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가능
  return (
    <Router>
      <Switch>
        <Route component={AuthPage} path="/" exact />
        <Route component={Home} path="/schedule" exact />
      </Switch>
    </Router>
  );
}

export default Root;
