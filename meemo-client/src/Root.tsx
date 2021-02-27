import React from "react";
import { Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import SchedulePage from "./pages/schedule";
import NoteList from "./pages/doc/components/NoteList";
import Editor from "./pages/doc/components/Editor";

const Root: React.FC = () => {
  return (
    <>
      <Route component={AuthPage} path="/login" />
      <Route component={SchedulePage} path={["/@:username", "/"]} exact />
      <Route component={NoteList} path="/notelist" />
      <Route component={Editor} path="/editor" />
    </>
  );
};

export default Root;
