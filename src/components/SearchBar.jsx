import React, { useState } from 'react';
import useRequestAPI from '../hooks/useRequestAPI';

function SearchBar() {
  const [selectedOption, setSelectedOption] = useState('');
  const [elementList, setElementList] = useState({});
  const [elementSearch, setElementSearch] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const { isLoading, makeFetch } = useRequestAPI();

  const SELECT_APTION = 'meal';

  const requestAPI = async () => {
    const fetchAPI = await makeFetch(SELECT_APTION, endpoint);
    setElementList(fetchAPI);
  };

  const handleClick = async () => {
    if (selectedOption === 'ingredient-search-radio') {
      setEndpoint(`filter.php?i=${elementSearch.elementSearch}`);
    } else if (selectedOption === 'name-search-radio') {
      setEndpoint(`search.php?s=${elementSearch.elementSearch}`);
    } else if (selectedOption === 'first-letter-search-radio') {
      setEndpoint(`search.php?f=${elementSearch.elementSearch}`);
    }
    requestAPI();
  };

  const handleChange = (event) => {
    setElementSearch({
      [event.target.name]: event.target.value,
    });
  };

  const onValueChange = ({ target }) => {
    setSelectedOption(target.value);
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
