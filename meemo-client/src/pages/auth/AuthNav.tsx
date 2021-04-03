import { MouseEventHandler } from "react";
import style from "./AuthNav.module.scss";

type AuthNavProps = {
  loginTxt: boolean;
  registerTxt: boolean;
  onClickMenu: MouseEventHandler;
};

export default function AuthNav({
  loginTxt,
  registerTxt,
  onClickMenu,
}: AuthNavProps) {
  return (
    <div className={style.auth_nav_wrapper}>
      <li
        className={loginTxt ? style.nav_text_true : style.nav_text_false}
        onClick={onClickMenu}
        value="login"
      >
        Login
      </li>
      <li
        className={registerTxt ? style.nav_text_true : style.nav_text_false}
        onClick={onClickMenu}
        value="register"
      >
        Register
      </li>
    </div>
  );
}
