import React from "react";
import RestaurantIndexItem from "./restaurant_index_item";
import "./restaurantIndex.css";
import Restaurantpic1 from './assets/Restaurantpic1.png';

function RestaurantIndex() {
  const items = [
    {
      name: "Restaurant 1",
      description: "Description 1",
      image: Restaurantpic1,
    },
    {
      name: "Restaurant 2",
      description: "Description 2",
      image: Restaurantpic1,
    },
    {
      name: "Restaurant 3",
      description: "Description 3",
      image: Restaurantpic1,
    },
  ];

  return (
    <div className="restaurant-index-container">
      <div className="restaurant-index-box">
        {items.map((item, index) => (
          <RestaurantIndexItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantIndex;
