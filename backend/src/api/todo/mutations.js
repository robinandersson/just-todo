const { GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

const db = require('../pgAdapter');
const { TodoType } = require('./types');

const createTodoMutation = {
  type: TodoType,
  args: {
    description: { type: GraphQLString },
  },
  resolve(parent, args, req) {
    const query =
      'INSERT INTO todos(description, is_completed, created_at, completed_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [
      args.description,
      false,
      new Date().toISOString(),
      null,
      req.userId,
    ];

    return db
      .oneOrNone(query, values)
      .then(res => res)
      .catch(err => err);
  },
};

// TODO: create and use GraphQL response payload type, instead of responding with TodoType as null
const removeTodoMutation = {
  type: TodoType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args, req) {
    const query = 'DELETE FROM todos WHERE id=$1 RETURNING *';

    return db
      .one(query, args.id)
      .then(res => res)
      .catch(err => err);
  },
};

// TODO: create and use GraphQL response payload type, instead of responding with TodoType as null
const toggleTodoMutation = {
  type: TodoType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args, req) {
    const query =
      'UPDATE todos SET is_completed = NOT is_completed WHERE id = $1';
    return db
      .none(query, args.id)
      .then(res => res)
      .catch(err => err);
  },
};

// TODO: create and use GraphQL response payload type, instead of responding with TodoType as null
const modifyTodoDescriptionMutation = {
  type: TodoType,
  args: {
    id: { type: GraphQLID },
    description: { type: GraphQLString },
  },
  resolve(parent, args, req) {
    const query = 'UPDATE todos SET description = $2 WHERE id = $1';
    return db
      .none(query, [args.id, args.description])
      .then(res => {
        // res will be undefined, instead simply return the arguments to show it was successful
        return args;
      })
      .catch(err => err);
  },
};

module.exports = {
  createTodoMutation,
  removeTodoMutation,
  toggleTodoMutation,
  modifyTodoDescriptionMutation,
};
