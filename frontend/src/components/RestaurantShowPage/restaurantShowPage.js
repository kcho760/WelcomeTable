import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveRestaurant } from "../../store/restaurant";
import { useEffect } from "react";

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

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.city}</p>
    </div>
  );
};

export default RestaurantShowPage;
