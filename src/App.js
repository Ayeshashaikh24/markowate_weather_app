import "@fortawesome/fontawesome-free/css/all.css";

import React, { useState, useEffect } from "react";

import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";

const App = () => {
  // State to manage weather data
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Function to fetch weather data based on the default location (you can set your default location here)
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/default?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(weatherData);
    fetchWeatherData();
  }, []);

  return (
    <div className="wrapper">
      <Sidebar weatherData={weatherData} setWeatherData={setWeatherData} />
      <Main weatherData={weatherData} />
    </div>
  );
};

export default App;
