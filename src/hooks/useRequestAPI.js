import { useState } from 'react';

function useRequestAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeFetch = async (mealOrDrink, endpoint) => {
    try {
      setIsLoading(true);
      const url = `https://www.the${mealOrDrink}db.com/api/json/v1/1/${endpoint}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    makeFetch, isLoading, errors,
  };
}

export default useRequestAPI;
