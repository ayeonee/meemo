import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./AuthNav.module.scss";

interface Props {}

const AuthNav: React.FC<Props> = () => {
  const [loginTxt, setLoginTxt] = useState<boolean>(true);
  const [registerTxt, setRegisterText] = useState<boolean>(false);

  const onChangeTxtColor = () => {
    if (loginTxt && !registerTxt) {
      setLoginTxt(false);
      setRegisterText(true);
    } else {
      setLoginTxt(true);
      setRegisterText(false);
    }
  };

  return (
    <div className={style.auth_nav_wrapper}>
      <Link
        to="/login"
        className={loginTxt ? style.nav_text_true : style.nav_text_false}
        onClick={onChangeTxtColor}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={registerTxt ? style.nav_text_true : style.nav_text_false}
        onClick={onChangeTxtColor}
      >
        Register
      </Link>
    </div>
  );
};

export default AuthNav;
