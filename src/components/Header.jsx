import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const history = useHistory();

  const handleNavigation = () => {
    history.push('/profile');
  };

  useEffect(() => {
    if (
      history.location.pathname === '/done-recipes'
    || history.location.pathname === '/favorite-recipes'
    || history.location.pathname === '/profile'
    ) {
      setShowButton(false);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    if (
      history.location.pathname === '/done-recipes'
    || history.location.pathname === '/favorite-recipes'
    || history.location.pathname === '/profile'
    ) {
      setShowButton(false);
    }
  }, []);

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <img
        src={ profileIcon }
        alt="Profile"
        data-testid="profile-top-btn"
        onClick={ () => (handleNavigation()) }
        aria-hidden="true"
      />
      {
        showButton
        && (
          <img
            src={ searchIcon }
            alt="Search"
            data-testid="search-top-btn"
            onClick={ () => setSearchBar(!searchBar) }
            aria-hidden="true"
          />)
      }
      { searchBar && <SearchBar />}

    </div>
  );
}

Header.propTypes = {
  title: Proptypes.string.isRequired,
};
