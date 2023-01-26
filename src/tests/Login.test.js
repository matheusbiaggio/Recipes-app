import React from 'react';
import { screen, userEvent } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL_CONST = 'email@email.com';
const PASSWORD_CONST = 'password';

describe('Teste para a tela de login', () => {
  test('Testa se renderiza o componente login', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      name: /login/i,
      level: 1,
    });

    expect(title).toBeDefined();
  });

  test('Testa se existe os inputs de email e senha e o botão', () => {
    renderWithRouter(<App />);

    const loginInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const btnEnter = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(loginInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(btnEnter).toBeDefined();
  });

  test('Testa se o botão inicia desabilitado', () => {
    renderWithRouter(<App />);

    const btnEnter = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(btnEnter).toBeDisabled();
  });

  test('Testa se o botão fica habilidato ao preencher corretamente e direciona para a pagina "Meals"', () => {
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

    // act(() => {
    //   history.push('/meals');
    // });
  });
});
