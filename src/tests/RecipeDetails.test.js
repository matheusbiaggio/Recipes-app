// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const RECIPE_0_ID = '0-recipe-card';
const RECIPE_TITLE_ID = 'recipe-title';
const FAVORITE_BUTTON = 'favorite-btn';
const SHARE_BUTTON = 'share-btn';

describe('Testando o componente "RecipeDetails:"', () => {
  test('Testa se renderiza os detalhes corretamente:', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const recipeZero = await screen.findByTestId(RECIPE_0_ID);
    expect(recipeZero).toBeDefined();
    fireEvent.click(recipeZero);

    const recipeTitle = screen.findByTestId(RECIPE_TITLE_ID);
    expect(recipeTitle).toBeDefined();
    const favoriteIcon = await screen.findByAltText('whiteHeart');
    expect(favoriteIcon).toBeDefined();
    const shareBtn = await screen.findByTestId(SHARE_BUTTON);
    expect(shareBtn).toBeDefined();
  });
});
