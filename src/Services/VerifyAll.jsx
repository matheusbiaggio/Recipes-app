import FilterId from './FilterId';

export const verifyDoneRecipes = (param1, param2, param3) => {
  let getIdDoneRecipe;
  if (param3.includes('drinks')) {
    const filter = FilterId(param1, param2.idDrink);
    getIdDoneRecipe = filter;
  } else if (param3.includes('meals')) {
    const filter = FilterId(param1, param2.idMeal);
    getIdDoneRecipe = filter;
  }
  return getIdDoneRecipe;
};

export const verifyInProgressRecipes = (param1, param2, param3) => {
  let filterId = '';
  if (param3.includes('drinks')) {
    filterId = Object.keys(param1.drinks)
      .filter((element) => (
        element === param2.idDrink
      ));
  } else if (param3.includes('meals')) {
    filterId = Object.keys(param1.meals)
      .filter((element) => (
        element === Object.keys(param2.idMeal)
      ));
  }
  return filterId;
};
