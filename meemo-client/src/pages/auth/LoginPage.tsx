import React from "react";
import logo from "../../img/logo.svg";
import loginImg from "../../img/login-img.svg";
import style from "./Auth.module.scss";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  //임시로 작성해 놓은 컴포넌트임 후에 로그인/회원가입 폼 컴포넌트 나누어 사용예정
  return (
    <div className={style.login_page}>
      <div className={style.login_wrapper}>
        <div className={style.login_box}>
          <div className={style.input_wrapper}>
            <p>ID</p>
            <input type="text" />
          </div>
          <div className={style.input_wrapper}>
            <p>PW</p>
            <input type="password" />
          </div>
          <div className={style.button_wrapper}>
            <button className={style.login_btn}>로그인</button>
            <button className={style.login_btn}>회원가입</button>
          </div>

          <div className={style.division}>
            <div className={style.border}></div>
            <p>or</p>
            <div className={style.border}></div>
          </div>

          <div className={style.social}>
            <button className={style.google_login}>구글 로그인</button>
            <button className={style.kakao_login}>카카오 로그인</button>
          </div>
        </div>

        <div className={style.login_background}>
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
};

export default LoginPage;
