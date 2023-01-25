import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Meals from './pages/Meals';

function App() {
  return (
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
      <Route path="*" component={ PageNotFound } exact />
    </Switch>
  );
}

export default App;
