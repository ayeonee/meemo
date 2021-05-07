import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUser } from "../_userActions/userAction";
import { ResponseTypes } from "../_types/authTypes";
import removeLocalStorage from "../hooks/removeLocalStorage";

function Auth(Component: React.FC, option: null | false | true | undefined) {
  // null => 아무나 출입가능
  // true => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가능
  // undefined => block

  const AuthCheck = () => {
    const dispatch = useDispatch<any>();
    const history = useHistory();

    useEffect(() => {
      dispatch(authUser()).then((res: ResponseTypes) => {
        if (!res.payload.isAuth) {
          //로컬에 남아있는 유저정보 삭제
          removeLocalStorage();

          if (option === true || option === undefined) {
            document.location.href = "/auth";
          }
        } else {
          if (option === false || option === undefined) {
            history.push("/home");
          }
        }
      });
    }, []);
    return <Component />;
  };

  return AuthCheck;
}

export default Auth;
