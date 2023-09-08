import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Cuisine.css";
import Navbar from "../navbar/Navbar";

const Cuisine = () => {
  const [cuisineData, setCuisineData] = useState([]);

  const { type } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getData(type);
  }, [type]);

  const getData = async (cuisineType) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisineType}`
    );
    const data = await api.json();
    setCuisineData(data.results);
  };

  const handleClick = (id) => navigate("/recipe/" + id);

  return (
    <div className="container">
      <div className="top-cuisine-container">
        <Navbar />
        <h1 className="top-cuisine-heading">Top Picks of {type} cuisine</h1>
        <div className="cuisine">
          {cuisineData.map((cuisine) => {
            return (
              <div
                className="cuisine-component"
                key={cuisine.id}
                onClick={() => handleClick(cuisine.id)}
              >
                <img
                  src={cuisine.image}
                  alt={cuisine.title}
                  className="cuisine-image"
                />
                <p className="cuisine-title">{cuisine.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cuisine;
