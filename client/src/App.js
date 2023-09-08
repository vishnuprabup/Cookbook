import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import Cuisine from "./components/cuisine/Cuisine";
import Searched from "./components/searched/Searched";
import Recipe from "./components/recipe/Recipe";
import NoResult from "./components/not-found/NoResult";
import Auth from "./components/auth/Auth";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/auth" />}
      ></Route>
      <Route path="/cuisine/:type" element={<Cuisine />}></Route>
      <Route path="/searched/:search" element={<Searched />}></Route>
      <Route path="/recipe/:id" element={<Recipe />}></Route>
      <Route path="*" element={<NoResult />}></Route>
      <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
    </Routes>
  );
};
export default App;
