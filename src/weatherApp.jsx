import { useState } from 'react';
import './weatherApp.css';

export const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "apiKey";
  const difKelvin = 273.15;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${apiKey}&lang=es`);
      const data = await response.json();
      if (data.cod === '404') {
        setError('Ciudad no encontrada');
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      console.error('Ha habido un error: ', error);
      setError('Error al obtener los datos del clima');
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container">
      <h1>Aplicación de clima</h1>
      <form>
        <input type="text" placeholder="Ingresa una ciudad" value={city} onChange={handleCityChange}/>
        <button type="submit" onClick={handleSubmit}>Buscar</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>La temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
          <p>La condición meteorológica es: {weatherData.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
        </div>
      )}
    </div>
  );
};
