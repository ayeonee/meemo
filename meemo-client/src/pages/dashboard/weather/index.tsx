import { useState, useEffect } from "react";
import { weatherData } from "../../../constants/weather";
import style from "../styles/Weather.module.scss";
import { Mode } from "../../../_types/mode";
import style_mode from "../styles/modeColor.module.scss";
import Geocode from "react-geocode";
import { CircularProgress } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY!;
const DEFAULT_WEATHER_INFO = {
  temperature: "",
  temp_max: "",
  temp_min: "",
  feelslike: "",
  weather: "",
  humidity: "",
  icon: "",
};

function Weather({ modeInfo }: Mode) {
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherInfo, setWeatherInfo] = useState(DEFAULT_WEATHER_INFO);

  const [fullLocation, setFullLocation] = useState<string>("");

  const getWeather = (cityName: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=kr&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonfile) => {
        setLoading(false);
        setWeatherInfo({
          temperature: jsonfile.main.temp,
          temp_max: jsonfile.main.temp_max,
          temp_min: jsonfile.main.temp_min,
          feelslike: jsonfile.main.feels_like,
          weather: jsonfile.weather[0].main,
          humidity: jsonfile.main.humidity,
          icon: jsonfile.weather[0].icon,
        });
      })
      .catch((err) => console.log(err));
  };

  const getCurrentCity = (latitudeVar: string, longitudeVar: string) => {
    Geocode.fromLatLng(latitudeVar, longitudeVar, GOOGLE_API_KEY)
      .then((response) => {
        if (
          response.results[0].address_components[3].long_name === "South Korea"
        ) {
          getWeather(response.results[0].address_components[2].long_name);
          setFullLocation(
            `${response.results[0].address_components[2].long_name} ${response.results[0].address_components[1].long_name}`
          );

          return;
        }

        getWeather(response.results[0].address_components[3].long_name);
        setFullLocation(
          `${response.results[0].address_components[3].long_name} ${response.results[0].address_components[2].long_name}`
        );
      })
      .catch((err) => console.log(err));
  };

  const handleGeoTrue = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getCurrentCity(latitude, longitude);
  };

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoTrue, (err) =>
      console.log(err)
    );
  };

  const weatherMessage = (weatherInfo: string) => {
    switch (weatherInfo) {
      case "Thunderstorm": {
        return weatherData[0];
      }
      case "Squall":
      case "Rain": {
        return weatherData[1];
      }
      case "Snow": {
        return weatherData[2];
      }
      case "Smoke":
      case "Haze":
      case "Fog":
      case "Mist": {
        return weatherData[3];
      }
      case "Dust": {
        return weatherData[4];
      }
      case "Sand": {
        return weatherData[5];
      }
      case "Ash": {
        return weatherData[6];
      }
      case "Tornado": {
        return weatherData[7];
      }
      case "Clear": {
        return weatherData[8];
      }
      case "Clouds": {
        return weatherData[9];
      }
      default: {
        return "공부하기 좋은날!";
      }
    }
  };

  useEffect(() => {
    askForCoords();

    return () => {
      setWeatherInfo(DEFAULT_WEATHER_INFO);
    };
  }, []);

  return (
    <div
      className={[
        style.weather,
        modeInfo === "light"
          ? style_mode.weather_light
          : style_mode.weather_dark,
      ].join(" ")}
    >
      <div className={style.title}>WEATHER</div>
      <div className={style.weather_wrapper}>
        {loading ? (
          <CircularProgress className={style.spinner} size="40px" />
        ) : (
          <>
            <div className={style.sub_title}>
              <span>{weatherMessage(weatherInfo.weather)}</span>
            </div>
            <div className={style.weather_container}>
              <div className={style.weather_line_one}>
                <div className={style.weather_icon}>
                  <img
                    className={style.weather_icon}
                    src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
                    alt="weather icon"
                  />
                </div>
                <div className={style.weather_info}>
                  <p className={style.temperature}>
                    {weatherInfo.temperature}°
                  </p>
                  <p className={style.explanation}>{weatherInfo.weather}</p>
                  <div className={style.location}>
                    <p>{fullLocation}</p>
                  </div>
                </div>
              </div>
              <div className={style.weather_line_two}>
                <div className={style.temp_info}>
                  <div className={style.temp_line}>
                    <p className={style.temp_arrow}>↑</p>
                    <p>{weatherInfo.temp_max}°</p>
                  </div>
                  <div className={style.temp_line}>
                    <p className={style.temp_arrow}>↓</p>
                    <p> {weatherInfo.temp_min}°</p>
                  </div>
                </div>
                <div className={style.feels_like}>
                  <h1>Sensory</h1>
                  <p>{weatherInfo.feelslike}°</p>
                </div>
                <div className={style.humidity}>
                  <h1>Humidity</h1>
                  <p>{weatherInfo.humidity}%</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
