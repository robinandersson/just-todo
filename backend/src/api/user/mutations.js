const { GraphQLString, GraphQLBool } = require('graphql');
const bcrypt = require('bcryptjs');

const db = require('../pgAdapter');
const { AuthDataType } = require('../auth/types');
const { loginUser } = require('../../helpers/auth');
const { UserType } = require('./types');

const createUserMutation = {
  type: AuthDataType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    // make sure there's not a user with same email
    const duplicateQuery = 'SELECT * FROM users WHERE email = $1';
    const duplicateValues = [args.email];
    const duplicatePromise = db.oneOrNone(duplicateQuery, duplicateValues);

    const hashPaswordPromise = new Promise((resolve, reject) => {
      if (!args.password) reject(new Error('No password submitted'));
      resolve(bcrypt.hash(args.password, 12));
    });

    const createUserPromise = hashPaswordPromise.then(hashedPassword => {
      const query =
        'INSERT INTO users(username, email, password, joined_at) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [
        args.username,
        args.email,
        hashedPassword,
        new Date().toISOString(),
      ];

      return db.oneOrNone(query, values);
    });

    return Promise.all([duplicatePromise, createUserPromise])
      .then(([duplicateUser, newUser]) => {
        if (duplicateUser)
          throw new Error(`User with email: "${args.email}" exists already`);

        return loginUser(newUser);
      })
      .catch(err => err);
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
      .catch(err => err);
  },
};

module.exports = { createUserMutation, updateUserMutation };
