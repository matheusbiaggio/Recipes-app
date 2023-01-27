import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <Recipes mealOrDrink="meal" />
        <Footer />
      </div>
    );
  }
}
