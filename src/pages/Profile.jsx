import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function Profile() {
  const { title } = useContext(HeaderContext);
  return (
    <div>
      <h1>
        { title }
      </h1>
    </div>
  );
}
