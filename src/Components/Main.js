import React, { useState } from "react";
import getIcon from "./geticon";
import WeatherCard from "./WeatherCard";
import WeatherHighlightCard from "./WeatherHighlightCard";

const Main = ({ weatherData }) => {
  const [unit, setUnit] = useState("C");
  const [selectedInterval, setSelectedInterval] = useState("week");

  const convertToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit.toFixed(2);
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
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
            className={`hourly ${selectedInterval === "today" ? "active" : ""}`}
            onClick={() => setSelectedInterval("today")}
          >
            today
          </button>
          <button
            className={`week ${selectedInterval === "week" ? "active" : ""}`}
            onClick={() => setSelectedInterval("week")}
          >
            week
          </button>
        </ul>
        <ul className="options units">
          <button
            className={`celcius ${unit === "C" ? "active" : ""}`}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <button
            className={`fahrenheit ${unit === "F" ? "active" : ""}`}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
          <div style={{ width: "40px" }}>
            <img
              src="https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?w=2000"
              height="40px"
              alt=""
              width=".1%"
            />
          </div>
        </ul>
      </nav>

      {selectedInterval === "today" && (
        <div className="hourly-forecast">
          {weatherData?.days?.slice(0, 1).map((day, index) => (
            <div key={index}>
              <div className="hourly-data">
                {day?.hours?.map((hourData, hourIndex) => (
                  <WeatherCard
                    key={hourIndex}
                    data={hourData}
                    unit={unit}
                    convertToFahrenheit={convertToFahrenheit}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cards" id="weather-cards">
        {selectedInterval === "week" &&
          weatherData?.days?.slice(0, 7).map((day, index) => (
            <div className="card" key={index}>
              <h3>
                {new Date(day.datetime).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h3>

              <img src={getIcon(day.icon)} alt={day.icon} height="40px" />
              <div className="temperature">
                <p>
                  {unit === "C"
                    ? `${day.temp}°C`
                    : `${convertToFahrenheit(day.temp)}°F`}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="highlights">
        <h2 className="heading">today's highlights</h2>
        <div className="cards">
          <WeatherHighlightCard
            heading="UV Index"
            value1={weatherData?.currentConditions?.uvindex || 0}
            unit1=""
            status={measureUvIndex(
              weatherData?.currentConditions?.uvindex || 0
            )}
          />
          <WeatherHighlightCard
            heading="Wind Status"
            value1={weatherData?.currentConditions?.windspeed || 0}
            unit1=""
            status="km/h"
          />
          <WeatherHighlightCard
            heading="Sunrise & Sunset"
            value1={weatherData?.currentConditions?.sunrise || 0}
            unit1="am"
            value2={weatherData?.currentConditions?.sunset || 0}
            unit2="pm"
            status=""
          />
          <WeatherHighlightCard
            heading="Humidity"
            value1={weatherData?.currentConditions?.humidity || 0}
            unit1="%"
            status={updateHumidityStatus(
              weatherData?.currentConditions?.humidity || 0
            )}
          />

          <WeatherHighlightCard
            heading="Visibility"
            value1={weatherData?.currentConditions?.visibility || 0}
            unit1=""
            status={updateVisibilityStatus(
              weatherData?.currentConditions?.visibility || 0
            )}
          />

          <WeatherHighlightCard
            heading="Air Quality"
            value1={weatherData?.currentConditions?.winddir || 0}
            unit1=""
            status={updateAirQualityStatus(
              weatherData?.currentConditions?.winddir || 0
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
