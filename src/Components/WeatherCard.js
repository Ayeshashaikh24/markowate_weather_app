import React from "react";
import getIcon from "./geticon";

const WeatherCard = ({ data, unit, convertToFahrenheit, dayOfWeek }) => {
  return (
    <div className="card">
      <p>{dayOfWeek}</p>
      <p>{data.datetime}</p>
      <img
        src={getIcon(data.icon)}
        alt={data.icon}
        height="50px"
        width="30px"
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
