import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import useRequestAPI from '../hooks/useRequestAPI';

function CategoryNameBtn({ mealOrDrink }) {
  const [filterBtns, setFilterBtns] = useState({});
  const [error, setError] = useState('');

  const { setRenderElements } = useContext(AppContext);

  const { isLoading, makeFetch, errors } = useRequestAPI();

  const NUMBER_FIVE = 5;
  const NUMBER_TWELVE = 12;

  let isMeal = '';

  if (mealOrDrink === 'meal') {
    isMeal = true;
  } else {
    isMeal = false;
  }

  const getData = async () => {
    const data = await makeFetch(mealOrDrink, 'search.php?s=');
    if (mealOrDrink === 'cocktail') {
      setRenderElements(data.drinks);
    } else if (mealOrDrink === 'meal') {
      setRenderElements(data.meals);
    }
  };

  const handleClick = async ({ target }) => {
    if (target.value === 'on') {
      target.value = 'off';
      const filterByClick = await makeFetch(mealOrDrink, `filter.php?c=${target.name}`);
      if (filterByClick) {
        if (isMeal === true) {
          setRenderElements(filterByClick.meals.slice(0, NUMBER_TWELVE));
        } else {
          setRenderElements(filterByClick.drinks.slice(0, NUMBER_TWELVE));
        }
      }
    } else {
      await getData();
    }
  };

  const removeAllFilters = async () => {
    await getData();
  };

  let fiveBtns = [];

  const makeBtns = () => {
    if (Object.keys(filterBtns).length > 0) {
      fiveBtns = isMeal ? filterBtns.meals.slice(0, NUMBER_FIVE)
        : filterBtns.drinks.slice(0, NUMBER_FIVE);
      return (
        fiveBtns.map((element, index) => (
          <button
            className="categoryBtn"
            type="button"
            key={ index }
            name={ element.strCategory }
            value="on"
            onClick={ handleClick }
            data-testid={ `${element.strCategory}-category-filter` }
          >
            {element.strCategory}
          </button>
        ))
      );
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        setFilterBtns(await makeFetch(mealOrDrink, 'list.php?c=list'));
      } catch (err) {
        setError(err);
      }
    };

    getList();
  }, []);

  if (error || errors) {
    return (<span>{`ERRO! ${errors}`}</span>);
  }

  return (
    <div className="categoryContainer">
      {isLoading && <span>Carregando botões...</span>}
      {makeBtns()}
      <button
        className="categoryBtn"
        type="button"
        onClick={ removeAllFilters }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>

  );
}

CategoryNameBtn.propTypes = {}.isRequired;

export default CategoryNameBtn;
