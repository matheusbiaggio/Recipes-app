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
    const btnDrink = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(btnDrink).toBeInTheDocument();

    userEvent.click(btnDrink);

    expect(history.location.pathname).toBe('/drinks');
  });
  test('se a funcao "directPage" foi chamada e redireciona para meals ao clicar', () => {
    const { history } = renderWithRouter(<Footer />);
    const btnMeals = screen.getByRole('button', {
      name: /meals/i,
    });

    expect(btnMeals).toBeInTheDocument();

    userEvent.click(btnMeals);

    expect(history.location.pathname).toBe('/meals');
  });
});
