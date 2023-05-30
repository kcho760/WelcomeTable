import React from "react";

function RestaurantIndexItem({ item }) {
  return (
    <div className="restaurant-item">
      <div className="restaurant-image-container">
        <img className="restaurant-image" src={item.image} alt={item.name} />
      </div>
      <div className="restaurant-info">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default RestaurantIndexItem;
