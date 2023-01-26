import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const history = useHistory();

  const handleNavegation = () => {
    history.push('/profile');
  };

  useEffect(() => {
    if (
      history.location.pathname === '/meals'
    || history.location.pathname === '/drinks'
    ) {
      setShowButton(true);
    }
  }, [history.location.pathname]);

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <button
        onClick={ handleNavegation }
      >
        <img
          src="src/images/profileIcon.svg"
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </button>
      {
        showButton
        && (
          <button
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img
              src="src/images/searchIcon.svg"
              alt="Profile"
              data-testid="search-top-btn"
            />
          </button>)
      }
      { searchBar && <SearchBar />}

    </div>
  );
}

Header.propTypes = {
  title: Proptypes.string.isRequired,
};
