import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions/userAction";
import style from "./styles/Auth.module.scss";
import GLogin from "./SocialLogin/GLogin";
import KLogin from "./SocialLogin/KLogin";
import { LoginUserPayload } from "../../_types/auth";

interface LoginTypes {
  userId: string;
  password: string;
}

const DEFAULT_LOGIN_DATA = {
  userId: "",
  password: "",
};

function Login() {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const [loginInput, setLoginInput] = useState<LoginTypes>(DEFAULT_LOGIN_DATA);

  const handleChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { userId, password } = loginInput;
    const body = {
      userId,
      password,
    };

    dispatch(loginUser(body))
      .then((res: { payload: LoginUserPayload }) => {
        const payload = res.payload;

        if (payload.loginSuccess) {
          localStorage.setItem("meemo-user-name", payload.name);
          localStorage.setItem("meemo-user-id", payload.userId);

          history.push({
            pathname: "/home",
          });

          return;
        }

        alert(payload.message);
        setLoginInput(DEFAULT_LOGIN_DATA);
      })
      .catch((err: string) => {
        console.error(err);

        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <>
      <form className={style.input_wrapper} onSubmit={handleSubmit}>
        <div className={style.animated_div}>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={loginInput.userId}
            onChange={handleChangeLoginInput}
          />
          <label className={style.animated_label}>User ID</label>
        </div>
        <div className={style.animated_div}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInput.password}
            onChange={handleChangeLoginInput}
          />
          <label className={style.animated_label}>Password</label>
        </div>

        <div className={style.button_wrapper}>
          <button
            className={style.login_btn}
            disabled={!!(loginInput.password && loginInput.userId)}
            type="submit"
          >
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
        <GLogin />
        <KLogin />
      </div>
    </>
  );
}

export default Login;
