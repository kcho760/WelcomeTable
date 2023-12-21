import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginButton from '../LoginFormModal/LoginButton';
import logo from './assets/Logo.png';
import github from './assets/github-logo.png';
import linkedin from './assets/LI-In-Bug.png';
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
      <LoginButton />
    );
  }

  return (
    <ul>
      <div>
        <NavLink exact to="/" className="nav-link">
          <img src={logo} alt="Home" className="nav-link_logo" />
        </NavLink>
      </div>
      <a href='https://github.com/kcho760/WelcomeTable'>
        <img src={github} alt='GitHub' className='github' />
      </a>
      <a href='https://www.linkedin.com/in/kevin-cho-441a34b1/'>
        <img src={linkedin} alt='GitHub' className='linkedin' />
      </a>

      <div>
        {sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
