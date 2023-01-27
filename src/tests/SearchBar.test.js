import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import milkDrinks from '../../cypress/mocks/milkDrinks';

const EMAIL_CONST = 'email@email.com';
const PASSWORD_CONST = 'password';

describe('Testa se o componente SearchBar esta correto', () => {
  test('Testa o caminho para Meals', () => {
    const { history } = renderWithRouter(<App />);

    const loginInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const btnEnter = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(loginInput, EMAIL_CONST);
    userEvent.type(passwordInput, PASSWORD_CONST);

    expect(btnEnter).toBeEnabled();

    userEvent.click(btnEnter);

    expect(history.location.pathname).toBe('/meals');
  });

  test('Testa se o SearchBar é erenderizado ao clicar no botão de pesquisa', () => {
    renderWithRouter(<Meals />);

    const searchBtn = screen.getByRole('img', {
      name: /search/i,
    });

    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/ingredient/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/first letter/i)).toBeInTheDocument();
  });

  test('Testa se é renderizado a tela de Meals e renderiza apenas 12 elementos quando é feito a API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMeals),
    });

    await act(async () => {
      renderWithRouter(<Meals />);
    });

    const searchBtn = screen.getByRole('img', {
      name: /search/i,
    });

    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    const selectIngredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const findSearchBtn = screen.getAllByTestId('first-letter-search-radio');

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(selectIngredient);
    userEvent.click(findSearchBtn[0]);

    waitFor(async () => {
      const allImg = await screen.findAllByRole('heading', { level: 3 });
      expect(allImg).toHaveLength(12);
    });
  });

  test('Testa se é renderizado a tela de Drinks e renderiza apenas 12 elementos quando é feito a API', async () => {
    jest.clearAllMocks(chickenMeals);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(milkDrinks),
    });

    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    const searchBtn = screen.getByRole('img', {
      name: /search/i,
    });

    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    const selectIngredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const findSearchBtn = screen.getAllByTestId('first-letter-search-radio');

    userEvent.type(inputSearch, 'milk');
    userEvent.click(selectIngredient);
    userEvent.click(findSearchBtn[0]);

    waitFor(async () => {
      const allImg = await screen.findAllByRole('heading', { level: 3 });
      expect(allImg).toHaveLength(12);
    });
  });
});
