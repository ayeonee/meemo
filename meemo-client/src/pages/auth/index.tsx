import React, { useState, useCallback } from "react";
import AuthNav from "./AuthNav";
import Login from "./Login";
import Register from "./Register";
import logo from "../../img/logo.svg";
import style from "./styles/Auth.module.scss";

export default function AuthPage(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleClickMenu = useCallback((e: React.MouseEvent) => {
    const text = (e.target as HTMLElement).innerText;

    if (text === "Login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className={style.auth_page}>
      <div className={style.auth_box_wrapper}>
        <div className={style.auth_box}>
          <AuthNav
            onClickMenu={handleClickMenu}
            loginTxt={isLogin}
            registerTxt={!isLogin}
          />
          {isLogin ? <Login /> : <Register setLoginTxt={setIsLogin} />}
        </div>

        <div className={style.auth_background}>
          <div className={style.header_sentence}>
            <h4>나만의 온라인 스케쥴러</h4>
            <h3>미-모</h3>
          </div>
          <img className={style.logo} src={`${logo}`} alt="logo" />
          <div className={style.bg_img}></div>
        </div>
      </div>
      <div className={style.bg_side}>
        <div className={style.bg_logo}></div>
        <p>Copyright ⓒ2021 ME:EMO. All rights reserved.</p>
      </div>
    </div>
  );
}
