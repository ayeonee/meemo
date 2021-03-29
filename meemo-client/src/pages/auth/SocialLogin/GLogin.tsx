import style from "../Auth.module.scss";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { gLoginUser } from "../../../_actions/userAction";
import { useHistory } from "react-router-dom";

function GLogin(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const submitLogin = (response: any) => {
    const body = {
      tokenId: response.tokenId,
    };
    dispatch(gLoginUser(body))
      .then((res: any) => {
        if (res.payload.isAuth) {
          history.push({
            pathname: "/schedule",
          });
        } else {
          alert(res.payload.isAuth);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <GoogleLogin
      clientId="723578906212-p9e6ejvqm6rbbk4d2lo0djvks5j3k530.apps.googleusercontent.com"
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

export default GLogin;
