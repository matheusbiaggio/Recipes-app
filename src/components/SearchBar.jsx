import React, { useState } from 'react';
import useRequestAPI from '../hooks/useRequestAPI';

function SearchBar() {
  const [selectedOption, setSelectedOption] = useState('');
  const [elementList, setElementList] = useState({});
  const [elementSearch, setElementSearch] = useState('');
  const { isLoading, error, makeFetch } = useRequestAPI();

  let URL_API_MEAL = '';
  let URL_API_DRINK = '';

  if (selectedOption === 'ingredient-search-radio') {
    URL_API_MEAL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${elementSearch.elementSearch}`;
    URL_API_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${elementSearch.elementSearch}`;
  } else if (selectedOption === 'name-search-radio') {
    URL_API_MEAL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${elementSearch.elementSearch}`;
    URL_API_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?s=${elementSearch.elementSearch}`;
  } else {
    URL_API_MEAL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${elementSearch.elementSearch}`;
    URL_API_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?f=${elementSearch.elementSearch}`;
  }

  const SELECT_APTION = 'beer';

  const onValueChange = ({ target }) => {
    setSelectedOption(target.value);
  };

  const requestAPI = async () => {
    if (SELECT_APTION === 'meals') {
      const fetchAPI = await makeFetch(URL_API_MEAL);
      setElementList(fetchAPI);
      console.log(elementList);
    } else {
      const fetchAPI = await makeFetch(URL_API_DRINK);
      setElementList(fetchAPI);
      console.log(elementList);
    }
  };

  const handleChange = (event) => {
    setElementSearch({
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = async () => {
    requestAPI();
  };

  return (
    <div>
      {
        isLoading && <h1>Carregando...</h1>
      }
      <input
        type="text"
        placeholder="Search"
        name="elementSearch"
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
    </div>
  );
}

export default SearchBar;
