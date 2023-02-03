import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

// const directPage = (param) => {
//   console.log(param);
// };

describe('Testes Footer', () => {
  test('se redireciona para drinks ao clicar', () => {
    const { history } = renderWithRouter(<Footer />);
    const btnDrink = screen.getByTestId('drinks-bottom-btn');

    expect(btnDrink).toBeInTheDocument();

    userEvent.click(btnDrink);

    expect(history.location.pathname).toBe('/drinks');
  });
  test('se a funcao "directPage" foi chamada e redireciona para meals ao clicar', () => {
    const { history } = renderWithRouter(<Footer />);
    const btnMeals = screen.getByTestId('meals-bottom-btn');

    expect(btnMeals).toBeInTheDocument();

    userEvent.click(btnMeals);

    expect(history.location.pathname).toBe('/meals');
  });
});
