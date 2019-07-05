const secureGraphqlRoute = graphqlRoute => {
  return {
    ...graphqlRoute,
    resolve() {
      // TODO: arguments is an anti-pattern, spread on parameter instead
      if (!arguments[2].isAuth) throw new Error('Request not Authenticated');

      return graphqlRoute.resolve(...arguments);
    },
  };
};

// TODO: share code between backend and frontend somehow? (this is duplicated on the frontend)
class AuthError extends Error {
  constructor(msg, code) {
    super(msg);

    this.code = code;
  }
}

module.exports = { secureGraphqlRoute, AuthError };
