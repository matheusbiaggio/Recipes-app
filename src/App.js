import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import PageNotFound from './pages/PageNotFound';

import HeaderProvider from './context/HeaderProvider';

import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <HeaderProvider>
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </HeaderProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals/:id-da-receita" component={ Meals } />
        <Route exact path="/meals/:id-da-receita/in-progress" component={ Meals } />
        <Route exact path="/drinks/:id-da-receita" component={ Drinks } />
        <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } />
        <Route path="*" component={ PageNotFound } exact />
      </Switch>
    </div>
  );
}

export default App;
