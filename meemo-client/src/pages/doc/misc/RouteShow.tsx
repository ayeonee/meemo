import style from "../styles/RouteShow.module.scss";

import { Link } from "react-router-dom";

import { ChromeReaderMode, Edit, Done, DoneOutline } from "@material-ui/icons";
import LoaderSpinner from "./LoaderSpinner";

type RouteShowProps = {
  type: string;
  folderTitle: string;
  folderId: string;
  noteTitle: string;
  isSaving: boolean | null;
  handleEdit: any; // () => void
  isReadOnly: boolean | null; // 다시한번 테스트
};

export default function RouteShow(props: RouteShowProps) {
  const {
    type,
    folderTitle,
    folderId,
    noteTitle,
    isSaving,
    handleEdit,
    isReadOnly,
  } = props;

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
      {type === "editor" ? (
        <div className={style.editDiv}>
          <div className={style.isSavedDiv}>
            {isSaving === null ? null : isSaving ? (
              <LoaderSpinner type="routeshow" />
            ) : (
              <>
                <Done className={style.savedIcons} />
                <p className={style.savedText}>저장됨!</p>
              </>
            )}
          </div>
          <div className={style.editBtn} onClick={handleEdit}>
            {isReadOnly ? (
              <Edit className={style.editIcons} />
            ) : (
              <ChromeReaderMode className={style.editIcons} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
