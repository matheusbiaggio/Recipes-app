import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [title, setTitle] = useState('');

  const context = useMemo(() => ({
    title,
    setTitle,
  }), [title, setTitle]);

  return (
    <HeaderContext.Provider value={ context }>
      { children }
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.object.isRequired,
}.isRequired;
