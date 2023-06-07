import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profile-dropdown-container">
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <p>Hello, {user.username}!</p>
           <li>
            <Link to="/user/:id">My Profile</Link>
          </li>
            {/*
          <li>
            <a href="/profile">My Saved Restaurants</a>
          </li>
          <li>
            <a href="/profile">My Dining History</a>
          </li> */}
          <li>
            <a className="logout-button" href="/" onClick={logout}>Sign Out</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
