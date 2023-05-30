import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SearchBar from "./components/Search_Bar";
import RestaurantIndex from "./components/RestaurantScroller/restaurant_index";

function App() {
  return (
    <>
      <Navigation />
      <Route path="/login" />
      <SearchBar />
      <div style={{ width: "100%" }}>
        <RestaurantIndex />
      </div>
    </>
  );
}

export default App;
