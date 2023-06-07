import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveRestaurant } from "../../store/restaurant";
import { useEffect, useState } from "react";
import "./restaurantShowPage.css";
import StarRating from "../RestaurantCarousel/subcomponents/star_rating";
import AverageRating from "../RestaurantCarousel/subcomponents/average_rating";
import CostRating from "../RestaurantCarousel/subcomponents/cost_rating";
import ReservationForm from "./reservationForm";


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
        <img className="banner-image" src={restaurant.photoUrls[0]} alt={restaurant.name} />
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
              <img className="photo-large-image" src={restaurant.photoUrls[0]} alt={restaurant.name} />
            </div>
            <div className="photos-small-container">
              <div className="photo-small">
                <img className="photo-small-image" src={restaurant.photoUrls[1]} alt={restaurant.name} />
              </div>
              <div className="photo-small">
                <img className="photo-small-image" src={restaurant.photoUrls[2]} alt={restaurant.name} />
              </div>
              <div className="photo-small">
                <img className="photo-small-image" src={restaurant.photoUrls[3]} alt={restaurant.name} />
              </div>
              <div className="photo-small">
                <img className="photo-small-image" src={restaurant.photoUrls[4]} alt={restaurant.name} />
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

      <div className="reservation-container-outer">
        <div className="reservation-form-container">
          <ReservationForm restaurant={restaurant} />
        </div>
      </div>
    <div className="additional-info-container">
  <h1>Additional Info</h1>
  <div>
    <h2>Cross Street</h2>
    <p>{restaurant.crossStreet}</p>
  </div>
  <div>
    <h2>Hours of Operation</h2>
    <p>{restaurant.hoursOfOperation}</p>
  </div>
  <div>
    <h2>Cuisines</h2>
    <p>{restaurant.cuisine}</p>
  </div>
  <div>
    <h2>Dining Style</h2>
    <p>{restaurant.diningStyle}</p>
  </div>
  <div>
    <h2>Dress Code</h2>
    <p>{restaurant.dressCode}</p>
  </div>
  <div>
    <h2>Parking Details</h2>
    <p>{restaurant.parkingDetails}</p>
  </div>
  <div>
    <h2>Public Transit</h2>
    <p>{restaurant.publicTransit}</p>
  </div>
  <div>
    <h2>Payment Options</h2>
    <p>{restaurant.paymentOptions}</p>
  </div>
  <div>
    <h2>Website</h2>
    <p><a href={restaurant.website}>{restaurant.website}</a></p>
  </div>
  <div>
    <h2>Phone Number</h2>
    <p>{restaurant.phone}</p>
  </div>
</div>

    </div>
  );
};

export default RestaurantShowPage;
