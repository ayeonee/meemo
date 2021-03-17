import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Todo from "./pages/todo";
import Home from "./pages/home";
import Auth from "./hoc/auth";

function Root() {
  // hoc rule
  // null => 아무나 출입가능
  // true => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가능
  return (
    <Router>
      <Switch>
        <Route component={Auth(AuthPage, false)} path="/" exact />
        <Route component={Auth(Home, true)} path="/schedule" exact />
        <Route component={Auth(Todo, true)} path="/todo" exact />
      </Switch>
    </Router>
  );
}

export default Root;
