import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Card() {
  const { renderElements } = useContext(AppContext);

  return (
    <div>
      {
        renderElements !== undefined
          ? renderElements.map(({ strDrinkThumb, strDrink }, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
            </div>
          )) : <span>card vazio</span>
      }
    </div>
  );
}

export default Card;
