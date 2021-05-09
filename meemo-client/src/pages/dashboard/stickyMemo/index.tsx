import style from "../styles/StickyMemo.module.scss";

function StickyMemo(): JSX.Element {
  return (
    <div className={style.sticky_memo}>
      <div className={style.title}>Sticky Memo</div>
      <div className={style.sticky_wrapper}>스티키 메모</div>
    </div>
  );
}

export default StickyMemo;
