import React, { useEffect, useState } from "react";
import "./style.css";
import getIcon from "./geticon";
const Sidebar = ({ weatherData, setWeatherData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchQuery}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`
      );

      if (!response.ok) {
        throw new Error("City not found in our database");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  function getCurrentIndianTime12Hrs() {
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return now.toLocaleString("en-IN", options);
  }

  const currentIndianTime12Hrs = getCurrentIndianTime12Hrs();
  console.log(currentIndianTime12Hrs);
  return (
    <div className="sidebar">
      <form className="search" id="search" onSubmit={handleSubmit}>
        <div className="search-bar">
          <i className="fas fa-search search-icon" onClick={handleSubmit}></i>
          <input
            type="text"
            id="query"
            placeholder="Search for places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <i class="fa-regular fa-circle-xmark" onClick={clearSearch}></i>
          )}
        </div>
      </form>
      <div className="weather-icon">
        <img
          src={getIcon(weatherData?.currentConditions?.icon)}
          alt="Weather Icon"
          height="80%"
        />
      </div>
      <div className="temperature">
        <h1 id="temp">{weatherData?.currentConditions?.temp || 0}</h1>
        <span className="temp-unit">°C</span>
      </div>
      {/* Display other weather data in the sidebar */}
      {weatherData?.days?.slice(0, 1).map((day, index) => (
        <div key={index}>
          <h3>
            {new Date(day.datetime).toLocaleDateString("en-US", {
              weekday: "long",
            })}{" "}
            , {getCurrentIndianTime12Hrs()}
          </h3>
          <span>{day.conditions}</span>
        </div>
      ))}
      <p>Rain: {weatherData?.currentConditions?.precip || 0}%</p>
      <img
        src="https://assets-news.housing.com/news/wp-content/uploads/2021/07/20184714/All-about-the-Delhi-Red-Fort-or-Lal-Kila-FB-1200x700-compressed-2.jpg"
        alt=""
        height="100px"
        style={{ borderRadius: "10%" }}
      />
    </div>
  );
};

export default Sidebar;
