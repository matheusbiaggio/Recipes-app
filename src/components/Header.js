import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function Header() {
  const { title, search } = useContext(HeaderContext);

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
      {
        search && <img
          alt="search-icon"
          src="src/images/searchIcon.svg"
          data-testid="search-top-btn"
        />

      }

    </div>
  );
}
