import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './components/Navigation';
import SearchBar from './components/Search_Bar';
import Carousel from './components/RestaurantCarousel/restaurant_index';
import RestaurantShowPage from './components/RestaurantShowPage/restaurantShowPage';
import UserProfile from './components/Profile/profilePage';
import Confirmation from './components/Confirmation/Confirmation';
import SearchIndex from './components/SearchIndexPage/SearchIndex';
import Footer from './components/Footer/footer';
import { getAllCuisines } from './store/search';

function App() {
  const dispatch = useDispatch();
  const cuisineTypes = useSelector(state => state.search.cuisines.cuisines);

  useEffect(() => {
    dispatch(getAllCuisines());
  }, [dispatch]);

  return (
    <Router>
      <Navigation />

      <Route exact path="/">
        {/* Splash Page */}
        <SearchBar text="When you're too cheap for real restaurants" />
        {cuisineTypes && cuisineTypes.length > 0 ? (
          cuisineTypes.map((cuisineType, index) => (
            <div key={index} style={{ width: '100%' }}>
              <p className="category">{cuisineType}</p>
              <Carousel cuisine={cuisineType} />
            </div>
          ))
        ) : (
          <p>Loading cuisine types...</p>
        )}

        <Footer className="splash-page-footer"/>
      </Route>

      <Route path="/restaurants/:id">
        <RestaurantShowPage />
      </Route>

      <Route path="/user/:id" component={UserProfile} />

      <Route path="/reservation/:id" component={Confirmation} />

      <Route path="/search/:searchTerm" component={SearchIndex} />
    </Router>
  );
}

export default App;
