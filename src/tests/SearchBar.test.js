import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando o componente "SearchBar":', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
  });
  test('Teste se os elementos estao renderizados:', async () => {
    const { history } = renderWithRouter(<App />);
    await act(() => history.push('/meals'));
    const alertMock = jest.spyOn(global, 'alert').mockImplementation();

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeDefined();

    userEvent.click(searchBtn);

    const textbox = screen.getByTestId(SEARCH_INPUT);
    expect(textbox).toBeDefined();

    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(ingredientRadio).toBeDefined();
    expect(nameRadio).toBeDefined();
    expect(firstLetterRadio).toBeDefined();
    expect(execSearch).toBeDefined();

    await act(() => {
      userEvent.click(firstLetterRadio);
      userEvent.type(textbox, 'aa');
    });
    expect(alertMock).toHaveBeenCalled();
  });
  test('Testa se a url foi chamada corretamente digitando "Chicken" no input de search', async () => {
    const { history } = renderWithRouter(<App />);
    await act(() => history.push('/meals'));
    const fetch1 = jest.spyOn(global, 'fetch');
    fetch1.mockImplementation(fetch);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const textbox = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(textbox, 'Chicken');
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    userEvent.click(ingredientRadio);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(execSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
  test('Testa se a url foi chamada corretamente digitando "Light rum" no input de search', async () => {
    const { history } = renderWithRouter(<App />);
    await act(() => history.push('/drinks'));
    const fetch1 = jest.spyOn(global, 'fetch');
    fetch1.mockImplementation(fetch);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const textbox = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(textbox, 'Light rum');
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    userEvent.click(ingredientRadio);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(execSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });
  test('Testa se a url foi chamada corretamente digitando "Arrabiata" no input de search', async () => {
    const { history } = renderWithRouter(<App />);
    await act(() => history.push('/meals'));
    const fetch1 = jest.spyOn(global, 'fetch');
    fetch1.mockImplementation(fetch);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const textbox = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(textbox, 'Arrabiata');
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    userEvent.click(nameRadio);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(execSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
  });
  test('Testa se a url foi chamada corretamente digitando "Aquamarine" no input de search', async () => {
    const { history } = renderWithRouter(<App />);
    await act(() => history.push('/drinks'));
    const fetch4 = jest.spyOn(global, 'fetch');
    fetch4.mockImplementation(fetch);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const textbox = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(textbox, 'Aquamarine');
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    userEvent.click(nameRadio);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(execSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
  });
  test('Testa se a url foi chamada corretamente', async () => {
  });
});
