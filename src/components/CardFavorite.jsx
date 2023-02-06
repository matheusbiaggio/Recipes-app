import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

export default function CardFavorite({ arrayFavoriteRecipes, typeArray }) {
  const [isCopy, setIsCopy] = useState(false);
  const { favoriteRecipesLS, setFavoriteRecipesLS,
    mealsFavoriteRecipes, setMealsFavoriteRecipes,
    drinksFavoriteRecipes, setDrinksFavoriteRecipes } = useContext(AppContext);

  const shareClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopy(true);
  };

  const disfavor = (id) => {
    localStorage.removeItem('favoriteRecipes');
    if (favoriteRecipesLS.length === 1) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (typeArray === 'meal') {
      setMealsFavoriteRecipes(arrayFavoriteRecipes.filter((element) => (
        element.id !== id
      )));
      setFavoriteRecipesLS(mealsFavoriteRecipes, drinksFavoriteRecipes);
    } else if (typeArray === 'drink') {
      setDrinksFavoriteRecipes(arrayFavoriteRecipes.filter((element) => (
        element.id !== id
      )));
      setFavoriteRecipesLS(mealsFavoriteRecipes, drinksFavoriteRecipes);
    } else {
      setFavoriteRecipesLS(arrayFavoriteRecipes.filter((element) => (
        element.id !== id
      )));
    }
  };

  useEffect(() => {
    if (favoriteRecipesLS.length > 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesLS));
    }
  }, [favoriteRecipesLS]);

  return (
    <div>
      {arrayFavoriteRecipes.map((element, index) => (
        <div key={ index }>
          <Link
            to={ `${element.type}s/${element.id}` }
          >
            <img
              src={ element.image }
              alt={ element.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              {element.name}
            </h3>
          </Link>
          { element.type === 'meal' ? (
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { `${element.nationality} - ${element.category}` }
            </h3>
          ) : (
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { element.alcoholicOrNot }
            </h3>
          )}
          <img
            src={ shareIcon }
            alt="shareIcon"
            aria-hidden="true"
            onClick={ () => (shareClick(element.type, element.id)) }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <img
            src={ blackHeartIcon }
            alt="blackHeartIcon"
            data-testid={ `${index}-horizontal-favorite-btn` }
            aria-hidden="true"
            onClick={ () => (disfavor(element.id)) }
          />
        </div>
      ))}
      {isCopy === true && <span>Link copied!</span>}
    </div>
  );
}

CardFavorite.propTypes = {}.isRequired;
