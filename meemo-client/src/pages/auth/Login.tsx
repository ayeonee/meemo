import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions/userAction";
import style from "./styles/Auth.module.scss";
import GLogin from "./SocialLogin/GLogin";
import KLogin from "./SocialLogin/KLogin";

interface LoginTypes {
  userId: string;
  password: string;
}

function Login(): JSX.Element {
  const [loginInput, setLoginInput] = useState<LoginTypes>({
    userId: "",
    password: "",
  });
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const onChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const checkButtonEnable = () => {
    if (loginInput.password && loginInput.userId) return false;
    else return true;
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      userId: loginInput.userId,
      password: loginInput.password,
    };

    dispatch(loginUser(body))
      .then(
        (res: {
          payload: {
            loginSuccess: boolean;
            userId: string;
            name: string;
            message: string;
          };
        }) => {
          if (res.payload.loginSuccess) {
            localStorage.setItem("meemo-user-name", res.payload.name);
            localStorage.setItem("meemo-user-id", res.payload.userId);
            history.push({
              pathname: "/home",
            });
          } else {
            alert(res.payload.message);
            setLoginInput({
              userId: "",
              password: "",
            });
          }
        }
      )
      .catch((err: string) => {
        console.error(err);
      });
  };

  return (
    <>
      <form className={style.input_wrapper} onSubmit={onSubmitHandler}>
        <div className={style.animated_div}>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={loginInput.userId}
            onChange={onChangeLoginInput}
          />
          <label className={style.animated_label}>User ID</label>
        </div>
        <div className={style.animated_div}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInput.password}
            onChange={onChangeLoginInput}
          />
          <label className={style.animated_label}>Password</label>
        </div>

        <div className={style.button_wrapper}>
          <button
            className={style.login_btn}
            disabled={checkButtonEnable()}
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
