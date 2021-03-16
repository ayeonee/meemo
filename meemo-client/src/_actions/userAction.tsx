import { REGISTER_USER, LOGIN_USER, AUTH_USER } from "./types";
import axios from "axios";

export const registerUser = (dataToSubmit: any) => {
  const request = axios
    .post("http://localhost:5000/api/users/register", dataToSubmit)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const loginUser = (dataToSubmit: any) => {
  const request = axios
    .post("http://localhost:5000/api/users/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const authUser = (dataToSubmit?: any) => {
  const request = axios
    .get("http://localhost:5000/api/users/auth", dataToSubmit)
    .then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};
