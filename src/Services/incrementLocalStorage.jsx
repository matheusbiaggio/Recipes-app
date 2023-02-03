export const incrementLocalStorage = (param) => {
  const teste = localStorage.getItem('favoriteRecipes');
  const favorites = JSON.parse(teste);
  favorites.push(param);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
};
