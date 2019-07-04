const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');

const db = require('../pgAdapter');
const { TodoType } = require('../todo/types');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: {
      type: GraphQLString,
      // override any atempt to get password
      resolve: parent => null,
    },
    joinedAt: {
      type: GraphQLString,
      resolve: parent => parent.joined_at,
    },
    lastLogin: {
      type: GraphQLString,
      resolve: parent => parent.last_login,
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent) {
        const query = 'SELECT * FROM todos WHERE user_id = $1';
        const values = [ parent.id ];

        return db.manyOrNone(query, values)
          .then(res => res)
          .catch(err => err);
      },
    },
  },
});

module.exports = { UserType };