import React, { Component } from 'react';
import CardMeal from '../components/CardMeal';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <CardMeal />
        <Footer />
      </div>
    );
  }
}
