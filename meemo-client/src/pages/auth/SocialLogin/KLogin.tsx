import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { kLoginUser } from "../../../_actions/userAction";
import { useHistory } from "react-router-dom";
import style from "../styles/Auth.module.scss";

export default function KLogin(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const submitLogin = (response: any) => {
    const body = {
      tokenId: response.response.accessToken,
      userId: response.profile.id,
      userName: response.profile.properties.nickname,
    };
    dispatch(kLoginUser(body))
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
    <KakaoLogin
      token={process.env.REACT_APP_KAKAO_LOGIN_KEY!}
      render={(renderProps) => (
        <button className={style.KakaoBtn} onClick={renderProps.onClick}>
          <span className={style.KakaoIcon}></span>
          <span className={style.KakaoText}>카카오로 로그인하기</span>
        </button>
      )}
      onSuccess={submitLogin}
      onFail={console.error}
    />
  );
}
