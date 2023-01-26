import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function DoneRecipes() {
  const { title } = useContext(HeaderContext);
  return (
    <div>
      { title }
    </div>
  );
}
