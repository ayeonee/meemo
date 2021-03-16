import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Home from "./pages/home";
import Auth from "./hoc/auth";

function Root() {
  return (
    <Router>
      <Switch>
        <Route component={Auth(AuthPage, false)} path="/" exact />
        <Route component={Auth(Home, null)} path="/schedule" exact />
      </Switch>
    </Router>
  );
}

export default Root;
