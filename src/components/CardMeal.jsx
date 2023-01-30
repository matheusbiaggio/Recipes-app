import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function CardMeal({ mealOrDrink }) {
  const { renderElements } = useContext(AppContext);

  const history = useHistory();

  const NUMBER_TWELVE = 12;

  let isMeal = '';

  if (mealOrDrink === 'meal') {
    isMeal = true;
  } else {
    isMeal = false;
  }

  let renderElements12 = [];

  const handleCLick = ({ target }) => {
    history.push(`/meals/${target.parentNode.id}`);
  };

  const renderCard = () => {
    if (renderElements) {
      renderElements12 = isMeal && renderElements.slice(0, NUMBER_TWELVE);
      return (
        renderElements12.map(({ strMealThumb, strMeal, idMeal }, index) => (
          <button
            data-testid={ `${index}-recipe-card` }
            id={ idMeal }
            key={ index }
            onClick={ handleCLick }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
          </button>
        ))
      );
    }
  };

  return (
    <div>
      {
        renderElements.length !== 0
          ? renderCard() : <span>card vazio</span>
      }
    </div>
  );
}

CardMeal.propTypes = {}.isRequired;

export default CardMeal;
