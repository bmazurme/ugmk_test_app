import React, { useEffect, useState } from 'react';

import { buildProperties, BASE_URL } from '../utils';

function useQuery(props) {
  const [state, setState] = useState({ data: [], hasError: true, isLoading: true });

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    async function getData(props) {
      const { currentUrl, options } = buildProperties({ baseUrl: BASE_URL, props });

      try {
        const response = await fetch(currentUrl, options);
        const products = await response.json();

        if (response.ok) {
          setState({ products, error: false, isLoading: false });
        } else {
          console.log('error response', response.status);
          setState({ products: [], error: true, isLoading: false });
        }
      } catch (e) {
        console.log('error api query', e);
        setState({ products: [], error: true, isLoading: false });
      }
    }

    getData(props);
  }, []);

  return (state);
}

export { useQuery };
