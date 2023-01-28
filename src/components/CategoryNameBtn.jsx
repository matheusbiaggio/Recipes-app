import React, { useState, useEffect } from 'react';
import useRequestAPI from '../hooks/useRequestAPI';

function CategoryNameBtn({ mealOrDrink }) {
  const [filterBtns, setFilterBtns] = useState({});
  const [error, setError] = useState('');

  const { isLoading, makeFetch, errors } = useRequestAPI();

  const NUMBER_FIVE = 5;

  let isMeal = '';

  if (mealOrDrink === 'meal') {
    isMeal = true;
  } else {
    isMeal = false;
  }

  let fiveBtns = [];

  const makeBtns = () => {
    if (Object.keys(filterBtns).length > 0) {
      fiveBtns = isMeal ? filterBtns.meals.slice(0, NUMBER_FIVE)
        : filterBtns.drinks.slice(0, NUMBER_FIVE);
      return (
        fiveBtns.map((element, index) => (
          <button
            type="button"
            key={ index }
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
    <div>
      {isLoading && <span>Carregando botões...</span>}
      {makeBtns()}
    </div>

  );
}

CategoryNameBtn.propTypes = {}.isRequired;

export default CategoryNameBtn;
