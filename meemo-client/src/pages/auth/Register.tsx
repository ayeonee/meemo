import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/userAction";
import style from "./Auth.module.scss";

function Register() {
  const [UserId, setUserId] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const onUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  };

  const onName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (Password === ConfirmPassword) {
      let body = {
        userId: UserId,
        name: Name,
        password: Password,
      };

      dispatch(registerUser(body))
        .then((res: any) => {
          alert("done");
          history.push("/login");
        })
        .catch((err: any) => console.log(err));
    } else alert("비밀번호가 다릅니다.");
  };

  return (
    <form className={style.input_wrapper} onSubmit={onSubmitHandler}>
      <div className={style.animated_div}>
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={Name}
          onChange={onName}
        />
        <label className={style.animated_label}>User Name</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={UserId}
          onChange={onUserId}
        />
        <label className={style.animated_label}>User ID</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={Password}
          onChange={onPassword}
        />
        <label className={style.animated_label}>Password</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={ConfirmPassword}
          onChange={onConfirmPassword}
        />
        <label className={style.animated_label}>Confirm Password</label>
      </div>

      <div className={style.button_wrapper}>
        <button className={style.register_btn} type="submit">
          회원가입
        </button>
      </div>
    </form>
  );
}

export default withRouter(Register);
