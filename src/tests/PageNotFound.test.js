import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste para o Not found', () => {
  test('Testa se redireciona para a pagina de not found', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });
    const notFound = screen.getByText(/page not found!/i);
    expect(notFound).toBeDefined();
  });
});
