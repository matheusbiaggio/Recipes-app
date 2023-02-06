import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email@email.com';
const PASSWORD = '12345678';
const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';
const LOGIN_BUTTON_ID = 'login-submit-btn';
const PROFILE_BUTTON_ID = 'profile-top-btn';
const SEARCH_BTN_ID = 'search-top-btn';
const DONE_RECIPES_ID = 'profile-done-btn';
const FAVORITE_RECIPES_ID = 'profile-favorite-btn';

describe('Testa o header provider', () => {
  test('testa se a rota meals renderiza corretamente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByTestId(SEARCH_BTN_ID);
    const mealsTitle = screen.getByText(/meals/i);
    expect(searchBtn).toBeInTheDocument();
    expect(mealsTitle).toBeInTheDocument();
  });
  test('testa se a rota drinks renderiza corretamente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchBtn = screen.getByTestId(SEARCH_BTN_ID);
    const drinksTitle = screen.getByText(/drinks/i);
    expect(searchBtn).toBeInTheDocument();
    expect(drinksTitle).toBeInTheDocument();
  });
  test('testa se a rota profile renderiza corretamente', () => {
    const { history, getByTestId, getByText } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(getByTestId(LOGIN_BUTTON_ID));

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(getByTestId(PROFILE_BUTTON_ID));
    expect(history.location.pathname).toBe('/profile');

    const profileTitle = getByText(/profile/i);
    expect(profileTitle).toBeInTheDocument();
  });
  test('testa se a rota done recipes renderiza corretamente', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(screen.getByTestId(PROFILE_BUTTON_ID));
    expect(history.location.pathname).toBe('/profile');

    userEvent.click(screen.getByTestId(DONE_RECIPES_ID));
    expect(history.location.pathname).toBe('/done-recipes');

    const doneRecipesTitle = screen.getByText(/done recipes/i);
    expect(doneRecipesTitle).toBeInTheDocument();
  });
  test('testa se a rota favorite recipes renderiza corretamente', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(screen.getByTestId(PROFILE_BUTTON_ID));
    expect(history.location.pathname).toBe('/profile');

    userEvent.click(screen.getByTestId(FAVORITE_RECIPES_ID));
    expect(history.location.pathname).toBe('/favorite-recipes');

    const favoriteTitle = screen.getByText(/favorite recipes/i);
    expect(favoriteTitle).toBeInTheDocument();
  });
});
