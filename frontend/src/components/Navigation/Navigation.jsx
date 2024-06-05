import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

import catbnblogo from "../../../src/assets/catbnb-logo.jpg";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <>
    <li>
    <NavLink to='/spots/new' className='create-a-new-spot'>Create a New Spot</NavLink>
    </li>
    <li>
      <ProfileButton user={sessionUser} className="user-buttons" />
    </li>
    </>
  ) : (
    <>
      {/* <li>
        <OpenModalButton
          className="sign-up-button"
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />

      </li>
      <li>
        <OpenModalButton
          className="log-in-button"
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />

      </li> */}
      <li>
        <ProfileButton user={null} className="user-buttons" />
      </li>
    </>
  );

  return (
    <>
      <nav id="navbar">
        <NavLink id="home-icon" to="/" style={{fontSize: '20px'}}>
          <img
            src={catbnblogo}
            style={{ height: "35px", width: "auto" }}
            alt="CatBnB logo"
          />
          catbnb
        </NavLink>
        <div id="nav-right-side">
          {isLoaded && sessionLinks}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
