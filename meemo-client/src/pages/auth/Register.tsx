import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_userActions/userAction";
import style from "./styles/Auth.module.scss";

interface RegisterTypes {
  name: string;
  userId: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProps {
  setLoginTxt: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterText: React.Dispatch<React.SetStateAction<boolean>>;
}

function Register({ ...props }: RegisterProps): JSX.Element {
  const toggleMenu = () => {
    const { setLoginTxt, setRegisterText } = props;

    setLoginTxt(true);
    setRegisterText(false);
  };
  const [registerInput, setRegisterInput] = useState<RegisterTypes>({
    name: "",
    userId: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch<any>();

  const onChangeRegisterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, userId, password, confirmPassword } = registerInput;

    if (password === confirmPassword) {
      const body = {
        userId: userId,
        name: name,
        password: password,
      };

      dispatch(registerUser(body))
        .then((res: any) => {
          alert("회원가입이 완료되었습니다.");
          setRegisterInput({
            name: "",
            userId: "",
            password: "",
            confirmPassword: "",
          });
        })
        .then(() => toggleMenu())
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
          value={registerInput.name}
          onChange={onChangeRegisterInput}
        />
        <label className={style.animated_label}>User Name</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={registerInput.userId}
          onChange={onChangeRegisterInput}
        />
        <label className={style.animated_label}>User ID</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerInput.password}
          onChange={onChangeRegisterInput}
        />
        <label className={style.animated_label}>Password</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={registerInput.confirmPassword}
          onChange={onChangeRegisterInput}
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

export default Register;
