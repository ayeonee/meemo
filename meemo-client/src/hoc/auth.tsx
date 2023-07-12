import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUser } from "../actions/userAction";
import { Response } from "../_types/auth";
import removeLocalStorage from "../utils/removeLocalStorage";

function Auth(Component: React.FC, option: null | false | true | undefined) {
  // null => 아무나 출입가능
  // true => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가능
  // undefined => block

  const AuthCheck = () => {
    const dispatch = useDispatch<any>();
    const history = useHistory();

    useEffect(() => {
      dispatch(authUser())
        .then((res: Response) => {
          if (!res.payload.isAuth) {
            removeLocalStorage();

            if (option === true || option === undefined) {
              document.location.href = "/auth";
            }

            return;
          }

          if (option === false || option === undefined) {
            history.push("/home");

            return;
          }
        })
        .catch((err: string) => console.error(err));
    }, []);
    return <Component />;
  };

  return AuthCheck;
}

export default Auth;
