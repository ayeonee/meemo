import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../../components/Navigation";
import SchedulePage from "../schedule";
import TodoPage from "../todo";
import CalenderPage from "../calender";
import PostListPage from "../doc/PostListPage";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Router>
      <Navigation />
      <Route component={SchedulePage} path={"/schedule"} />
      <Route component={TodoPage} path="/todo" />
      <Route component={PostListPage} path="/postlist" />
      <Route component={CalenderPage} path="/calender" />
    </Router>
  );
};

export default Home;
