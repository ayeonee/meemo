import React from "react";
import { Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Home from "./pages/home";

function Root() {
  return (
    <>
      <Route component={AuthPage} path="/" exact />
      <Route component={Home} path="/schedule" />
    </>
  );
}

export default Root;
