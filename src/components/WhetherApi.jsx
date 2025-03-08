import { useEffect } from "react";

const WeatherApi = ({ cityInput, setWeatherData, setError }) => {
  useEffect(() => {
    const API_KEY = "5f1aa54a6eed1a3fa818939a45dda4b1";
    const city = cityInput.city;

    const fetchWeather = async () => {
      if (city !== "") {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          if (response.ok) {
            setWeatherData({
              city: data.name,
              weather: data.weather[0].main,
              temp: data.main.temp,
              humidity: data.main.humidity,
              visibility: data.visibility,
              wind: data.wind.speed,
            });
            localStorage.setItem(
              "weatherData",
              JSON.stringify({
                city: data.name,
                weather: data.weather[0].main,
                temp: data.main.temp,
                humidity: data.main.humidity,
                visibility: data.visibility,
                wind: data.wind.speed,
              })
            );
          }
        } catch (error) {
          setError((prev) => ({ ...prev, wrongName: true }));
        }
      }
    };

    fetchWeather();
  }, [cityInput.fetchWeather]);

  return;
};

export default WeatherApi;
