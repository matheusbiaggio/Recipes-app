import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useRequestAPI from '../hooks/useRequestAPI';
import AppContext from '../context/AppContext';

function SearchBar() {
  const [elementSearch, setElementSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const { isLoading, makeFetch } = useRequestAPI();

  const { verifyElementList } = useContext(AppContext);

  const history = useHistory();

  let mealOrDrink = '';

  const requestAPI = async (endpoint) => {
    if (history.location.pathname === '/meals') {
      mealOrDrink = 'meal';
      const fetchAPI = await makeFetch(mealOrDrink, endpoint);
      verifyElementList(mealOrDrink, fetchAPI, history);
    } else if (history.location.pathname === '/drinks') {
      mealOrDrink = 'cocktail';
      const fetchAPI = await makeFetch(mealOrDrink, endpoint);
      verifyElementList(mealOrDrink, fetchAPI, history);
    }
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
  }, [elementSearch]);

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
        className="searchBtn"
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
