import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/auth';
import Home from './pages/home';
import Auth from './hoc/auth';

function Root(): JSX.Element {
  // hoc rule
  // null => 아무나 출입가능
  // true => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가능
  return (
    <Router>
      <Switch>
        {/* <Route component={AuthPage} path="/" exact />
        <Route component={Home} path="/schedule" exact /> */}
        <Route component={Auth(AuthPage, false)} path="/" exact />
        <Route component={Auth(Home, null)} path="/schedule" exact />
        {/*↑dashboard 테스트 용으로 null로 했음 디벨롭하기 전에 수정할것*/}
      </Switch>
    </Router>
  );
}

export default Root;
