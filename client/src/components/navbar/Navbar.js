import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../../redux/features/userSlice/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <div className="navbar">
      <NavLink to={"/"}>
        <h4 className="navbar-brand">Hungry ?</h4>
      </NavLink>

      <div className="navbar-cuisine">
        <NavLink to={"/cuisine/indian"}>Indian</NavLink>
        <NavLink to={"/cuisine/korean"}>Korean</NavLink>
        <NavLink to={"/cuisine/italian"}>Italian</NavLink>
        <NavLink to={"/cuisine/japanese"}>Japanese</NavLink>
        <NavLink onClick={handleLogout}>Logout</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
