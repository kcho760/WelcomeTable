import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SearchBar from "./components/Search_Bar";
import Carousel from "./components/RestaurantCarousel/restaurant_index";
import RestaurantIndexItem from "./components/RestaurantCarousel/restaurant_index_item";
import RestaurantShowPage from "./components/RestaurantShowPage/restaurantShowPage";

function App() {
  return (
    <Router>
      <Navigation />

      <Route exact path="/">
        {/* Splash Page */}
        <SearchBar />
        <div style={{ width: "100%" }}>
          <p className="category">First Category</p>
          <Carousel slides={RestaurantIndexItem} />
        </div>
        <p className="category">Second Category</p>
        <div style={{ width: "100%" }}>
          <Carousel slides={RestaurantIndexItem} />
        </div>
      </Route>

      <Route path="/restaurants/:id" component={RestaurantShowPage} />
      
    </Router>
  );
}

export default App;
