import { SERVER_URL, GRAPHQL_ROUTE } from '../utils/url';

const request = ({ url, method, query, headers }) =>
  fetch(url || `${SERVER_URL}${GRAPHQL_ROUTE}`, {
    method: method || 'POST',
    body: JSON.stringify({ query }),
    headers: headers || {
      'Content-Type': 'application/json',
    },
  });

const backendRequest = query => request({ query });

export { request, backendRequest };
