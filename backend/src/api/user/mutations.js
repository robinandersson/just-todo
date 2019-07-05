const { GraphQLString, GraphQLBool } = require('graphql');
const bcrypt = require('bcryptjs');

const db = require('../pgAdapter');
const { UserType } = require('./types');

//TODO: add password
const createUserMutation = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    // make sure there's not a user with same email
    const duplicateQuery = 'SELECT * FROM users WHERE email = $1';
    const duplicateValues = [args.email];
    return db
      .oneOrNone(duplicateQuery, duplicateValues)
      .then(duplicateUser => {
        if (duplicateUser)
          throw new Error(`User with email: "${args.email}" exists already`);

        // handle missing password error separately because bcrypt throws obscure error otherwise
        if (!args.password) throw new Error('No password submitted');

        return bcrypt.hash(args.password, 12);
      })
      .then(hashedPassword => {
        const query =
          'INSERT INTO users(username, email, password, joined_at) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [
          args.username,
          args.email,
          hashedPassword,
          new Date().toISOString(),
        ];

        return db.oneOrNone(query, values);
      })
      .then(res => res)
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
};

// TODO: create and use GraphQL response payload type, instead of responding with UserType as null
const updateUserMutation = {
  type: UserType,
  args: {
    password: { type: GraphQLString },
  },
  resolve(parent, args, req) {
    return bcrypt
      .hash(args.password, 12)
      .then(hashedPassword => {
        const query = 'UPDATE users SET password = $2 WHERE id=$1';
        const values = [req.userId, hashedPassword];

        return db.none(query, values);
      })
      .then(res => res)
      .catch(err => {
        console.log(err);
        return err;
      });
  },
};

module.exports = { createUserMutation, updateUserMutation };
