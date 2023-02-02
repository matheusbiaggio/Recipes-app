const setLocalStorage = () => {
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    drinks: { 13501: ['agua'], 2222: ['açucar'], 52771: ['alcool'] },
    meals: { 111: ['carne'], 222: ['arroz'] },
  }));
  // localStorage.setItem('doneRecipes', JSON.stringify({ mockDoneRecipeStorage }));
  localStorage.setItem('doneRecipes', JSON.stringify([{
    id: 15997,
  }]));
};

export default setLocalStorage;
