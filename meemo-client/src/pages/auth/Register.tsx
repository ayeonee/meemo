import axios from "axios";
import React, { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/userAction";
import style from "./styles/Auth.module.scss";

import { BASE_URL } from "../../constants/url";

interface RegisterTypes {
  name: string;
  userId: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProps {
  setLoginTxt: Dispatch<SetStateAction<boolean>>;
}

const DEFAULT_REGISTER_DATA = {
  name: "",
  userId: "",
  password: "",
  confirmPassword: "",
};
const DEFAULT_PASSWORD_ERROR = " * 대소문자, 숫자, 특수문자 포함 8자리 이상";
const DEFAULT_PASSWORD_CONFIRM_ERROR =
  " * 대소문자, 숫자, 특수문자 포함 8자리 이상";

const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}/;

function Register({ setLoginTxt }: RegisterProps) {
  const dispatch = useDispatch<any>();

  const [registerInput, setRegisterInput] = useState<RegisterTypes>(
    DEFAULT_REGISTER_DATA
  );
  const [errorMessage, setErrorMessage] = useState<String>(
    DEFAULT_PASSWORD_ERROR
  );
  const [secondErrorMessage, setSecondErrorMessage] = useState<String>(
    DEFAULT_PASSWORD_CONFIRM_ERROR
  );
  const [rightPassword, setRightPassword] = useState<Boolean>(false);
  const [rightConfirmPassword, setRightConfirmPassword] = useState<Boolean>(
    false
  );

  const handleToggleMenu = () => {
    setLoginTxt(true);
  };

  const handleChangeRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
  };

  const handleChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterInput({
      ...registerInput,
      [name]: value,
    });

    checkPassword(e.target.value);
  };

  const handleChangeConfirmPasswordInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setRegisterInput({
      ...registerInput,
      [name]: value,
    });

    checkSamePassword(e.target.value);
  };

  const checkPassword = (value: string) => {
    if (PASSWORD_REGEXP.test(value)) {
      setErrorMessage(" * 사용가능한 비밀번호입니다");
      setRightPassword(true);

      return;
    }

    setRightPassword(false);
    setErrorMessage(" * 대소문자, 숫자, 특수문자 포함 8자리 이상");
  };

  const checkSamePassword = (value: string) => {
    if (registerInput.password === value) {
      setSecondErrorMessage(" * 확인 완료");
      setRightConfirmPassword(true);

      return;
    }

    setRightConfirmPassword(false);
    setSecondErrorMessage(" * 비밀번호와 동일하게 입력해주세요");
  };

  const checkButtonEnable = () => {
    if (
      rightConfirmPassword &&
      rightPassword &&
      registerInput.userId &&
      registerInput.name
    ) {
      return false;
    }

    return true;
  };

  const handleCreateStickynote = (userId: string) => {
    const stickymemoInitData = {
      body: "",
      userId: userId,
    };

    axios.post(BASE_URL + "/stickynote/create", stickymemoInitData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, userId, password } = registerInput;
    const body = {
      userId,
      name,
      password,
    };

    dispatch(registerUser(body))
      .then((_: { success: boolean }) => {
        alert("회원가입이 완료되었습니다.");

        handleCreateStickynote(userId);
        handleToggleMenu();

        setRegisterInput(DEFAULT_REGISTER_DATA);
      })
      .catch((err: string) => console.error(err));
  };

  return (
    <form className={style.input_wrapper} onSubmit={handleSubmit}>
      <div className={style.animated_div}>
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={registerInput.name}
          onChange={handleChangeRegisterInput}
        />
        <label className={style.animated_label}>User Name</label>
      </div>
      <div className={style.animated_div}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={registerInput.userId}
          onChange={handleChangeRegisterInput}
        />
        <label className={style.animated_label}>User ID</label>
      </div>
      <div className={style.animated_div_bottom}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerInput.password}
          onChange={handleChangePasswordInput}
        />
        <p
          className={
            rightPassword ? style.error_message_green : style.error_message_red
          }
        >
          {errorMessage}
        </p>
        <label className={style.animated_label}>Password</label>
      </div>
      <div className={style.animated_div_bottom}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={registerInput.confirmPassword}
          onChange={handleChangeConfirmPasswordInput}
        />
        <p
          className={
            rightConfirmPassword
              ? style.error_message_green
              : style.error_message_red
          }
        >
          {secondErrorMessage}
        </p>
        <label className={style.animated_label}>Confirm Password</label>
      </div>

      <div className={style.button_wrapper}>
        <button
          className={style.register_btn}
          disabled={checkButtonEnable()}
          type="submit"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default Register;
