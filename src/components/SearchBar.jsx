import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useRequestAPI from '../hooks/useRequestAPI';
import Card from './Card';
import AppContext from '../context/AppContext';

function SearchBar() {
  const [elementSearch, setElementSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const { isLoading, makeFetch } = useRequestAPI();

  const { verifyElementList, SELECT_OPTION } = useContext(AppContext);

  const history = useHistory();

  const requestAPI = async (endpoint) => {
    const fetchAPI = await makeFetch(SELECT_OPTION, endpoint);
    verifyElementList(fetchAPI, history);
  };

  const handleClick = async () => {
    let endpoint = '';
    if (selectedOption === 'ingredient-search-radio') {
      endpoint = `filter.php?i=${elementSearch.elementSearch}`;
    } else if (selectedOption === 'name-search-radio') {
      endpoint = `search.php?s=${elementSearch.elementSearch}`;
    } else {
      endpoint = `search.php?f=${elementSearch.elementSearch}`;
    }
    await requestAPI(endpoint);
  };

  const handleChange = (event) => {
    setElementSearch({
      [event.target.name]: event.target.value,
    });
  };

  const onValueChange = ({ target }) => {
    setSelectedOption(target.value);
  };

  useEffect(() => {
    if (selectedOption === 'first-letter-search-radio'
    && elementSearch.elementSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [elementSearch, selectedOption]);

  return (
    <div>
      {
        isLoading && <h1>Carregando...</h1>
      }
      <input
        type="text"
        placeholder="Search"
        name="elementSearch"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input
            type="radio"
            name="ingredient-search-radio"
            id="ingredient-search-radio"
            value="ingredient-search-radio"
            checked={ selectedOption === 'ingredient-search-radio' }
            onChange={ onValueChange }
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            type="radio"
            name="name-search-radio"
            id="name-search-radio"
            value="name-search-radio"
            checked={ selectedOption === 'name-search-radio' }
            onChange={ onValueChange }
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First letter
          <input
            type="radio"
            name="first-letter-search-radio"
            id="first-letter-search-radio"
            value="first-letter-search-radio"
            checked={ selectedOption === 'first-letter-search-radio' }
            onChange={ onValueChange }
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
      <Card />
    </div>
  );
}

export default SearchBar;