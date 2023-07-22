import { productApi } from '../create-api';

const productApiEndpoints = productApi
  .enhanceEndpoints({
    addTagTypes: ['product'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => '/products',
        providesTags: ['product'],
      }),
    }),
  });

export const { useGetProductsQuery } = productApiEndpoints;
export { productApiEndpoints };
