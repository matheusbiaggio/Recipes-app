import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';

export default function Header() {
  const { title, setTitle } = useContext(HeaderContext);
  const history = useHistory();

  useEffect(() => {
    switch (history.location.pathname) {
    case '/meals':
      setTitle('Meals');
      break;
    case '/drinks':
      setTitle('Dinks');
      break;
    case '/profile':
      setTitle('Profile');
      break;
    case '/done-recipes':
      setTitle('Done Recipes');
      break;
    case '/favorite-recipes':
      setTitle('Favorite Recipes');
      break;
    default:
      console.log('Erro');
    }
  }, [history, setTitle]);

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <img
        alt="profile-icon"
        src="src/images/profileIcon.svg"
        data-testid="profile-top-btn"
      />
      <img
        alt="search-icon"
        src="src/images/searchIcon.svg"
        data-testid="search-top-btn"
      />
    </div>
  );
}
