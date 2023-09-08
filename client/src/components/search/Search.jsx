import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { FaHamburger } from "react-icons/fa";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/searched/" + search);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => navigate("/recipe/" + data.recipes[0].id.toString()));
  };

  return (
    <div className="container">
      <div className="search-component">
        <div className="search-heading">
          <h1>Find a recipe</h1>
        </div>
        <form onSubmit={submitHandler} className="search-bar">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Biriyani..."
          />
        </form>
        <div className="surprise-component">
          <button className="surprise-btn" onClick={handleClick}>
            Surprise Me <FaHamburger className="surprise-noodle" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
