import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from './HeaderContext';
import Header from '../components/Header';

export default function HeaderProvider({ children }) {
  const [title, setTitle] = useState('');
  const history = useHistory();
  const [search, setSearch] = useState(false);

  useEffect(() => {
    switch (history.location.pathname) {
    case '/meals':
      setTitle('Meals');
      setSearch(true);
      break;
    case '/drinks':
      setTitle('Drinks');
      setSearch(true);
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

  const context = useMemo(() => ({
    title,
    setTitle,
    search,
  }), [title, setTitle, search]);

  return (
    <HeaderContext.Provider value={ context }>
      <Header />
      { children }
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.object.isRequired,
}.isRequired;
