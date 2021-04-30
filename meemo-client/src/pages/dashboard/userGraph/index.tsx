import { useState, useEffect } from "react";
import style from "../DashBoard.module.scss";

const API_KEY = `4b269952f4e55c72ce7689cdf1160b66`;
const COORDS = `Coords`;

type coordsObj = {
  latitude: number;
  longitude: number;
};

function UserGraph(): JSX.Element {
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: "",
    feelslike: "",
    place: "",
    weather: "",
    icon: "",
  });

  function getWeather(latitudeVar: number, longitudeVar: number) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeVar}&lon=${longitudeVar}&lang=kr&appid=${API_KEY}&units=metric`
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
  }

  function saveCoords(coordsObject: coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
  }

  function handleGeoTrue(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
      latitude,
      longitude,
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoFalse(position: any) {}

  function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoTrue, handleGeoFalse);
  }

  function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
      askForCoords();
    } else {
      const parseCoords = JSON.parse(loadedCoords);
      getWeather(parseCoords.latitude, parseCoords.longitude);
    }
  }

  useEffect(() => {
    loadCoords();
  }, []);

  console.log(weatherInfo);

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
