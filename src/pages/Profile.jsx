import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function Profile() {
  const { title } = useContext(HeaderContext);
  return (
    <div>
      <header>
        { title }
      </header>
    </div>
  );
}
