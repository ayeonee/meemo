import style from "../styles/UserGraph.module.scss";
import WeatherInfo from "./weatherInfo";
import AchievementRate from "./achievementRate";

function UserGraph(): JSX.Element {
  return (
    <div className={style.user_graph}>
      <div className={style.title}>Welcome</div>
      <div className={style.welcome_box}>
        <WeatherInfo />
        <AchievementRate />
      </div>
    </div>
  );
}

export default UserGraph;
