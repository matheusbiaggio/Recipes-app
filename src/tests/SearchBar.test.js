import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Testa se o componente SearchBar esta correto', () => {
  test('Testa se o SearchBar é erenderizado ao clicar no botão de pesquisa', () => {
    renderWithRouter(<Meals />);

    const searchBtn = screen.getByRole('img', {
      name: /search/i,
    });

    expect(searchBtn).toBeInTheDocument();
  });
});
