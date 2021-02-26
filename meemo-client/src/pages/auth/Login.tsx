import React from "react";
import style from "./Auth.module.scss";

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <>
      <form className={style.input_wrapper}>
        <div className={style.animated_div}>
          <input type="text" name="user" placeholder="User ID" />
          <label className={style.animated_label}>User ID</label>
        </div>
        <div className={style.animated_div}>
          <input type="password" name="password" placeholder="Password" />
          <label className={style.animated_label}>Password</label>
        </div>

        <div className={style.button_wrapper}>
          <button className={style.login_btn}>로그인</button>
        </div>
      </form>

      <div className={style.division}>
        <div className={style.border} />
        <p>or Login with</p>
        <div className={style.border} />
      </div>

      <div className={style.social}>
        <button className={style.google_login}>구글 로그인(임시)</button>
        <button className={style.kakao_login}>카카오 로그인(임시)</button>
      </div>
    </>
  );
};

export default Login;
