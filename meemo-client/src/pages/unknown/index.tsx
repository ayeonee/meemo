import style from "./styles/error.module.scss";
import unknown from "../../img/unknown.svg";

export default function UnkownPage(): JSX.Element {
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
            <p>인터넷이 연결되어있지 않거나, 존재하지 않는 페이지입니다.</p>
            <p>인터넷 연결상태를 확인해 주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
