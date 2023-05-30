import React, { useState } from "react";
import RestaurantIndexItem from "./restaurant_index_item";
import items from "./slidesData";
import "./restaurantIndex.css";
import back from './assets/back.png';
import next from './assets/next.png';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const startIndex = activeIndex;
  const endIndex = activeIndex + 4;

  function goToPrevSlide() {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? prevIndex : newIndex;
    });
  }
  
  function goToNextSlide() {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex > 5 ? prevIndex : newIndex;
    });
  }
  

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div className="carousel_wrap">
      <div className="carousel_inner">
        <button className="nav-button-left" onClick={goToPrevSlide}>
          <img src={back} alt="Previous" />
        </button>
        <div className="carousel_container">
          <ul className="carousel_slide-list">
            {visibleItems.map((item, index) => (
              <RestaurantIndexItem
                key={index}
                item={item}
                active={index === activeIndex - startIndex}
              />
            ))}
          </ul>
        </div>
        <button className="nav-button-right" onClick={goToNextSlide}>
          <img src={next} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
