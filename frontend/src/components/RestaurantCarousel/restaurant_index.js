import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import RestaurantIndexItem from "./restaurant_index_item";
import "./restaurantIndex.css";
import {retreiveRestaurants} from "../../store/restaurant";
import back from './assets/back.png';
import next from './assets/next.png';

const Carousel = () => {
  const [slideOffset, setSlideOffset] = useState(0);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 6.2;
  const dispatch = useDispatch();
  const restaurants = useSelector(state => Object.values(state.restaurant));

  useEffect(() => {
    dispatch(retreiveRestaurants());
  }, [dispatch]);

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
    if (index !== restaurants.length - 5) {
      
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
  if (!restaurants) {
    return null;
  } 
  return (
    <div className="carousel_wrap">
      <div className="carousel_inner">
        <button className="nav-button-left" onClick={goToPrevSlide}>
          <img src={back} alt="Previous" />
        </button>
        <div className="carousel_container">
          <ul className="carousel_slide-list" style={slideStyles}>
            {restaurants.map((restaurant) => (
              <li className="restaurant-item-outer" key={restaurant.id}>
                <RestaurantIndexItem
                  restaurant={restaurant}
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
