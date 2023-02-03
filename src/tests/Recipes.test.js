// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import fetch from '../../cypress/mocks/fetch';
// import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';

// const EMAIL = 'email@email.com';
// const PASSWORD = '12345678';
// const EMAIL_INPUT_ID = 'email-input';
// const PASSWORD_INPUT_ID = 'password-input';
// const LOGIN_BUTTON_ID = 'login-submit-btn';
// const SEARCH_INPUT = 'search-input';
// const SEARCH_TOP_BTN = 'search-top-btn';
// const NAME_SEARCH_RADIO = 'name-search-radio';
// const EXEC_SEARCH_BTN = 'exec-search-btn';

// describe('Testando o componente "Recipes":', () => {
//   beforeEach(async () => {
//     const { history } = renderWithRouter(<App />);
//     global.fetch = jest.fn(fetch);
//     userEvent.type(screen.getByTestId(EMAIL_INPUT_ID), EMAIL);
//     userEvent.type(screen.getByTestId(PASSWORD_INPUT_ID), PASSWORD);
//     userEvent.click(screen.getByTestId(LOGIN_BUTTON_ID));
//   });
//   test('Testando o erro de "Invalid url"', async () => {
//     userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
//     userEvent.type(screen.getByTestId(SEARCH_INPUT, 'xablau'));
//     userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
//     userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
//     expect(fetch).toThrowError('Invalid url');
//   });
// });
