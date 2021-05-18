import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { darkModeAction, lightModeAction } from "../../_actions/modeAction";
import moon from "../../img/moon.svg";
import sun from "../../img/sun.svg";
import style from "./darkmode.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../_reducers";

export default function DarkMode({
  pathname,
}: {
  pathname: string;
}): JSX.Element {
  const dispatch = useDispatch<any>();
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const modeState = localStorage.getItem("meemo-mode");

  const onClickSwitch = () => {
    if (modeInfo === "dark") {
      document.body.style.backgroundColor = "white";
      dispatch(lightModeAction());
    } else if (modeInfo === "light") {
      document.body.style.backgroundColor = "rgb(53, 54, 58)";
      dispatch(darkModeAction());
    }
  };

  useEffect(() => {
    if (pathname === "/auth" || pathname === "/") {
      document.body.style.backgroundColor = "white";
    } else {
      if (modeState === "dark") {
        document.body.style.backgroundColor = "rgb(53, 54, 58)";
      } else {
        document.body.style.backgroundColor = "white";
      }
    }
  }, [pathname, modeState]);

  return (
    <div
      id={`noDeselect`}
      className={[
        style.dark_mode_toggle,
        modeInfo === "light" ? style.moon : style.sun,
      ].join(" ")}
      onClick={onClickSwitch}
    >
      <img
        id={`noDeselect`}
        src={modeInfo === "dark" ? `${sun}` : `${moon}`}
        alt="dark mode icon"
      />
    </div>
  );
}
