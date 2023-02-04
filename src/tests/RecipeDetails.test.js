import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import clipboardCopy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const RECIPE_0_ID = '0-recipe-card';
const RECIPE_TITLE_ID = 'recipe-title';
const SHARE_BUTTON = 'share-btn';
const INGREDIENT_NAME_0 = '0-ingredient-name-and-measure';
const START_RECIPE_BUTTON = 'start-recipe-btn';
const RECIPE_CATEGORY_ID = 'recipe-category';
const RECIPE_INSTRUCTION_ID = 'instructions';
const RECOMMENDATION_0_ID = '0-recommendation-card';

jest.mock('clipboard-copy');

describe('Testando o componente "RecipeDetails:"', () => {
  test('Testa se renderiza os detalhes corretamente [MEALS]:', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const recipeZero = await screen.findByTestId(RECIPE_0_ID);
    expect(recipeZero).toBeDefined();
    fireEvent.click(recipeZero);

    const recipeTitle = screen.findByTestId(RECIPE_TITLE_ID);
    expect(recipeTitle).toBeDefined();

    const favoriteIcon = await screen.findByAltText('whiteHeartIcon');
    expect(favoriteIcon).toBeDefined();

    const shareBtn = await screen.findByTestId(SHARE_BUTTON);
    expect(shareBtn).toBeDefined();
    fireEvent.click(shareBtn);
    expect(clipboardCopy).toHaveBeenCalled();

    const ingredientZero = await screen.findByTestId(INGREDIENT_NAME_0);
    expect(ingredientZero).toBeDefined();

    const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY_ID);
    expect(recipeCategory).toBeDefined();

    const instructions = await screen.findByTestId(RECIPE_INSTRUCTION_ID);
    expect(instructions).toBeDefined();

    const recommendation = await screen.findByTestId(RECOMMENDATION_0_ID);
    expect(recommendation).toBeDefined();

    const startButton = await screen.findByTestId(START_RECIPE_BUTTON);
    expect(startButton).toBeDefined();
    fireEvent.click(startButton);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  test('Testa se renderiza os detalhes corretamente [DRINKS]:', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const recipeZero = await screen.findByTestId(RECIPE_0_ID);
    expect(recipeZero).toBeDefined();
    fireEvent.click(recipeZero);

    const recipeTitle = screen.findByTestId(RECIPE_TITLE_ID);
    expect(recipeTitle).toBeDefined();

    const favoriteIcon = await screen.findByAltText('whiteHeartIcon');
    expect(favoriteIcon).toBeDefined();

    const shareBtn = await screen.findByTestId(SHARE_BUTTON);
    expect(shareBtn).toBeDefined();
    fireEvent.click(shareBtn);
    expect(clipboardCopy).toHaveBeenCalled();

    const ingredientZero = await screen.findByTestId(INGREDIENT_NAME_0);
    expect(ingredientZero).toBeDefined();

    const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY_ID);
    expect(recipeCategory).toBeDefined();

    const instructions = await screen.findByTestId(RECIPE_INSTRUCTION_ID);
    expect(instructions).toBeDefined();

    const recommendation = await screen.findByTestId(RECOMMENDATION_0_ID);
    expect(recommendation).toBeDefined();

    const startButton = await screen.findByTestId(START_RECIPE_BUTTON);
    expect(startButton).toBeDefined();
    fireEvent.click(startButton);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
  test('Testa as funções do componente', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const recipeZero = await screen.findByTestId(RECIPE_0_ID);
    expect(recipeZero).toBeDefined();
    fireEvent.click(recipeZero);

    const shareBtn = screen.getByTestId(SHARE_BUTTON);
    expect(shareBtn).toBeDefined();
  });
});
