import React from "react";

function AverageRating({ foodRating, serviceRating, ambienceRating, valueRating }) {
  const calculateAverageRating = () => {
    const sum = foodRating + serviceRating + ambienceRating + valueRating;
    const average = sum / 4;
    console.log(foodRating)
    return average.toFixed(1);
  };

  const renderAverageRating = () => {
    const averageRating = calculateAverageRating();
    return <p>{averageRating}</p>;
  };

  return <div className="average-rating">{renderAverageRating()}</div>;
}

export default AverageRating;
