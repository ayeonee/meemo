import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PostListPage from "./pages/doc/PostListPage";
import PostPage from "./pages/doc/PostPage";
import WritePage from "./pages/doc/WritePage";
import SchedulePage from "./pages/schedule";

const Root: React.FC = () => {
  return (
    <>
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={SchedulePage} path={["/@:username", "/"]} exact />
      <Route component={WritePage} path="/write" />
      <Route component={PostListPage} path="/@:username/postlist" />
      <Route component={PostPage} path="/@:username/:postId" />
    </>
  );
};

export default Root;
