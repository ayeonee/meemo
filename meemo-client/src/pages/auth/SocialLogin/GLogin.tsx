import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { gLoginUser } from "../../../_actions/userAction";
import { useHistory } from "react-router-dom";
import style from "../styles/Auth.module.scss";

export default function GLogin(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const submitLogin = (response: any) => {
    const body = {
      tokenId: response.tokenId,
    };
    dispatch(gLoginUser(body))
      .then(
        (res: {
          payload: {
            loginSuccess: boolean;
            userId: string;
            name: string;
          };
        }) => {
          if (res.payload.loginSuccess) {
            localStorage.setItem("meemo-user-name", res.payload.name);
            localStorage.setItem("meemo-user-id", res.payload.userId);
            history.push({
              pathname: "/home",
            });
          } else {
            alert(res.payload.loginSuccess);
          }
        }
      )
      .catch((err: string) => {
        console.log(err);
      });
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_LOGIN_KEY!}
      render={(renderProps) => (
        <button
          className={style.GoogleBtn}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <span className={style.GoogleIcon}></span>
          <div className={style.GoogleText}>구글로 로그인하기</div>
        </button>
      )}
      onSuccess={submitLogin}
      onFailure={console.error}
    />
  );
}
