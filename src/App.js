import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Meals from './pages/Meals';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';

import CardElementsProvider from './context/CardElementsProvider';
import RecipeDetails from './pages/RecipeDetails';
import ProgressRecipes from './pages/ProgressRecipes';

function App() {
  return (
    <CardElementsProvider>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/meals"
          component={ Meals }
        />
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <RecipeDetails { ...props } id="" /> }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (props) => <ProgressRecipes { ...props } id="" /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } id="" /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <ProgressRecipes { ...props } id="" /> }
        />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="*" component={ PageNotFound } exact />
      </Switch>
    </CardElementsProvider>
  );
}

export default App;
