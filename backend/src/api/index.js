const graphqlHTTP = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { userQuery, usersQuery } = require('./user/queries');
const { createUserMutation, updateUserMutation } = require('./user/mutations');
const { loginQuery } = require('./auth/queries');
const { todoQuery, todosQuery } = require('./todo/queries');
const { createTodoMutation, removeTodoMutation, toggleTodoMutation, modifyTodoDescriptionMutation } = require('./todo/mutations');
const { secureGraphqlRoute } = require('./../helpers/auth');

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  type: 'Query',
  fields: {
    user: secureGraphqlRoute(userQuery),
    users: secureGraphqlRoute(usersQuery),
    login: loginQuery,
    todo: secureGraphqlRoute(todoQuery),
    todos: secureGraphqlRoute(todosQuery),
  },
});

const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  type: 'Mutation',
  fields: {
    createUser: createUserMutation,
    updateUser: secureGraphqlRoute(updateUserMutation),
    createTodo: secureGraphqlRoute(createTodoMutation),
    removeTodo: secureGraphqlRoute(removeTodoMutation),
    toggleTodo: secureGraphqlRoute(toggleTodoMutation),
    modifyTodoDescription: secureGraphqlRoute(modifyTodoDescriptionMutation),
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

const graphqlRoutes = graphqlHTTP({
  schema,
  customFormatErrorFn(err) {
    console.table(err);
    if (err.originalError) err.code = err.originalError.code;
    console.log(err.code);

    return err;
  },   // include status code in graphql response
  pretty: true,
  graphiql: true,
});

module.exports = { graphqlRoutes };