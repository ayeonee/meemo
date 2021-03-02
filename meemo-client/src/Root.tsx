import React from "react";
import { Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import SchedulePage from "./pages/schedule";
import NoteList from "./pages/doc/components/NoteList";
import Editor from "./pages/doc/components/Editor";
import Home from "./pages/home";

const Root: React.FC = () => {
  return (
    <>
      <Route component={NoteList} path="/notelist" />
      <Route component={Editor} path="/editor" />
      <Route component={AuthPage} path="/" exact />
      <Route component={Home} path="/schedule" />
    </>
  );
};

export default Root;
