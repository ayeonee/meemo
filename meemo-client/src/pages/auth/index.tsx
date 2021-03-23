import React, { useState, useCallback } from "react";
import AuthNav from "./AuthNav";
import Login from "./Login";
import Register from "./Register";
import logo from "../../img/logo.svg";
import loginImg from "../../img/login-img.svg";
import style from "./Auth.module.scss";

function AuthPage() {
  const [loginTxt, setLoginTxt] = useState<boolean>(true);
  const [registerTxt, setRegisterText] = useState<boolean>(false);

  const onClickMenu = useCallback((e: React.MouseEvent) => {
    const text = (e.target as HTMLElement).innerText;
    if (text === "Login") {
      setLoginTxt(true);
      setRegisterText(false);
    } else {
      setLoginTxt(false);
      setRegisterText(true);
    }
  }, []);

  return (
    <div className={style.auth_page}>
      <div className={style.auth_box_wrapper}>
        <div className={style.auth_box}>
          <AuthNav
            onClickMenu={onClickMenu}
            loginTxt={loginTxt}
            registerTxt={registerTxt}
          />
          {loginTxt ? <Login /> : <Register />}
        </div>

        <div className={style.auth_background}>
          <div className={style.header_sentence}>
            <h4>나만의 온라인 스케쥴러</h4>
            <h3>미-모</h3>
          </div>
          <img className={style.logo} src={`${logo}`} alt="logo" />
          <img
            className={style.bg_img}
            alt="background illustration"
            src={`${loginImg}`}
          />
        </div>
      </div>
      <div className={style.bg_side}>
        <p>Copyright ⓒ2021 ME:EMO. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AuthPage;
