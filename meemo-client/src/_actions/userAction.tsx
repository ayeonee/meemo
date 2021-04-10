import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  GLOGIN_USER,
  KLOGIN_USER,
} from "./types";
import axios from "axios";

// const BASE_URL = "https://meemo.kr/api";
const BASE_URL = "http://localhost:5000/api";

export const registerUser = (dataToSubmit: {
  userId: string;
  name: string;
  password: string;
}) => {
  const request = axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/register",
    data: dataToSubmit,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const loginUser = (dataToSubmit: {
  userId: string;
  password: string;
}) => {
  const request = axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/login",
    data: dataToSubmit,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const authUser = () => {
  const request = axios({
    method: "GET",
    baseURL: BASE_URL,
    url: "/users/auth",
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: AUTH_USER,
    payload: request,
  };
};

//SocialLogin
export const gLoginUser = (dataToSubmit?: any) => {
  const request = axios
    .post("https://meemo.kr/api/users/auth/google", dataToSubmit)
    .then((res) => res.data);

  return {
    type: GLOGIN_USER,
    payload: request,
  };
};

export const kLoginUser = (dataToSubmit?: any) => {
  const request = axios
    .post("https://meemo.kr/api/users/auth/kakao", dataToSubmit)
    .then((res) => res.data);

  return {
    type: KLOGIN_USER,
    payload: request,
  };
};
