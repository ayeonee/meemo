import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  KLOGIN_USER,
  GLOGIN_USER,
} from "../_actions/types";
import { ResponseTypes } from "../_types/authTypes";

type UserState = {
  loginSuccess: {
    loginSuccess: boolean;
    userId: string;
    name: string;
  };
  register: {
    success: boolean;
  };
  userData: {
    _id: string;
    name: string;
    userId: string;
    isAuth: boolean;
  };
};

const userReducer = (
  state: UserState = {
    register: { success: false },
    loginSuccess: {
      loginSuccess: false,
      userId: "",
      name: "",
    },
    userData: {
      _id: "",
      name: "",
      userId: "",
      isAuth: false,
    },
  },
  action: ResponseTypes
) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };

    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    case GLOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case KLOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    default:
      return state;
  }
};

export default userReducer;
