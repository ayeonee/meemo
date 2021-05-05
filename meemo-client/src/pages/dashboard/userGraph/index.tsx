import style from "../DashBoard.module.scss";
import WeatherInfo from "./weatherInfo";
import AchievementRate from "./achievementRate";

function UserGraph(): JSX.Element {
<<<<<<< HEAD
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: "",
    feelslike: "",
    weather: "",
    humidity: "",
    icon: "",
  });

  const [fullLocation, setFullLocation] = useState<string>("");

  const getWeather = (cityName: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=kr&appid=${API_KEY}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonfile) {
        setWeatherInfo({
          temperature: jsonfile.main.temp,
          feelslike: jsonfile.main.feels_like,
          weather: jsonfile.weather[0].main,
          humidity: jsonfile.main.humidity,
          icon: jsonfile.weather[0].icon,
        });
      });
  };

  const getCity = (latitudeVar: string, longitudeVar: string) => {
    // Geocode.fromLatLng(latitudeVar, longitudeVar, GOOGLE_API_KEY).then(
    //   (response) => {
    //     getWeather(response.results[0].address_components[3].long_name);
    //     setFullLocation(
    //       `${response.results[0].address_components[3].long_name} ${response.results[0].address_components[2].long_name}`
    //     );
    //   }
    // );
    // getWeather("Seoul"); /* for test*/
  };

  const handleGeoTrue = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getCity(latitude, longitude);
  };

  const handleGeoFalse = (position: any) => {};

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoTrue, handleGeoFalse);
  };

  useEffect(() => {
    askForCoords();
  }, []);

=======
>>>>>>> 215ca64... add achievement rate graph
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
