import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthNav from "./AuthNav";
import Login from "./Login";
import Register from "./Register";
import logo from "../../img/logo.svg";
import loginImg from "../../img/login-img.svg";
import style from "./Auth.module.scss";

function AuthPage() {
  return (
    <Router>
      <div className={style.auth_page}>
        <div className={style.auth_box_wrapper}>
          <div className={style.auth_box}>
            <AuthNav />
            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} />
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
    </Router>
  );
}

export default AuthPage;
