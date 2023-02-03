import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando o componente "SearchBar":', () => {
  test('Teste se os elementos de meals estao renderizados:', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => history.push('/meals'));
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
    await act(async () => {
      userEvent.click(firstLetterRadio);
      userEvent.type(textbox, 'aa');
      userEvent.click(execSearch);
    });
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });
  });
  test('Testa se a url foi chamada corretamente digitando "Chicken" no input de search', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => history.push('/meals'));
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    await act(async () => {
      userEvent.click(searchBtn);
    });
    const textbox = await screen.findByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    await act(async () => {
      userEvent.type(textbox, 'Chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(execSearch);
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
  test('Testa se a url foi chamada corretamente digitando "Light rum" no input de search', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => history.push('/drinks'));
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    await act(async () => {
      userEvent.click(searchBtn);
    });
    const textbox = await screen.findByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    await act(async () => {
      userEvent.type(textbox, 'Light rum');
      userEvent.click(ingredientRadio);
      userEvent.click(execSearch);
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });
  test('Testa se a url foi chamada corretamente digitando "Arrabiata" no input de search', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => history.push('/meals'));
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    await act(async () => {
      userEvent.click(searchBtn);
    });
    const textbox = await screen.findByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    await act(async () => {
      userEvent.type(textbox, 'Arrabiata');
      userEvent.click(nameRadio);
      userEvent.click(execSearch);
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
  });
  test('Testa se a url foi chamada corretamente digitando "Aquamarine" no input de search', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => history.push('/drinks'));
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    await act(async () => {
      userEvent.click(searchBtn);
    });
    const textbox = await screen.findByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    await act(async () => {
      userEvent.type(textbox, 'Aquamarine');
      userEvent.click(nameRadio);
      userEvent.click(execSearch);
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
  });
});
