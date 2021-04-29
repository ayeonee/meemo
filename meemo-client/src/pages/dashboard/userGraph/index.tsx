import style from "../DashBoard.module.scss";

function UserGraph(): JSX.Element {
  return (
    <div className={style.user_graph}>
      <div className={style.title}>User Graph</div>
    </div>
  );
}

export default UserGraph;
