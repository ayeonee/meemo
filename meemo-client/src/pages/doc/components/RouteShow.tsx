import style from "../styles/RouteShow.module.scss";

import { Link } from "react-router-dom";

import NoteList from "./NoteList";

type RouteShowProps = {
  type: string;
  folderTitle: string;
  folderId: string;
  noteTitle: string;
};

export default function RouteShow(props: RouteShowProps) {
  const { type, folderTitle, folderId, noteTitle } = props;

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div className={style.wrapper}>
      <div className={style.route}>
        <Link to="/folders" style={linkStyle}>{`모든 폴더`}</Link>
        {type === "notelist" ? (
          <span>&nbsp;&nbsp;»&nbsp;&nbsp;{folderTitle}</span>
        ) : null}
        {type === "editor" ? (
          <>
            <Link
              to={{
                pathname: `/folders/${folderTitle}`,
                state: {
                  folderTitle: folderTitle,
                  folderId: folderId,
                },
              }}
              style={linkStyle}
            >
              &nbsp;&nbsp;»&nbsp;&nbsp;{folderTitle}
            </Link>
            <span>&nbsp;&nbsp;»&nbsp;&nbsp;{noteTitle}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
