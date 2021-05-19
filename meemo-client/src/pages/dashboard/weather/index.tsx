import { useState, useEffect } from "react";
import { weatherData } from "../../../_data/weatherData";
import style from "../styles/Weather.module.scss";
import { Mode } from "../../../_types/modeTypes";
import style_mode from "../styles/modeColor.module.scss";
import Geocode from "react-geocode";
import { CircularProgress } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY!;

function Weather({ modeInfo }: Mode): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: "",
    temp_max: "",
    temp_min: "",
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
      .catch((err)=>console.log(err));
  };

  const getCurrentCity = (latitudeVar: string, longitudeVar: string) => {
    Geocode.fromLatLng(latitudeVar, longitudeVar, GOOGLE_API_KEY).then(
      (response) => {
        getWeather(response.results[0].address_components[3].long_name);
        setFullLocation(
          `${response.results[0].address_components[3].long_name} ${response.results[0].address_components[2].long_name}`
        );
      }
    );
    //getWeather("Seoul"); /* for test*/
  };

  const handleGeoTrue = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getCurrentCity(latitude, longitude);
  };

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(
      handleGeoTrue,
      (err) => console.log(err)
    );
  };

  const weatherMessage = (weatherInfo: string) => {
    if (weatherInfo === "Thunderstorm") {
      return weatherData[0];
    } else if (weatherInfo === "Rain" || weatherInfo === "Squall") {
      return weatherData[1];
    } else if (weatherInfo === "Snow") {
      return weatherData[2];
    } else if (
      weatherInfo === "Mist" ||
      weatherInfo === "Smoke" ||
      weatherInfo === "Haze" ||
      weatherInfo === "Fog"
    ) {
      return weatherData[3];
    } else if (weatherInfo === "Dust") {
      return weatherData[4];
    } else if (weatherInfo === "Sand") {
      return weatherData[5];
    } else if (weatherInfo === "Ash") {
      return weatherData[6];
    } else if (weatherInfo === "Tornado") {
      return weatherData[7];
    } else if (weatherInfo === "Clear") {
      return weatherData[8];
    } else if (weatherInfo === "Clouds") {
      return weatherData[9];
    } else {
      return "공부하기 좋은날!";
    }
  };

  useEffect(() => {
    askForCoords();
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
                  <h1>Sensory :</h1>
                  <p>{weatherInfo.feelslike}°</p>
                </div>
                <div className={style.humidity}>
                  <h1>Humidity :</h1>
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
