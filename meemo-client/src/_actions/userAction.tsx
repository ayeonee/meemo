import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  GLOGIN_USER,
  KLOGIN_USER,
} from "../_types/actionTypes";
import axios from "axios";
import { BASE_URL } from "../_data/urlData";

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

export const gLoginUser = (dataToSubmit: { tokenId: string }) => {
  const request = axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/auth/google",
    data: dataToSubmit,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: GLOGIN_USER,
    payload: request,
  };
};

export const kLoginUser = (dataToSubmit: {
  tokenId: string;
  userId: string;
  userName: string;
}) => {
  const request = axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/auth/kakao",
    data: dataToSubmit,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: KLOGIN_USER,
    payload: request,
  };
};
