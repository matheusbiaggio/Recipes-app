import React, { Component } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';

export default class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <Card />
      </div>
    );
  }
}
