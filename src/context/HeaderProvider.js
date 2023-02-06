import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [title, setTitle] = useState('');
  const history = useHistory();
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (history.location.pathname === '/meals') {
      setTitle('Meals');
      setSearch(true);
    } else if (history.location.pathname === '/drinks') {
      setTitle('Drinks');
      setSearch(true);
    } else if (history.location.pathname === '/profile') {
      setTitle('Profile');
    } else if (history.location.pathname === '/done-recipes') {
      setTitle('Done Recipes');
    } else if (history.location.pathname === '/favorite-recipes') {
      setTitle('Favorite Recipes');
    }
  }, [history, setTitle, title]);

  const context = useMemo(() => ({
    title,
    setTitle,
    search,
  }), [title, setTitle, search]);

  return (
    <HeaderContext.Provider value={ context }>
      { children }
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.object.isRequired,
}.isRequired;
