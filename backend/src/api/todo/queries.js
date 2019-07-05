const { GraphQLID, GraphQLList } = require('graphql');

const db = require('../pgAdapter');
const { TodoType } = require('./types');

// TODO: check so that only the the actual owner of the todo may query for it
const todoQuery = {
  type: TodoType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args, req) {
    const query = 'SELECT * FROM todos WHERE id = $1';
    const values = [args.id];

    return db
      .oneOrNone(query, values)
      .then(res => res)
      .catch(err => err);
  },
};

// TODO: check so that only the the actual owner of the todos can query for them (get the userId from the request, not take it as a parameter)
const todosQuery = {
  type: new GraphQLList(TodoType),
  args: { userId: { type: GraphQLID } },
  resolve(parent, args) {
    const query = 'SELECT * FROM todos WHERE user_id = $1';
    const values = [args.userId];

    return db
      .manyOrNone(query, values)
      .then(res => res)
      .catch(err => err);
  },
};

module.exports = { todoQuery, todosQuery };
