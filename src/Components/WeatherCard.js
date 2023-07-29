import React from "react";
import getIcon from "./geticon";

const WeatherCard = ({ data, unit, convertToFahrenheit, dayOfWeek }) => {
  return (
    <div className="card">
      <p>{dayOfWeek}</p>
      <p>{data.datetime}</p>
      <img className="image-today"
        src={getIcon(data.icon)}
        alt={data.icon}
      
      />
      <div className="temperature">
        <p>
          {unit === "C"
            ? `${data.temp}°C`
            : `${convertToFahrenheit(data.temp)}°F`}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
