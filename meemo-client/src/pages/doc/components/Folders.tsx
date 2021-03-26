import { Switch, Route } from "react-router-dom";

import FolderList from "./FolderList";
import NoteList from "./NoteList";
import Editor from "./Editor";

export default function Folders() {
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
