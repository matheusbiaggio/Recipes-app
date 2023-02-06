import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email@email.com';
const PASSWORD = '12345678';
const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';
const LOGIN_BUTTON_ID = 'login-submit-btn';

describe('Testando o componente "Recipes":', () => {
  beforeEach(async () => {
    renderWithRouter(<App />);
    global.fetch = jest.fn(fetch);
    userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));
  });
  test('Testando o componente', async () => {
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
  });
});
