import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../../components/Navigation";
import SchedulePage from "../schedule";
import TodoPage from "../todo";
import Calendar from "../calendar";
import Folders from "../doc";

export default function Home(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route component={SchedulePage} path={"/schedule"} />
        <Route component={TodoPage} path="/todo" />
        <Route component={Folders} path="/folders" />
        <Route component={Calendar} path="/calendar" />
      </Switch>
    </Router>
  );
}
