import React from "react";
import style from "./Auth.module.scss";

interface Props {}

const Register: React.FC<Props> = () => {
  return (
    <div className={style.input_wrapper}>
      <div className={style.animated_div}>
        <input type="text" name="user" />
        <label className={style.animated_label}>User Name</label>
      </div>
      <div className={style.animated_div}>
        <input type="text" name="user" />
        <label className={style.animated_label}>User ID</label>
      </div>
      <div className={style.animated_div}>
        <input type="password" name="password" />
        <label className={style.animated_label}>Password</label>
      </div>

      <div className={style.button_wrapper}>
        <button className={style.login_btn}>회원가입</button>
      </div>
    </div>
  );
};

export default Register;
