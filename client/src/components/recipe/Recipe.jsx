import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});

  const [active, setActice] = useState("instructions");

  // const[clicked, setClicked] = useState(1)

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  const getRecipe = async (recipeId) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await api.json();
    setRecipe(data);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="recipe">
          <div className="recipe-sidebar-left">
            <h3 className="recipe-title">{recipe.title}</h3>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            />
            <p
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
              className="recipe-summary"
            ></p>
          </div>
          <div className="recipe-sidebar-right">
            <div className="sidebar-right-btn">
              <button
                className={
                  active === "instructions"
                    ? "recipe-btn clicked-btn"
                    : "recipe-btn"
                }
                onClick={(event) => {
                  setActice("instructions");
                }}
              >
                Instructions
              </button>
              <button
                className={
                  active === "ingredients"
                    ? "recipe-btn clicked-btn"
                    : "recipe-btn"
                }
                onClick={(event) => {
                  setActice("ingredients");
                }}
              >
                Ingredients
              </button>
            </div>
            {active === "ingredients" && (
              <ul className="recipe-ingredients">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            )}
            {active === "instructions" && (
              <p
                className="recipe-ins"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              ></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Recipe;
