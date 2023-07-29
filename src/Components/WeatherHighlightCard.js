import React from "react";

const WeatherHighlightCard = ({
  heading,
  value1,
  unit1,
  value2,
  unit2,
  status,
}) => {
  return (
    <div className="card2">
      <h4 className="card-heading">{heading}</h4>
      <div className="content">
        <p className="highlight-value">
          {value1} {unit1}
        </p>
        {unit2 && (
          <p className="highlight-value">
            {value2} {unit2}
          </p>
        )}
        <p className="highlight-status">{status}</p>
      </div>
    </div>
  );
};

export default WeatherHighlightCard;
