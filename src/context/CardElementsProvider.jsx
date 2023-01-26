import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function CardElementsProvider({ children }) {
  const [renderElements, setRenderElements] = useState([]);

  const SELECT_OPTION = 'meal';
  const NUMBER_TWELVE = 12;

  const verifyElementList = (fetchAPI, history) => {
    if (fetchAPI.meals !== null) {
      if (SELECT_OPTION === 'meal' && fetchAPI.meals.length === 1) {
        setRenderElements(fetchAPI.meals);
        history.push(`/meals/${fetchAPI.meals[0].idMeal}`);
      } else if (SELECT_OPTION === 'meal' && fetchAPI.meals.length > 1) {
        setRenderElements(fetchAPI.meals.slice(0, NUMBER_TWELVE));
      } else if (SELECT_OPTION === 'cocktail' && fetchAPI.drinks.length === 1) {
        setRenderElements(fetchAPI.meals);
        history.push(`/cocktail/${fetchAPI.drinks[0].idDrink}`);
      } else if (SELECT_OPTION === 'cocktail' && fetchAPI.drinks.length > 1) {
        setRenderElements(fetchAPI.meals.slice(0, NUMBER_TWELVE));
      } else {
        console.log('NÃO ERA PARA ENTRAR AQUI');
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const values = useMemo(() => ({
    renderElements,
    setRenderElements,
    verifyElementList,
    SELECT_OPTION,
  }), [renderElements,
    setRenderElements, SELECT_OPTION]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

CardElementsProvider.propTypes = {}.isRequired;

export default CardElementsProvider;
