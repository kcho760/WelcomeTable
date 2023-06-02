import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveRestaurant } from "../../store/restaurant";
import { useEffect } from "react";
import "./restaurantShowPage.css";
import restaurantpic2 from "../RestaurantCarousel/assets/restaurantpic2.png";

const RestaurantShowPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant[id]);

  useEffect(() => {
    dispatch(retrieveRestaurant(id));
  }, [dispatch, id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="banner-image-container">
        <img className="banner-image" src={restaurantpic2} alt={restaurant.name} />
      </div>
      <div className="nav-bar">
        <a href="#overview" onClick={(e) => handleScroll(e, "overview")}>
          Overview
        </a>
        <a href="#photos" onClick={(e) => handleScroll(e, "photos")}>
          Photos
        </a>
        <a href="#menu" onClick={(e) => handleScroll(e, "menu")}>
          Menu
        </a>
        <a href="#reviews" onClick={(e) => handleScroll(e, "reviews")}>
          Reviews
        </a>
      </div>
      <div id="overview">
        <h2>Overview Section</h2>
        {/* Rest of the content */}
      </div>
      <div id="photos">
        <h2>Photos Section</h2>
        {/* Rest of the content */}
      </div>
      <div id="menu">
        <h2>Menu Section</h2>
        {/* Rest of the content */}
      </div>
      <div id="reviews">
        <h2>Reviews Section</h2>
        {/* Rest of the content */}
      </div>

    </div>
  );
};

export default RestaurantShowPage;
