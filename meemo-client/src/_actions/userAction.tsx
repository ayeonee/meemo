import { REGISTER_USER, LOGIN_USER, AUTH_USER, GLOGIN_USER, KLOGIN_USER } from "./types";
import axios from "axios";

export const registerUser = (dataToSubmit: {
  userId: string;
  name: string;
  password: string;
}) => {
  const request = axios
    .post("http://localhost:5000/api/users/register", dataToSubmit)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const loginUser = (dataToSubmit: {
  userId: string;
  password: string;
}) => {
  const request = axios
    .post("http://localhost:5000/api/users/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const authUser = () => {
  const request = axios
    .get("http://localhost:5000/api/users/auth")
    .then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};

//SocialLogin
export const gLoginUser = (dataToSubmit?: any) => {
  const request = axios
    .post("http://localhost:5000/api/users/auth/google", dataToSubmit)
    .then((res) => res.data);

  return {
    type: GLOGIN_USER,
    payload: request,
  };
};

export const kLoginUser = (dataToSubmit?: any) => {
  const request = axios
    .post("http://localhost:5000/api/users/auth/kakao", dataToSubmit)
    .then((res) => res.data);

  return {
    type: KLOGIN_USER,
    payload: request,
  };
};
