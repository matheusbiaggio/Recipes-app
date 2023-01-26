import { useState } from 'react';

function useRequestAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeFetch = async (nameAPI, endpoint) => {
    try {
      setIsLoading(true);

      const url = `www.the${nameAPI}db.com/api/json/v1/1/${endpoint}`;

      const response = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');

      console.log(response);

      if (!response.ok) {
        console.log('entrou no if');
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
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
