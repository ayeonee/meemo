import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  GLOGIN_USER,
  KLOGIN_USER,
} from "../_types/actionTypes";
import axios from "axios";
import { BASE_URL } from "../_data/urlData";

export const registerUser = async (dataToSubmit: {
  userId: string;
  name: string;
  password: string;
}) => {
  const request = await axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/register",
    data: dataToSubmit,
  });

  const payload = request?.data;

  if (!payload) {
    return;
  }

  return {
    type: REGISTER_USER,
    payload,
  };
};

export const loginUser = async (dataToSubmit: {
  userId: string;
  password: string;
}) => {
  const request = await axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/login",
    data: dataToSubmit,
  });

  const payload = request?.data;

  if (!payload) {
    return;
  }

  return {
    type: LOGIN_USER,
    payload,
  };
};

export const authUser = async () => {
  const request = await axios({
    method: "GET",
    baseURL: BASE_URL,
    url: "/users/auth",
  });

  const payload = request?.data;

  if (!payload) {
    return;
  }

  return {
    type: AUTH_USER,
    payload,
  };
};

export const googleLoginUser = async (dataToSubmit: { tokenId: string }) => {
  const request = await axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/auth/google",
    data: dataToSubmit,
  });

  const payload = request?.data;

  if (!payload) {
    return;
  }

  return {
    type: GLOGIN_USER,
    payload,
  };
};

export const kakaoLoginUser = async (dataToSubmit: {
  tokenId: string;
  userId: string;
  userName: string;
}) => {
  const request = await axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/users/auth/kakao",
    data: dataToSubmit,
  });

  const payload = request?.data;

  if (!payload) {
    return;
  }

  return {
    type: KLOGIN_USER,
    payload,
  };
};
