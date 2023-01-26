import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Teste para o Header', () => {
  test('se renderiza titlo da pagina', () => {
    renderWithRouter(<Meals />);

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });

    expect(title).toBeDefined();
  });
});
