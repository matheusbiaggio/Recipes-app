import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import Profile from '../pages/Profile';
import '@testing-library/jest-dom/extend-expect';

describe('Teste para o Header', () => {
  test('se renderiza titulo da pagina', () => {
    renderWithRouter(<Meals />);

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });

    expect(title).toBeDefined();
  });
  test('ao clicar no ícone renderiza o SearchInput', () => {
    renderWithRouter(<Meals />);

    const searchIcon = screen.getByAltText('Search');

    userEvent.click(searchIcon);

    const Searchinput = screen.getByRole('textbox');

    expect(Searchinput).toBeInTheDocument();
  });
  test('se meals renderiza botão profile', () => {
    const { history } = renderWithRouter(<Meals />);

    const buttonProfile = screen.getByRole('button', {
      name: /profile/i,
    });

    expect(buttonProfile).toBeInTheDocument();

    userEvent.click(buttonProfile);

    expect(history.location.pathname).toBe('/profile');
  });
  test('se nao aparece o search input', () => {
    renderWithRouter(<Profile />);
  });
});
