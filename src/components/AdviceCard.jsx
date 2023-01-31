import React from 'react';

export default function AdviceCard({ title, image, index }) {
  return (

    <div>
      <h3 data-testid={ `${index}-recommendation-title` }>
        { title }
      </h3>
      <img src={ image } alt="nome" />
    </div>
  );
}

AdviceCard.propTypes = {}.isRequired;
