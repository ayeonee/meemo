import React, { useState } from "react";
import style from "./Auth.module.scss";

interface Props {}

const Login: React.FC<Props> = () => {
  const [textState, setTextState] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");

  const onChangeTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setInputVal(value);

    inputVal === "" ? setTextState(false) : setTextState(true);
  };
  return (
    <div className={style.input_wrapper}>
      <div className={style.animated_div}>
        <input
          type="text"
          name="user"
          onChange={onChangeTxt}
          value={inputVal}
        />
        <label
          className={
            textState ? style.animated_label : style.animated_label_false
          }
        >
          User ID
        </label>
      </div>
      <div className={style.animated_div}>
        <input type="password" name="password" />
        <label className={style.animated_label}>Password</label>
      </div>

      <div className={style.button_wrapper}>
        <button className={style.login_btn}>로그인</button>

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
    </div>
  );
};

export default Login;
