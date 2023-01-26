import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import FormLogin from '../components/FormLogin';

describe('Teste para o Header', () => {
  test('se renderiza titlo da pagina', () => {
    renderWithRouter(<Meals />);

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });

    expect(title).toBeDefined();
  });
  // test('se a rota Login não possui Header', () => {
  //   renderWithRouter(<FormLogin />);

  //   const title = screen.getByTestId('profile-top-btn');

  //   expect(title).toBeNull();
  // });
  test('se a rota vai para profile ao clicar no button', () => {
    renderWithRouter(<FormLogin />);

    const title = screen.getByTestId('profile-top-btn');

    expect(title).not.toBeInTheDocument();
  });
});
