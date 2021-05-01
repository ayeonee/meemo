import { useState, useEffect } from "react";
import style from "../DashBoard.module.scss";
import Geocode from "react-geocode";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY!;

function UserGraph(): JSX.Element {
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: "",
    feelslike: "",
    place: "",
    weather: "",
    icon: "",
  });
  const [cityName, setCityName] = useState<string>();

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
          place: jsonfile.name,
          weather: jsonfile.weather[0].main,
          icon: jsonfile.weather[0].icon,
        });
      });
  };

  const getCity = (latitudeVar: string, longitudeVar: string) => {
    Geocode.fromLatLng(latitudeVar, longitudeVar, GOOGLE_API_KEY).then((response) => {
      setCityName(response.results[0].address_components[3].long_name);
    });
  };

  const handleGeoTrue = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getCity(latitude, longitude);
    getWeather(cityName!);
  };

  const handleGeoFalse = (position: any) => {};

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoTrue, handleGeoFalse);
  };

  useEffect(() => {
    askForCoords();
  }, []);

  return (
    <div className={style.user_graph}>
      <div className={style.title}>User Graph</div>
      <div className={style.weather_container}>
        <div className={style.weather_info}>
          <img
            className={style.icon}
            src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          />
          <div className={style.weather}>{weatherInfo.weather}</div>
          <div className={style.temperature}>{weatherInfo.temperature}°C</div>
          <div className={style.feels_like}>체감 {weatherInfo.feelslike}°C</div>
          <div className={style.place}>{weatherInfo.place}</div>
        </div>
      </div>
    </div>
  );
}

export default UserGraph;
