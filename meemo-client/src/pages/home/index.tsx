import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../../components/Navigation";
import SchedulePage from "../schedule";
import TodoPage from "../todo";
import DemoApp from "../calender/DemoApp";
import Folders from "../doc";

export default function Home(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route component={SchedulePage} path={"/schedule"} />
        <Route component={TodoPage} path="/todo" />
        <Route component={Folders} path="/folders" />
        <Route component={DemoApp} path="/calender" />
      </Switch>
    </Router>
  );
}
