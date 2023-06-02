import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveRestaurant } from "../../store/restaurant";
import { useEffect } from "react";
import "./restaurantShowPage.css";
import restaurantpic2 from "../RestaurantCarousel/assets/restaurantpic2.png";
import StarRating from "../RestaurantCarousel/subcomponents/star_rating";
import AverageRating from "../RestaurantCarousel/subcomponents/average_rating";
import CostRating from "../RestaurantCarousel/subcomponents/cost_rating";

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
  console.log(restaurant.photos)

  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <div className="banner-image-container">
        <img className="banner-image" src={restaurant.photoUrl} alt={restaurant.name} />
      </div>

      <div className="restaurant-info-container">
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
          <a>

          </a>
          <a>

          </a>
          <a>

          </a>
        </div>
        <div id="overview">
          <h1>{restaurant.name}</h1>
          <div className="restaurant-attributes">
            <StarRating
              className="star-rating"
              foodRating={restaurant.foodRating}
              serviceRating={restaurant.serviceRating}
              ambienceRating={restaurant.ambienceRating}
              valueRating={restaurant.valueRating}
            />
            <AverageRating
              className="average-rating"
              foodRating={restaurant.foodRating}
              serviceRating={restaurant.serviceRating}
              ambienceRating={restaurant.ambienceRating}
              valueRating={restaurant.valueRating}
            />
            <p className="review-count"># of Reviews</p>
            <CostRating className="restaurant-price" price={restaurant.price} />
            <p className="restaurant-cuisine">{restaurant.cuisine}</p>
          </div>
          <p className="restaurant-description">{restaurant.description}</p>
        </div>
        <div id="photos">
          <h1># Photos</h1>
          <div className="photos-container">
            <div className="photo-large">
              {/* Larger photo content */}
            </div>
            <div className="photos-small-container">
              <div className="photo-small">
                {/* Smaller photo content */}
              </div>
              <div className="photo-small">
                {/* Smaller photo content */}
              </div>
              <div className="photo-small">
                {/* Smaller photo content */}
              </div>
              <div className="photo-small">
                {/* Smaller photo content */}
              </div>
            </div>
          </div>
        </div>
        <div id="menu">
          <h1>Menu</h1>
          {/* Rest of the content */}
        </div>

        {/* Fake content for testing scrolling */}
        {[...Array(30)].map((_, index) => (
          <div key={index}>FAKE FAKE FAKE</div>
        ))}

        <div id="reviews">
          <h1>Reviews</h1>
          {/* Rest of the content */}
        </div>
      </div>

    </div>
  );
};

export default RestaurantShowPage;
