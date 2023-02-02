export const createObjectDrink = (param) => {
  const selectRecipe = param;
  const select = selectRecipe[0];
  const isNationality = select.srtArea ? select.srtArea : '';
  const isCategory = select.strCategory ? select.strCategory : '';
  const isAlcoholic = select.strAlcoholic ? select.strAlcoholic : '';

  const newObject = {
    id: select.idDrink,
    type: 'drink',
    nationality: isNationality,
    category: isCategory,
    alcoholicOrNot: isAlcoholic,
    name: select.strDrink,
    image: select.strDrinkThumb,

  };

  return newObject;
};

export const createObjectMeal = (param) => {
  const selectRecipe = param;
  const select = selectRecipe[0];
  const isNationality = select.strArea ? select.strArea : '';
  const isCategory = select.strCategory ? select.strCategory : '';
  const isAlcoholic = select.strAlcoholic ? select.strAlcoholic : '';

  const newObject = {
    id: select.idMeal,
    type: 'meal',
    nationality: isNationality,
    category: isCategory,
    alcoholicOrNot: isAlcoholic,
    name: select.strMeal,
    image: select.strMealThumb,

  };

  return newObject;
};
