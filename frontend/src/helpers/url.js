const { REACT_APP_SERVER_URL, REACT_APP_GRAPHQL_ROUTE } = process.env;

const serverURLs = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
    case 'development':
    default:
      return {
        SERVER_URL: REACT_APP_SERVER_URL || '', // assume frontend is served from same server if env var not set
        GRAPHQL_ROUTE: REACT_APP_GRAPHQL_ROUTE || '/graphql',
      };
  }
})();

export const SERVER_URL = serverURLs.SERVER_URL;
export const GRAPHQL_ROUTE = serverURLs.GRAPHQL_ROUTE;
