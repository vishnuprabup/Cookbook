import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../../redux/features/userSlice/userSlice";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const className = isActive ? "active" : "inactive";
  const handleburger = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-brand">
          <NavLink to={"/"}>Hungry ?</NavLink>
        </div>
        <div className={`navbar-cuisine ${className}`}>
          <NavLink to={"/cuisine/indian"}>Indian</NavLink>
          <NavLink to={"/cuisine/korean"}>Korean</NavLink>
          <NavLink to={"/cuisine/italian"}>Italian</NavLink>
          <NavLink to={"/cuisine/japanese"}>Japanese</NavLink>
          <NavLink onClick={handleLogout}>Logout</NavLink>
        </div>
        <div className={`hamburger ${className}`} onClick={handleburger}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
