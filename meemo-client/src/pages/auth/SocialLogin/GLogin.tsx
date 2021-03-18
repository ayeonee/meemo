import {useState, useEffect} from 'react';
import style from "../Auth.module.scss";
import GoogleLogin from 'react-google-login';

interface IUser{
  userId : string,
  userName : string,
  provider : string,
  accessToken : string
}

function GLogin(){

  const [userInfo, setUserInfo]=useState<IUser>({
    userId : "",
    userName : "",
    provider : "",
    accessToken : ""
  });

  const responseGoogle = (response : any)=>{
    setUserInfo(
      {
        userId : response.googleId,
        userName : response.profileObj.name,
        provider : "google",
        accessToken :response.accessToken,
      }
    );
    console.log("success google login");
    }

  console.log(userInfo);

  useEffect(()=>{
    if(userInfo!.userId){
      window.localStorage.setItem('userId',userInfo!.userId);
      window.localStorage.setItem('userName',userInfo!.userName);
      window.localStorage.setItem('provider',userInfo!.provider);
      window.localStorage.setItem('accessToken',userInfo!.accessToken);
    }
  },[userInfo])

  const responseFail=()=>{
    console.error();
  }
  return (
      <>
        <GoogleLogin
          clientId="723578906212-p9e6ejvqm6rbbk4d2lo0djvks5j3k530.apps.googleusercontent.com"
          render={renderProps => (
            <button className={style.GoogleBtn} onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <span className={style.GoogleIcon}></span>
              <div className={style.GoogleText}>구글로 로그인하기</div>
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseFail}
        />
      </>
    );
}

export default GLogin;