import {useState, useEffect} from 'react';
import style from "../Auth.module.scss";
import KakaoLogin from 'react-kakao-login';

interface IUser{
  userId : string,
  userName : string,
  provider : string,
  accessToken : string
}

function KLogin(){

  const [userInfo, setUserInfo]=useState<IUser>({
    userId : "",
    userName : "",
    provider : "",
    accessToken : ""
  });

  const responseKakao = (response : any) => {
    setUserInfo(
      {
        userId : response.profile.id,
        userName : response.profile.properties.nickname,
        provider : "kakao",
        accessToken : response.response.access_token
      }
    );
    console.log("success kakao login");
  }

  console.log(userInfo);

  useEffect(()=>{
    if(userInfo!.userId){
      window.localStorage.setItem('userId',userInfo!.userId);
      window.localStorage.setItem('userName',userInfo!.userName);
      window.localStorage.setItem('accessToken',userInfo!.accessToken);
      window.localStorage.setItem('provider',userInfo!.provider);
    }
  },[userInfo])

  const responseFail=()=>{
    console.error();
  }
  return (
      <>
        <KakaoLogin
            token="d61079c156018c7a8055d9a015191dfa"
            render={renderProps => (
                <button className={style.KakaoBtn} onClick={renderProps.onClick}>
                <span className={style.KakaoIcon}></span>
                <span className={style.KakaoText}>카카오로 로그인하기</span>
                </button>
            )}
            onSuccess={responseKakao}
            onFail={responseFail}
        />
      </>
    );
}

export default KLogin;