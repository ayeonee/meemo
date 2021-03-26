import style from "../styles/RouteShow.module.scss";

import { Link } from "react-router-dom";

import NoteList from "./NoteList";

interface props {
  type: string;
  folderTitle: string;
  folderId: string;
  noteTitle: string;
}

export default function RouteShow(props: props) {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div className={style.wrapper}>
      <div className={style.route}>
        <Link to="/folders" style={linkStyle}>{`모든 폴더`}</Link>
        {props.type === "notelist" ? (
          <span>&nbsp;&nbsp;»&nbsp;&nbsp;{props.folderTitle}</span>
        ) : null}
        {props.type === "editor" ? (
          <>
            <Link
              to={{
                pathname: `/folders/${props.folderTitle}`,
                state: {
                  folderTitle: props.folderTitle,
                  folderId: props.folderId,
                },
              }}
              style={linkStyle}
            >
              &nbsp;&nbsp;»&nbsp;&nbsp;{props.folderTitle}
            </Link>
            <span>&nbsp;&nbsp;»&nbsp;&nbsp;{props.noteTitle}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
