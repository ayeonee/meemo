import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import SchedulePage from "./pages/schedule";
import FolderPage from "./pages/doc";
import NoteList from "./pages/doc/lists/NoteList";
import Editor from "./pages/doc/editor/Editor";
import TodoPage from "./pages/todo";
import DashBoardPage from "./pages/dashboard";
import Navigation from "./components/Navigation";
import Auth from "./hoc/auth";
import CalendarPage from "./pages/calendar";
import UnkownPage from "./pages/unknown";
import BlockPage from "./pages/block";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { authUser } from "./actions/userAction";
import { lightModeAction, darkModeAction } from "./actions/modeAction";
import { useDispatch } from "react-redux";

// hoc rule
// null => 아무나 출입가능
// true => 로그인 한 유저만 출입가능
// false => 로그인 한 유저는 출입 불가능
// undefined => block

function Root(): JSX.Element {
  const modeState = localStorage.getItem("meemo-mode");
  const dispatch = useDispatch<any>();
  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );

  useEffect(() => {
    if (userIdInfo === "") {
      dispatch(authUser());
    }
  }, []);

  useEffect(() => {
    if (modeState === "dark") {
      dispatch(darkModeAction());
    } else if (modeState === "light") {
      dispatch(lightModeAction());
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigation />

      <Switch>
        <Route component={Auth(AuthPage, false)} path="/auth" exact />
        <Route component={Auth(DashBoardPage, true)} path="/home" exact />
        <Route component={Auth(BlockPage, undefined)} path="/" exact />
        <Route component={Auth(TodoPage, true)} path="/todo" exact />
        <Route component={Auth(SchedulePage, true)} path="/schedule" exact />
        <Route component={Auth(FolderPage, true)} path="/folders" exact />
        <Route component={Auth(CalendarPage, true)} path="/calendar" exact />
        <Route
          component={Auth(NoteList, true)}
          path="/folders/:folderTitle"
          exact
        />
        <Route
          component={Auth(Editor, true)}
          path="/folders/:folderTitle/:noteId"
          exact
        />
        <Route component={Auth(UnkownPage, null)} path="*" />
      </Switch>
    </BrowserRouter>
  );
}

export default Root;
