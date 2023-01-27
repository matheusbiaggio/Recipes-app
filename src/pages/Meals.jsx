import React, { Component } from 'react';
import CardMeal from '../components/CardMeal';
import Header from '../components/Header';

export default class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <CardMeal />
      </div>
    );
  }
}
