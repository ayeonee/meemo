import { useSelector } from "react-redux";
import { RootState } from "../../../_reducers";
import style from "../styles/RouteShow.module.scss";
import style_mode from "../styles/modeColor.module.scss";
import { Link } from "react-router-dom";

import { ChromeReaderMode, Edit, Done } from "@material-ui/icons";
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
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
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
    <div
      className={[
        style.top_bar,
        modeInfo === "light"
          ? style_mode.top_bar_light
          : style_mode.top_bar_dark,
      ].join(" ")}
    >
      <div className={style.wrapper}>
        <div className={style.route}>
          <Link to="/folders" style={linkStyle}>
            <span
              className={
                modeInfo === "light"
                  ? style_mode.text_light
                  : style_mode.text_dark
              }
            >
              모든 폴더
            </span>
          </Link>
          {type === "notelist" ? (
            <span
              className={
                modeInfo === "light"
                  ? style_mode.text_light
                  : style_mode.text_dark
              }
            >
              &nbsp;&nbsp;»&nbsp;&nbsp;{folderTitle}
            </span>
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
                <span
                  className={
                    modeInfo === "light"
                      ? style_mode.text_light
                      : style_mode.text_dark
                  }
                >
                  {" "}
                  &nbsp;&nbsp;»&nbsp;&nbsp;{folderTitle}
                </span>
              </Link>
              <span
                className={
                  modeInfo === "light"
                    ? style_mode.text_light
                    : style_mode.text_dark
                }
              >
                &nbsp;&nbsp;»&nbsp;&nbsp;{noteTitle}
              </span>
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
    </div>
  );
}
