const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const AuthDataType = new GraphQLObjectType({
  name: 'AuthData',
  fields: {
    userId: { type: GraphQLID },
    username: { type: GraphQLString },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  },
});

module.exports = { AuthDataType };
