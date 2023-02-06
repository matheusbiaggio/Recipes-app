import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email@email.com';
const PASSWORD = '12345678';
const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';
const LOGIN_BUTTON_ID = 'login-submit-btn';
const PROFILE_BUTTON_ID = 'profile-top-btn';
const DONE_RECIPES_ID = 'profile-done-btn';
const FAVORITE_RECIPES_ID = 'profile-favorite-btn';
const LOGOUT_BTN_ID = 'profile-logout-btn';

describe('Teste para o Profile', () => {
  test('Testa se redireciona para a pagina Profile e faz o logout', async () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(screen.getByTestId(PROFILE_BUTTON_ID));
    expect(history.location.pathname).toBe('/profile');

    const emailHeading = screen.getByText(EMAIL);
    expect(emailHeading).toBeInTheDocument();

    const logoutBtn = screen.getByTestId(LOGOUT_BTN_ID);
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
  test('testa se redireciona para a pagina de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(screen.getByTestId(PROFILE_BUTTON_ID));
    expect(history.location.pathname).toBe('/profile');

    const favBtn = screen.getByTestId(FAVORITE_RECIPES_ID);
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('testa se redireciona para a pagina de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(screen.getByTestId(PROFILE_BUTTON_ID));
    expect(history.location.pathname).toBe('/profile');

    const doneBtn = screen.getByTestId(DONE_RECIPES_ID);
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
