import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import CategoryNameBtn from '../components/CategoryNameBtn';

export default class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <CategoryNameBtn mealOrDrink="meal" />
        <Recipes mealOrDrink="meal" />
        <Footer />
      </div>
    );
  }
}
