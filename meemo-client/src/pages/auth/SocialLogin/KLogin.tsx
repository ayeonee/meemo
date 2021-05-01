import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { kLoginUser } from "../../../_userActions/userAction";
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
      .then((res: any) => {
        if (res.payload.loginSuccess) {
          localStorage.setItem("meemo-user-name", res.payload.name);
          localStorage.setItem("meemo-user-id", res.payload.userId);
          history.push({
            pathname: "/schedule",
          });
        } else {
          alert(res.payload.loginSuccess);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <KakaoLogin
      token="d61079c156018c7a8055d9a015191dfa"
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
