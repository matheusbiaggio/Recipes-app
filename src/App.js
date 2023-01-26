import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Meals from './pages/Meals';
import CardElementsProvider from './context/CardElementsProvider';

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
          render={ (props) => <Meals { ...props } id="" /> }
        />
        <Route path="*" component={ PageNotFound } exact />
      </Switch>
    </CardElementsProvider>
  );
}

export default App;
