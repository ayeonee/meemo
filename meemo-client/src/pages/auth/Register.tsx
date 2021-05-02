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
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [rightPassword, setRightPassword] = useState<Boolean>(false);

  const onChangeRegisterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
  };

  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
    checkPassword(e.target.value);
  };

  const onChangeConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
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
    if (
      registerInput.password === registerInput.confirmPassword &&
      rightPassword &&
      registerInput.userId &&
      registerInput.name
    )
      return false;
    else return true;
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, userId, password } = registerInput;

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
          onChange={onChangePasswordInput}
          onBlur={checkMouseFocus}
        />
        <p className={style.error_message}>{errorMessage}</p>
        <label className={style.animated_label}>Password</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={registerInput.confirmPassword}
          onChange={onChangeConfirmPasswordInput}
        />
        <label className={style.animated_label}>Confirm Password</label>
      </div>

      <div className={style.button_wrapper}>
        <button className={style.register_btn} disabled={checkButtonEnable()} type="submit">
          회원가입
        </button>
      </div>
    </form>
  );
}

export default Register;
