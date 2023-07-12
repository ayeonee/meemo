import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import style from "../styles/RouteShow.module.scss";
import style_mode from "../styles/modeColor.module.scss";
import { Link } from "react-router-dom";

type RouteShowProps = {
  type: string;
  folderTitle: string;
  folderId: string;
  noteTitle: string;
};

export default function RouteShow(props: RouteShowProps) {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const { type, folderTitle, folderId, noteTitle } = props;

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
      </div>
    </div>
  );
}
