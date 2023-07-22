import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../utils/config';

// Create our baseQuery instance
export const baseQuery = fetchBaseQuery({
  reducerPath: 'productApi',
  baseUrl: BASE_URL,
  endpoints: () => ({}),
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });
