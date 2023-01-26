import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';

export default function Header() {
  const { title, search } = useContext(HeaderContext);
  const [toProfile, setToProfile] = useState(false);

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
      >
        <img
          alt="profile-icon"
          src="src/images/profileIcon.svg"
        />
      </button>
      {
        search && <img
          alt="search-icon"
          src="src/images/searchIcon.svg"
          data-testid="search-top-btn"
        />
      }
      { toProfile && <Redirect to="/profile" /> }

    </div>
  );
}
