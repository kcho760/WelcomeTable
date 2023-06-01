import React, {useEffect} from "react";
import { retreiveRestaurant } from "../../store/restaurant";
import restaurantpic2 from "./assets/restaurantpic2.png";
import StarRating from "./subcomponents/star_rating";
function RestaurantIndexItem({ restaurant }) {
  if (!restaurant) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="restaurant-item">
      <div className="restaurant-image-container">
        <img className="restaurant-image" src={restaurantpic2} alt={restaurant.name} />
      </div>
      <div className="restaurant-info">
        <p>{restaurant.name}</p>
        <p>{restaurant.city}</p>
        <StarRating
          foodRating={restaurant.foodRating}
          serviceRating={restaurant.serviceRating}
          ambienceRating={restaurant.ambienceRating}
          valueRating={restaurant.valueRating}
        />
      </div>
    </div>
  );
}

export default RestaurantIndexItem;
