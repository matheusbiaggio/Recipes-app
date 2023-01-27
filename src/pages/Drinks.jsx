import React from 'react';
import Header from '../components/Header';
import CardDrink from '../components/CardDrink';
import Footer from '../components/Footer';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <CardDrink />
      <Footer />
    </div>
  );
}
