import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from './assets/Logo.png';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <LoginFormModal />
    );
  }

  return (
    <ul>
      <div>
        <NavLink exact to="/" className="nav-link">
          <img src={logo} alt="Home" className="nav-link_logo" />
        </NavLink>
      </div>
      <div>
        {sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
