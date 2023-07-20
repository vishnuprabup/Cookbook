import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import Navbar from "../navbar/Navbar";

const Searched = () => {
  const { search } = useParams();

  const navigate = useNavigate();

  const [value, setValue] = useState(search);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    getSearched(value);
  }, [value]);

  const getSearched = async (searched) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searched}`
    );
    const data = await api.json();
    setSearchData(data.results);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/searched/" + value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = (id) => navigate("/recipe/" + id);

  return (
    <div className="searched-component">
      <Navbar />
      <form className="searched-search-bar" onSubmit={submitHandler}>
        <IoFastFoodOutline className="searched-burger" />
        <input type="text" value={value} onChange={handleChange} />
      </form>
      <div className="cuisine">
        {searchData.map((cuisine) => {
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
  );
};

export default Searched;
