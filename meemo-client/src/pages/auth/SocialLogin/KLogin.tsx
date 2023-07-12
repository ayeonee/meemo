import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { kakaoLoginUser } from "../../../actions/userAction";
import { useHistory } from "react-router-dom";
import style from "../styles/Auth.module.scss";
import { OAuthUserPayload } from "../../../_types/auth";

export default function KLogin() {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  const handleSubmitUserInfo = (response: any) => {
    const body = {
      tokenId: response.response.accessToken,
      userId: response.profile.id,
      userName: response.profile.properties.nickname,
    };

    dispatch(kakaoLoginUser(body))
      .then((res: { payload: OAuthUserPayload }) => {
        const kakaoLoginData = res.payload;

        if (kakaoLoginData.loginSuccess) {
          localStorage.setItem("meemo-user-name", kakaoLoginData.name);
          localStorage.setItem("meemo-user-id", kakaoLoginData.userId);

          history.push({
            pathname: "/home",
          });

          return;
        }

        alert(kakaoLoginData.loginSuccess);
      })
      .catch((err: string) => {
        console.log(err);

        alert("로그인에 실패했습니다.");
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
      onSuccess={handleSubmitUserInfo}
      onFail={console.error}
    />
  );
}
