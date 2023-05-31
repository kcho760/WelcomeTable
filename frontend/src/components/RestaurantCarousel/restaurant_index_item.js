import React, {useEffect} from "react";
import { retreiveRestaurant } from "../../store/restaurant";
import Restaurantpic1 from "./assets/Restaurantpic1.png";
function RestaurantIndexItem({ restaurant }) {
  if (!restaurant) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="restaurant-item">
      <div className="restaurant-image-container">
        <img className="restaurant-image" src={Restaurantpic1} alt={restaurant.name} />
      </div>
      <div className="restaurant-info">
        <p>{restaurant.name}</p>
        <p>{restaurant.city}</p>
      </div>
    </div>
  );
}

export default RestaurantIndexItem;
