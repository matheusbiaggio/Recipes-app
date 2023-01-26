import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Card() {
  const { renderElements } = useContext(AppContext);

  return (
    <div>
      {
        Object.keys(renderElements).length !== 0
          ? renderElements.map(({ strMealThumb, strMeal }, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
            </div>
          )) : <span>card vazio</span>
      }
    </div>
  );
}

export default Card;
