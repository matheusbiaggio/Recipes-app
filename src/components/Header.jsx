import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import SearchBar from './SearchBar';

export default function Header() {
  const { title, search } = useContext(HeaderContext);
  const [toProfile, setToProfile] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <button
        data-testid="profile-top-btn"
        onClick={ () => setToProfile(true) }
        src="src/images/profileIcon.svg"
      >
        Profile
      </button>
      {
        search
        && (
          <button
            type="button"
            src="src/images/searchIcon.svg"
            data-testid="search-top-btn"
            onClick={ () => setSearchBar(!searchBar) }
          >
            Search
          </button>)
      }
      { toProfile && <Redirect to="/profile" /> }

      { searchBar && <SearchBar />}

    </div>
  );
}
