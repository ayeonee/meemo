import { useState, useEffect } from "react";
import style from "../styles/Weather.module.scss";
import Geocode from "react-geocode";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY!;

function Weather(): JSX.Element {
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: "",
    temp_max: "",
    temp_min: "",
    feelslike: "",
    weather: "",
    humidity: "",
    icon: "",
  });

  const [fullLocation, setFullLocation] = useState<string>("Seoul Dongjak-gu");

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
          temp_max: jsonfile.main.temp_max,
          temp_min: jsonfile.main.temp_min,
          feelslike: jsonfile.main.feels_like,
          weather: jsonfile.weather[0].main,
          humidity: jsonfile.main.humidity,
          icon: jsonfile.weather[0].icon,
        });
      });
  };

  const getCurrentCity = (latitudeVar: string, longitudeVar: string) => {
    // Geocode.fromLatLng(latitudeVar, longitudeVar, GOOGLE_API_KEY).then((response) => {
    //   getWeather(response.results[0].address_components[3].long_name);
    //   setFullLocation(
    //     `${response.results[0].address_components[3].long_name} ${response.results[0].address_components[2].long_name}`
    //   );
    // });
    getWeather("Seoul"); /* for test*/
  };

  const handleGeoTrue = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getCurrentCity(latitude, longitude);
  };

  const handleGeoFalse = (position: any) => {};

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoTrue, handleGeoFalse);
  };

  useEffect(() => {
    askForCoords();
  }, []);

  return (
    <div className={style.weather}>
      <div className={style.title}>WEATHER</div>
      <div className={style.weather_container}>
        <div className={style.weather_line_one}>
          <div className={style.weather_icon}>
            <img
              className={style.weather_icon}
              src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
            />
          </div>

          <div className={style.weather_info}>
            <div className={style.temperature}>{weatherInfo.temperature}°</div>
            <div className={style.explanation}>{weatherInfo.weather}</div>
            <div className={style.location}>
              <p>{fullLocation}</p>
            </div>
          </div>
        </div>
        <div className={style.weather_line_two}>
          <div className={style.temp_info}>
            <div className={style.temp_line}>
              <div className={style.temp_arrow}>↑</div>
              <p>{weatherInfo.temp_max}°</p>
            </div>
            <div className={style.temp_line}>
              <div className={style.temp_arrow}>↓</div>
              <p> {weatherInfo.temp_min}°</p>
            </div>
          </div>
          <div className={style.feels_like}>
            <h1>Sensory :</h1>
            <p>{weatherInfo.feelslike}°</p>
          </div>
          <div className={style.humidity}>
            <h1>Humidity :</h1>
            <p>{weatherInfo.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
