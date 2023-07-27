import React, { useState } from 'react';
import getIcon from "./geticon";

const Main = ({ weatherData }) => {



  const [unit, setUnit] = useState('C');
  const [selectedInterval, setSelectedInterval] = useState('week');
  
  const convertToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit.toFixed(2);
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };
  const measureUvIndex = (uvIndex) => {
    if (uvIndex <= 2) {
      return "Low";
    } else if (uvIndex <= 5) {
      return "Moderate";
    } else if (uvIndex <= 7) {
      return "High";
    } else if (uvIndex <= 10) {
      return "Very High";
    } else {
      return "Extreme";
    }
  };

  const updateHumidityStatus = (humidity) => {
    if (humidity <= 30) {
      return "Low";
    } else if (humidity <= 60) {
      return "Moderate";
    } else {
      return "High";
    }
  };


  const updateAirQualityStatus = (airquality) => {
    if (airquality <= 50) {
      return "Good👌";
    } else if (airquality <= 100) {
      return "Moderate😐";
    } else if (airquality <= 150) {
      return "Unhealthy for Sensitive Groups😷";
    } else if (airquality <= 200) {
      return "Unhealthy😷";
    } else if (airquality <= 250) {
      return "Very Unhealthy😨";
    } else {
      return "Hazardous😱";
    }
  };

  const updateVisibilityStatus = (visibility) => {
    if (visibility <= 0.03) {
      return "Dense Fog";
    } else if (visibility <= 0.16) {
      return "Moderate Fog";
    } else if (visibility <= 0.35) {
      return "Light Fog";
    } else if (visibility <= 1.13) {
      return "Very Light Fog";
    } else if (visibility <= 2.16) {
      return "Light Mist";
    } else if (visibility <= 5.4) {
      return "Very Light Mist";
    } else if (visibility <= 10.8) {
      return "Clear Air";
    } else {
      return "Very Clear Air";
    }
  };
  return (
    <div className="main">
      <nav>
      <ul className="options">
          <button
            className={`hourly ${selectedInterval === 'today' ? 'active' : ''}`}
            onClick={() => setSelectedInterval('today')}
          >
            today
          </button>
          <button
            className={`week ${selectedInterval === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedInterval('week')}
          >
            week
          </button>
        </ul>
        <ul className="options units">
          <button
            className={`celcius ${unit === 'C' ? 'active' : ''}`}
            onClick={() => setUnit('C')}
          >
            °C
          </button>
          <button
            className={`fahrenheit ${unit === 'F' ? 'active' : ''}`}
            onClick={() => setUnit('F')}
          >
            °F
          </button>
      
        
        <img src='https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?w=2000' height="50px" width=".1%"      />
        </ul>
      </nav>
    
      {selectedInterval === 'today' && (
  <div className="hourly-forecast">
    {weatherData?.days?.slice(0,1).map((day, index) => (
      <div  key={index}>
       <div className="hourly-data">
        {day?.hours?.map((hourData, hourIndex) => (
          <div className="card"  key={hourIndex}>
           <p>{hourData.datetime}</p>
            <img src={getIcon(hourData.icon)} alt={hourData.icon} height="50px" width="30px"/>
            <div className="temperature">
              <p>
                {unit === 'C' ? `${hourData.temp}°C` : `${convertToFahrenheit(hourData.temp)}°F`}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    ))}
  </div>
)}


  <div className="cards" id="weather-cards">

        {selectedInterval === 'week' && (
          weatherData?.days?.slice(0, 7).map((day, index) => (
            <div className="card" key={index}>
              <h3>{new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short' })}</h3>

              <img src={getIcon(day.icon)} alt={day.icon} height="40px"  />
              <div className="temperature">
                <p>
                  {unit === 'C' ? `${day.temp}°C` : `${convertToFahrenheit(day.temp)}°F`}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="highlights">
        <h2 className="heading">today's highlights</h2>
        <div className="cards">
          <div className="card2">
            <h4 className="card-heading">UV Index</h4>
            <div className="content">
              <p className="uv-index">{weatherData?.currentConditions?.uvindex || 0}</p>
              <p className="uv-text">{measureUvIndex(weatherData?.currentConditions?.uvindex || 0)}</p>
            </div>
          </div>
          <div class="card2">
              <h4 class="card-heading">Wind Status</h4>
              <div class="content">
                <p class="wind-speed">{weatherData?.currentConditions?.windspeed || 0}</p>
                <p>km/h</p>
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Sunrise & Sunset</h4>
              <div class="content">
                <p class="sun-rise">{weatherData?.currentConditions?.sunrise || 0} am</p>
                <p class="sun-set">{weatherData?.currentConditions?.sunset || 0} pm</p>
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Humidity</h4>
              <div class="content">
                <p class="humidity">{weatherData?.currentConditions?.humidity || 0} %</p>
                <p class="humidity-status">{updateHumidityStatus(weatherData?.currentConditions?.humidity || 0)} </p>
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Visibility</h4>
              <div class="content">
                <p class="visibilty">{weatherData?.currentConditions?.visibility || 0} <sub>km</sub></p>
                <p class="visibilty-status">{updateVisibilityStatus(weatherData?.currentConditions?.visibility || 0)}</p>
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Air Quality</h4>
              <div class="content">
                <p class="air-quality">{weatherData?.currentConditions?.winddir || 0}</p>
                <p class="air-quality-status">{updateAirQualityStatus(weatherData?.currentConditions?.winddir || 0)}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Main;
