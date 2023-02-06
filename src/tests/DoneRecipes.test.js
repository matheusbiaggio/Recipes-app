import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import DoneRecipes from '../pages/DoneRecipes';
import App from '../App';

const teste = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '2023-02-02T22:42:58.902Z',
    tags: [],
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '2023-02-02T13:49:43.074Z',
    tags: ['Cool'],
  },
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '2023-02-02T16:32:29.131Z',
    tags: [
      'Pasta',
      'Curry',
    ],
  },
];

describe('Testes do componente Done Recipes', () => {
  let mockedStorage;
  beforeEach(async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    mockedStorage = {
      favoriteRecipes: JSON.stringify([{ id: '178319' }, { id: '52771' }]),
      doneRecipes: JSON.stringify(teste),
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    global.fetch = jest.fn(fetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/done-recipes'));
  });
  test('Testa se as tags aparecem corretamente', async () => {
    jest.setTimeout(60000);
    const doneRecipesTitle = screen.getByText(/done Recipes/i);
    expect(doneRecipesTitle).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/arrabiata/i)).toBeInTheDocument();
    });

    const tagPasta = screen.getByText(/arrabiata/i);
    const tagCurry = screen.getByText(/curry/i);

    expect(tagPasta).toBeInTheDocument();
    expect(tagCurry).toBeInTheDocument();

    const filterBtnMeal = screen.getByTestId('filter-by-meal-btn');
    expect(filterBtnMeal).toBeInTheDocument();

    act(() => userEvent.click(filterBtnMeal));

    const filterBtnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterBtnDrink).toBeInTheDocument();

    act(() => userEvent.click(filterBtnDrink));

    const filterBtnAll = screen.getByTestId('filter-by-all-btn');
    expect(filterBtnAll).toBeInTheDocument();

    act(() => userEvent.click(filterBtnAll));

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    act(() => userEvent.click(shareButton));

    const detailPage = screen.getByTestId('0-horizontal-image');
    expect(detailPage).toBeInTheDocument();

    act(() => userEvent.click(detailPage));
  });
});
describe('Testa o Done Recipes sem elementos no localStorage', () => {
  let mockedStorage;
  beforeEach(async () => {
    mockedStorage = {
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    global.fetch = jest.fn(fetch);

    renderWithRouter(<DoneRecipes />);
  });
  test('Se a Done recipes é renderizada corretamente', () => {
    const doneRecipesTitle = screen.getByText(/done Recipes/i);
    expect(doneRecipesTitle).toBeInTheDocument();
    expect(screen.queryByText(/arrabiata/i)).not.toBeInTheDocument();
  });
});
