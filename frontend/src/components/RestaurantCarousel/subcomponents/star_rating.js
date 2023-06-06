import React from "react";

function StarRating({ foodRating, serviceRating, ambienceRating, valueRating }) {
  const calculateAverageRating = () => {
    const sum = foodRating + serviceRating + ambienceRating + valueRating;
    const average = sum / 4;
    return average;
  };

  const renderStarRating = () => {
    const averageRating = calculateAverageRating();
    const filledStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={`filled-star-${i}`} className="fas fa-star" style={{ color: '#da3743' }}></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt" style={{ color: '#da3743' }}></i>);
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-star-${i}`} className="far fa-star" style={{ color: '#da3743' }}></i>);
    }

    return stars;
  };

  return <div className="star-rating">{renderStarRating()}</div>;
}

export default StarRating;
