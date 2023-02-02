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

describe('Teste para o Header', () => {
  test('Testa se redireciona para a pagina "Profile"', async () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(screen.getByTestId(PROFILE_BUTTON_ID));
    expect(history.location.pathname).toBe('/profile');
  });
});
