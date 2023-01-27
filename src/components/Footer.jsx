import React from 'react';
import { useHistory } from 'react-router-dom';
import '../Css/CssFooter.css';

export default function Footer() {
  const history = useHistory();

  const directPage = (param) => {
    switch (param) {
    case 'drink':
      history.push('/drinks');
      break;
    case 'meals':
      history.push('/meals');
      break;
    default:
    }
  };

  return (
    <div data-testid="footer" className="Footer">
      <button
        src="src/imagens/drinkIcon.svg"
        data-testid="drinks-bottom-btn"
        onClick={ () => directPage('drink') }
      >
        Drinks
      </button>
      <button
        src="src/imagens/mealIcon.svg"
        data-testid="meals-bottom-btn"
        onClick={ () => directPage('meals') }
      >
        Meals
      </button>
    </div>
  );
}
