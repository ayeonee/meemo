import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../_userActions/userAction";
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
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [rightPassword, setRightPassword] = useState<Boolean>(false);

  const onChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
    checkPassword(e.target.value);
  };

  const checkPassword = (value: string) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}/;
    if (reg.test(value)) {
      setErrorMessage("");
      setRightPassword(true);
    } else {
      setErrorMessage("대소문자, 숫자, 특수문자 포함 8자리 이상");
      setRightPassword(false);
    }
  };

  const checkMouseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setErrorMessage("비밀번호를 입력해주세요.");
    } else setErrorMessage("");
  };

  const checkButtonEnable = () => {
    if (rightPassword && loginInput.userId) return false;
    else return true;
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      userId: loginInput.userId,
      password: loginInput.password,
    };

    dispatch(loginUser(body))
      .then((res: any) => {
        if (res.payload.loginSuccess) {
          localStorage.setItem("meemo-user-name", res.payload.name);
          localStorage.setItem("meemo-user-id", res.payload.userId);
          history.push({
            pathname: "/",
          });
        } else {
          alert(res.payload.message);
          setLoginInput({
            userId: "",
            password: "",
          });
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
            onChange={onChangePasswordInput}
            onBlur={checkMouseFocus}
          />
          <p className={style.error_message}>{errorMessage}</p>
          <label className={style.animated_label}>Password</label>
        </div>

        <div className={style.button_wrapper}>
          <button className={style.login_btn} disabled={checkButtonEnable()} type="submit">
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
