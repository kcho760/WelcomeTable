import React from "react";
import { Link } from "react-router-dom";
import RestaurantStarRating from "./subcomponents/restaurant_star_rating";
import CostRating from "./subcomponents/cost_rating";
import graph from "./assets/graph.png";

function RestaurantIndexItem({ restaurant }) {
  if (!restaurant) {
    return <div>Loading...</div>;
  }
  return (
    <div className="restaurant-item">
      <Link to={`/restaurants/${restaurant.id}`}>
        <div className="restaurant-image-container">
          <img className="restaurant-image" src={restaurant.photoUrls[0]} alt={restaurant.name} />
        </div>
        <div className="restaurant-info">
          <p className="restaurant-name">{restaurant.name}</p>
          <div className="StarRating-container">
            <RestaurantStarRating
              restaurantId={restaurant.id}
            />
            <p className="restaurant-review-count">{restaurant.reviewCount}0 reviews</p>
          </div>
          <div className="cuisine-container">
            <p className="restaurant-cuisine">{restaurant.cuisine}</p>
            <div className="dot-1">&#x2022;</div>
            <CostRating className="restaurant-price" price={restaurant.price} />
            <div className="dot-2">&#x2022;</div>
            <p className="restaurant-city">{restaurant.city}</p>
          </div>
          <div className="booking-container">
            <img className="graph" src={graph} alt="graph"></img>
            <p className="restaurant-daily-booking">Booked X times today</p>
          </div>
          <div className="reservation-container">
            <button className="restaurant-reservation-button">10:00 AM</button>
            <button className="restaurant-reservation-button">10:15 AM</button>
            <button className="restaurant-reservation-button">10:30 AM</button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantIndexItem;
