import { DEFAULT_USER_INFO } from "../constants/user";
import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  KLOGIN_USER,
  GLOGIN_USER,
} from "../_types/action";
import { Response } from "../_types/auth";

interface User {
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
}

const userReducer = (state: User = DEFAULT_USER_INFO, action: Response) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };

    case LOGIN_USER:
    case GLOGIN_USER:
    case KLOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
};

export default userReducer;
