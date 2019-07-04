const { GraphQLID, GraphQLList } = require('graphql');

const db = require('../pgAdapter');
const { UserType } = require('./types');

// TODO: check so that only the the actual owner may query for the user details
const userQuery = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [ args.id ];

    return db.oneOrNone(query, values)
      .then(res => res)
      .catch(err => err);
  },
};

// TODO: disable when !production
const usersQuery = {
  type: new GraphQLList(UserType),
  resolve(parent) {
    const query = 'SELECT * FROM users';
    return db.manyOrNone(query)
      .then(res => res)
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = { userQuery, usersQuery };