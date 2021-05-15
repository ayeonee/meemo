import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { darkModeAction, lightModeAction } from "../../_actions/modeAction";
import style from "./darkmode.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../_reducers";

export default function DarkMode(): JSX.Element {
  const dispatch = useDispatch<any>();
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const [modeToggle, setModeToggle] = useState<string>("light");

  const onClickSwitch = () => {
    if (modeInfo === "dark") {
      setModeToggle("light");
      document.body.style.backgroundColor = "white";
      dispatch(lightModeAction());
    } else if (modeInfo === "light") {
      setModeToggle("dark");
      document.body.style.backgroundColor = "rgb(53, 54, 58)";
      dispatch(darkModeAction());
    }
  };

  useEffect(() => {
    setModeToggle(modeInfo);
  }, [modeInfo]);

  useEffect(() => {
    if (localStorage.getItem("meemo-mode") === "dark") {
      document.body.style.backgroundColor = "rgb(53, 54, 58)";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, []);

  return (
    <div className={style.dark_mode_toggle}>
      <div onClick={onClickSwitch}>{modeToggle === "dark" ? "L" : "D"}</div>
    </div>
  );
}
