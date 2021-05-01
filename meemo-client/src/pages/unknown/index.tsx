import style from "./styles/error.module.scss";
export default function UnkownPage(): JSX.Element {
  return (
    <div className={style.error_page}>
      <div className={style.error_message_wrapper}>
        <h1>Oops!</h1>
      </div>
    </div>
  );
}
