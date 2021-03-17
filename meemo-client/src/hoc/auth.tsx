import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUser } from "../_actions/userAction";

function Auth(Component: any, option: null | false | true) {
  // null => 아무나 출입가능
  // true => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가능

  const AuthCheck = () => {
    const dispatch: any = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(authUser()).then((res: any) => {
        console.log(res);

        if (!res.payload.isAuth) {
          //로그인 하지 않은상태
          if (option === true) {
            history.push("/");
          }
        } else {
          // 로그인 한 상태
          if (!option) {
            history.push("/schedule");
          }
        }
      });
    }, []);
    return <Component />;
  };

  return AuthCheck;
}

export default Auth;
