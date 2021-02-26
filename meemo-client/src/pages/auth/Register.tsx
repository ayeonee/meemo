import React from "react";
import style from "./Auth.module.scss";

interface Props {}

const Register: React.FC<Props> = () => {
  return (
    <form className={style.input_wrapper}>
      <div className={style.animated_div}>
        <input type="text" name="name" placeholder="User Name" />
        <label className={style.animated_label}>User Name</label>
      </div>
      <div className={style.animated_div}>
        <input type="text" name="user" placeholder="User ID" />
        <label className={style.animated_label}>User ID</label>
      </div>
      <div className={style.animated_div}>
        <input type="password" name="password" placeholder="Password" />
        <label className={style.animated_label}>Password</label>
      </div>

      <div className={style.button_wrapper}>
        <button className={style.register_btn}>회원가입</button>
      </div>
    </form>
  );
};

export default Register;
