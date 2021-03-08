import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { loginUser } from "../../_actions/userAction";
import style from "./Auth.module.scss";
import GLogin from "./SocialLogin/GLogin";
import KLogin from "./SocialLogin/KLogin";

function Login() {
  const [UserId, setUserId] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const onUserIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      userId: UserId,
      password: Password,
    };

    dispatch(loginUser(body))
      .then((res: any) => {
        if (res.payload.loginSuccess) {
          history.push({
            pathname: "/schedule",
          });
        } else {
          alert(res.payload.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className={style.input_wrapper} onSubmit={onSubmitHandler}>
        <div className={style.animated_div}>
          <input
            type="text"
            name="user"
            placeholder="User ID"
            value={UserId}
            onChange={onUserIdHandler}
          />
          <label className={style.animated_label}>User ID</label>
        </div>
        <div className={style.animated_div}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={Password}
            onChange={onPasswordHandler}
          />
          <label className={style.animated_label}>Password</label>
        </div>

        <div className={style.button_wrapper}>
          <button className={style.login_btn} type="submit">
            로그인
          </button>
        </div>
      </form>

      <div className={style.division}>
        <div className={style.border} />
        <p>or Login with</p>
        <div className={style.border} />
      </div>

      <div className={style.social}>
        <GLogin/>
        <KLogin/>
      </div>
    </>
  );
}

export default withRouter(Login);
