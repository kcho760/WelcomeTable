import React, { useState } from "react";
import RestaurantIndexItem from "./restaurant_index_item";
import items from "./slidesData";
import "./restaurantIndex.css";
import back from './assets/back.png';
import next from './assets/next.png';

const Carousel = () => {
  const [slideOffset, setSlideOffset] = useState(0);
  const [index,setIndex] = useState(0);
  const itemsPerPage = 8;

  function goToPrevSlide() {
    if (index > 0) {
      setSlideOffset((prevOffset) => prevOffset + 135 / itemsPerPage);
      setIndex(index - 1);
    }else{
      setSlideOffset((prevOffset) => prevOffset + 50 / itemsPerPage);
      setTimeout(() => {
        setSlideOffset((prevOffset) => prevOffset - 50 / itemsPerPage);
      }, 300);
    }
  }

  function goToNextSlide() {
    if (index !== items.length - 5) {
      
      setSlideOffset((prevOffset) => prevOffset - 135 / itemsPerPage);
      setIndex(index + 1);
    }else{
      setSlideOffset((prevOffset) => prevOffset - 50 / itemsPerPage);
      setTimeout(() => {
        setSlideOffset((prevOffset) => prevOffset + 50 / itemsPerPage);
      }, 300);
    }
  }

  const slideStyles = {
    transform: `translateX(${slideOffset}%)`,
    transition: "transform .5s ease-in-out",
  };

  return (
    <div className="carousel_wrap">
      <div className="carousel_inner">
        <button className="nav-button-left" onClick={goToPrevSlide}>
          <img src={back} alt="Previous" />
        </button>
        <div className="carousel_container">
          <ul className="carousel_slide-list" style={slideStyles}>
            {items.map((item, index) => (
              <li className="restaurant-item" key={index}>
                <RestaurantIndexItem
                  item={item}
                  active={index >= 0 && index < itemsPerPage}
                />
              </li>
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
