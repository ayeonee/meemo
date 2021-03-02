import React from "react";
import { Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Home from "./pages/home";

const Root: React.FC = () => {
  return (
    <>
      <Route component={AuthPage} path="/" exact />
      <Route component={Home} path="/schedule" />
    </>
  );
};

export default Root;
