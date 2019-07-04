const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');

const db = require('../pgAdapter');
const  { UserType } = require('../user/types');

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    isCompleted: {
      type: GraphQLBoolean,
      resolve: parent => parent.is_completed,
    },
    createdAt: {
      type: GraphQLString,
      resolve: parent => parent.created_at,
    },
    completedAt: {
      type: GraphQLString,
      resolve: parent => parent.completed_at,
    },
    userId: {
      type: GraphQLString,
      fieldName: 'sture', //TODO: What was this about, does it work?
      resolve: parent => parent.user_id,
    },
  })
});

module.exports = { TodoType };