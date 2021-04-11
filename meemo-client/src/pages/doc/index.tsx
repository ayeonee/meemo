import { Switch, Route } from "react-router-dom";
import FolderList from "./lists/FolderList";
import NoteList from "./lists/NoteList";
import Editor from "./editor/Editor";

export default function Folders(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/folders">
        <FolderList />
      </Route>
      <Route exact path="/folders/:folderTitle">
        <NoteList />
      </Route>
      <Route exact path="/folders/:folderTitle/:noteId">
        <Editor />
      </Route>
    </Switch>
  );
}
