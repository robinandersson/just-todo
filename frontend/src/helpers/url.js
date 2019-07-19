const { REACT_APP_SERVER_URL, REACT_APP_GRAPHQL_ROUTE } = process.env;

const getServerUrls = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        SERVER_URL: window.location.host,
        GRAPHQL_ROUTE: REACT_APP_GRAPHQL_ROUTE,
      };
    case 'development':
      return {
        SERVER_URL: REACT_APP_SERVER_URL,
        GRAPHQL_ROUTE: REACT_APP_GRAPHQL_ROUTE,
      };
    default:
      return {
        SERVER_URL: 'http://localhost:8000',
        GRAPHQL_ROUTE: '/graphql',
      };
  }
};

export { getServerUrls };
