import React from 'react';
import { Route } from 'react-router-dom';
import DoneRecipes from './components/DoneRecipes';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';

import Login from './pages/Login';
import Meals from './pages/Meals';
// import PageNotFound from './pages/PageNotFound';

import HeaderProvider from './context/HeaderProvider';

import './App.css';

function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <HeaderProvider>
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </HeaderProvider>
      {/* <Route path="*" component={ PageNotFound } exact />
      <Route exact path="/meals/:id-da-receita" component={ Meals } />
      <Route exact path="/meals/:id-da-receita/in-progress" component={ Meals } />
      <Route exact path="/drinks/:id-da-receita" component={ Drinks } />
      <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } /> */}
    </div>
  );
}

export default App;
