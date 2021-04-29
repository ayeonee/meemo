import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUser } from "../_actions/userAction";
import { ResponseTypes } from "../_types/authTypes";
import removeLocalStorage from "../hooks/removeLocalStorage";
function Auth(Component: any, option: null | false | true) {
  // null => 아무나 출입가능
  // true => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가능

  const AuthCheck = () => {
    const dispatch = useDispatch<any>();
    const history = useHistory();

    useEffect(() => {
      dispatch(authUser()).then((res: ResponseTypes) => {
        if (!res.payload.isAuth) {
          //로컬에 남아있는 유저정보 삭제
          removeLocalStorage();

          if (option === true) {
            document.location.href = "/auth";
          }
        } else {
          if (option === false) {
            history.push("/");
          }
        }
      });
    }, []);
    return <Component />;
  };

  return AuthCheck;
}

export default Auth;
