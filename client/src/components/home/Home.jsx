import React from "react";

import Navbar from "../navbar/Navbar";
import Search from "../search/Search";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="container">
        <Search />
      </div>
    </div>
  );
};

export default Home;
