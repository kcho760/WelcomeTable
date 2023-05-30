import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SearchBar from "./components/Search_Bar";
import Carousel from "./components/RestaurantCarousel/restaurant_index";
import slidesData from "../src/components/RestaurantCarousel/slidesData";


function App() {
  return (
    <>
      <Navigation />
      <Route path="/login" />
      <SearchBar />
      <div style={{ width: "100%" }}>
      <p className="category">First Category</p>
        <Carousel slides={slidesData} />
      </div>
      <p className="category">Second Category</p>
      <div style={{ width: "100%" }}>
        <Carousel slides={slidesData} />
      </div>
    </>
  );
}

export default App;
