import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { googleLoginUser } from "../../../actions/userAction";
import { useHistory } from "react-router-dom";
import style from "../styles/Auth.module.scss";
import { OAuthUserPayload } from "../../../_types/auth";

export default function GLogin() {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const handleSubmitUserInfo = (response: any) => {
    const body = {
      tokenId: response.tokenId,
    };

    dispatch(googleLoginUser(body))
      .then((res: { payload: OAuthUserPayload }) => {
        const googleLoginData = res.payload;

        if (googleLoginData.loginSuccess) {
          localStorage.setItem("meemo-user-name", googleLoginData.name);
          localStorage.setItem("meemo-user-id", googleLoginData.userId);

          history.push({
            pathname: "/home",
          });

          return;
        }

        alert(googleLoginData.loginSuccess);
      })
      .catch((err: string) => {
        console.log(err);

        alert("로그인에 실패했습니다.");
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
      onSuccess={handleSubmitUserInfo}
      onFailure={console.error}
    />
  );
}
