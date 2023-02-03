import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function CardDone({ arrayDoneRecipes }) {
  const [isCopy, setIsCopy] = useState(false);

  const shareClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopy(true);
  };

  return (
    <div>
      {arrayDoneRecipes.map((element, index) => (
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
          <h3 data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</h3>
          { element.tags.length > 0 && element.tags.map((tag) => (
            <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { tag }
            </p>
          )) }
          <img
            src={ shareIcon }
            alt="shareIcon"
            aria-hidden="true"
            onClick={ () => (shareClick(element.type, element.id)) }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </div>
      ))}
      {isCopy === true && <span>Link copied!</span>}
    </div>
  );
}

CardDone.propTypes = {}.isRequired;
