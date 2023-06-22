import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveRestaurant } from "../../store/restaurant";
import { retrieveReviewsByRestaurantId } from "../../store/review";
import { useEffect } from "react";
import "./restaurantShowPage.css";
import StarRating from "../RestaurantCarousel/subcomponents/star_rating";
import AverageRating from "../RestaurantCarousel/subcomponents/average_rating";
import CostRating from "../RestaurantCarousel/subcomponents/cost_rating";
import ReservationForm from "./reservationForm";
import Footer from "../Footer/footer";
import ReviewList from "../Review/review";
import CreateReview from "../Review/createReview";

const RestaurantShowPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant[id]);
  const reviews = useSelector((state) => state.review.reviews);

  useEffect(() => {
    dispatch(retrieveRestaurant(id));
    dispatch(retrieveReviewsByRestaurantId(id));
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
    <>
      <div className="page-container">
        <div className="content">
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
              <a href="#reviews" onClick={(e) => handleScroll(e, "reviews")}>
                Reviews
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
                <p className="review-count">{reviews.length} Reviews</p>
                <CostRating className="restaurant-price" price={restaurant.price} />
                <p className="restaurant-show-cuisine">{restaurant.cuisine}</p>
              </div>
              <p className="restaurant-description">{restaurant.description}</p>
            </div>

            <div id="photos">
              <h1>{restaurant.photoUrls.length} Photos</h1>
              {/* Photo content */}
            </div>

            <div id="reviews">
              <h1>Reviews</h1>
              <CreateReview restaurantId={restaurant.id} />
              <ReviewList reviews={reviews} />
            </div>
          </div>

          <div className="reservation-container-outer">
            <div className="reservation-form-container">

              <ReservationForm restaurant={restaurant} />
            </div>
          </div>

          <div className="additional-info-container">
            {/* Additional info content */}
          </div>
        </div>
      </div>
      <div>
        <Footer className="showpage-footer" />
      </div>
    </>
  );
};

export default RestaurantShowPage;
