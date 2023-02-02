import React from 'react';
import { useHistory } from 'react-router-dom';
import '../Css/CssFooter.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="Footer">
      <img
        src={ drinkIcon }
        alt="Dinks"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        aria-hidden="true"
      />
      <img
        src={ mealIcon }
        alt="Meals"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
        aria-hidden="true"
      />
    </div>
  );
}
