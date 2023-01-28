import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import CategoryNameBtn from '../components/CategoryNameBtn';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <CategoryNameBtn mealOrDrink="cocktail" />
      <Recipes mealOrDrink="cocktail" />
      <Footer />
    </div>
  );
}
