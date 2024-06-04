import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { IoMenu } from "react-icons/io5";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(false); // New state to track if the button is active
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
    setIsActive(!isActive); // Toggle isActive state
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setIsActive(false); // Set isActive to false when menu is closed
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button
        onClick={toggleMenu}
        className={isActive ? "button-active" : "button-normal"}
      >
        <IoMenu className="profile-button-lines" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.username}</li>
        {/* <li>
          {user.firstName} {user.lastName}
        </li> */}
        <li>{user.email}</li>
        {/* // ! Link this to manage spots */}
        <li>Manage Spots</li>
        <li>
          <div className="logout-button">
            <button onClick={logout}>Log Out</button>
          </div>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
