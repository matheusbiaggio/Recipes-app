const setLocalStorage = () => {
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    drinks: { 13501: ['agua'], 2222: ['açucar'], 52771: ['alcool'] },
    meals: { 111: ['carne'], 222: ['arroz'] },
  }));
  // localStorage.setItem('doneRecipes', JSON.stringify({ mockDoneRecipeStorage }));
  localStorage.setItem('doneRecipes', JSON.stringify([{
    id: 1111,
    type: 'meal',
    nationality: 'brasil',
    category: 'almoço',
    alcoholicOrNot: '',
    name: 'Comida do Matheus',
    image: 'https://conteudo.imguol.com.br/c/entretenimento/0d/2021/05/11/prato-de-arroz-e-feijao-1620764972485_v2_450x337.jpg.webp',
    doneDate: 'ontem',
    tags: '',
  },
  {
    id: 2222,
    type: 'drink',
    nationality: 'EUA',
    category: 'balada',
    alcoholicOrNot: 'Sim',
    name: 'Bebida para ficar louco',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/9d/46/26/alambique-confeccionado.jpg',
    doneDate: 'hoje',
    tags: '',
  }]));
};

export default setLocalStorage;
