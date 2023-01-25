import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderProvider from './context/HeaderProvider';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Meals from './pages/Meals';


import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Switch>
        <HeaderProvider>
              <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
          {/*       <Route
        exact
        path="/meals"
        component={ Meals }
      />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } /> */}
        </HeaderProvider>
        {/*
        <Route path="*" component={ PageNotFound } exact />
        <Route exact path="/meals/:id-da-receita" component={ Meals } />
        <Route exact path="/meals/:id-da-receita/in-progress" component={ Meals } />
        <Route exact path="/drinks/:id-da-receita" component={ Drinks } />
        <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } /> */}
      </Switch>
    </div>
  );
}

export default App;
