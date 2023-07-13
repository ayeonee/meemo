import { useHistory } from "react-router-dom";
import style from "./styles/error.module.scss";
import { Link } from "react-router-dom";
import unknown from "../../img/unknown.svg";

export default function UnkownPage() {
  let history = useHistory();
  return (
    <div className={style.error_page}>
      <div className={style.error_box_wrapper}>
        <h1 className={style.title}>Oooooooops!</h1>
        <h1 className={style.sub_title}>
          This page is unknown or does not exist.
        </h1>

        <div className={style.section}>
          <img src={`${unknown}`} alt="block icon" />
          <div className={style.script}>
            <p>
              페이지를 <span>찾을 수 없습니다.</span>
            </p>
            <span>인터넷 연결상태 혹은 페이지 주소를 확인해 주세요.</span>
          </div>
        </div>
        <div className={style.backDiv}>
          <Link to={`/home`} className={style.back_to_home}>
            홈으로 돌아가기
          </Link>
          <div className={style.back_to_home} onClick={() => history.go(-2)}>
            &nbsp;&nbsp;&nbsp;이전 페이지&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
