import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function CardDrink({ mealOrDrink }) {
  const { renderElements } = useContext(AppContext);

  const NUMBER_TWELVE = 12;

  let isMeal = '';

  if (mealOrDrink === 'meal') {
    isMeal = true;
  } else {
    isMeal = false;
  }

  let renderElements12 = [];

  const renderCard = () => {
    if (renderElements) {
      renderElements12 = !isMeal && renderElements.slice(0, NUMBER_TWELVE);
      return (
        renderElements12.map(({ strDrinkThumb, strDrink }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
          </div>
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

CardDrink.propTypes = {}.isRequired;

export default CardDrink;
