import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
const Search = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/searched/" + search);
  };
  return (
    <div className="search-component">
      <h1 className="search-heading">Find a recipe</h1>
      <form className="search-bar" onSubmit={submitHandler}>
        <IoFastFoodOutline className="search-burger" />
        <input type="text" value={search} onChange={handleChange} />
      </form>
    </div>
  );
};

export default Search;
