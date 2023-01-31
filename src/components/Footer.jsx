import React from 'react';
import { useHistory } from 'react-router-dom';
import '../Css/CssFooter.css';

export default function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="Footer">
      <button
        src="src/imagens/drinkIcon.svg"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      >
        Drinks
      </button>
      <button
        src="src/imagens/mealIcon.svg"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      >
        Meals
      </button>
    </div>
  );
}
