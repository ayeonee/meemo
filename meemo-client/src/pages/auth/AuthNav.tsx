import React, { MouseEventHandler } from "react";
import style from "./AuthNav.module.scss";

interface Props {
  loginTxt: boolean;
  registerTxt: boolean;
  onClickMenu: MouseEventHandler;
}

function AuthNav({ loginTxt, registerTxt, onClickMenu }: Props) {
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

export default AuthNav;
