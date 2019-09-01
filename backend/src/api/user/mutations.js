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
    // first, make sure there's not a user with same email
    const duplicateUserQuery = 'SELECT * FROM users WHERE email = $1';
    const duplicateUserValues = [args.email];
    const duplicateUserPromise = db.oneOrNone(
      duplicateUserQuery,
      duplicateUserValues
    );

    // hash password in parallel (neglible performance gain, but still)
    const hashPaswordPromise = new Promise((resolve, reject) => {
      if (!args.password) reject(new Error('No password submitted'));
      resolve(bcrypt.hash(args.password, 12));
    });

    // if no duplicate user, then try to insert new user (with freshly hashed password)
    const insertNewUserPromise = Promise.all([
      duplicateUserPromise,
      hashPaswordPromise,
    ]).then(([duplicateUser, hashedPassword]) => {
      if (duplicateUser)
        throw new Error(`User with email: "${args.email}" exists already`);

      const insertQuery =
        'INSERT INTO users(username, email, password, joined_at) VALUES ($1, $2, $3, $4) RETURNING *';
      const insertValues = [
        args.username,
        args.email,
        hashedPassword,
        new Date().toISOString(),
      ];

      return db.oneOrNone(insertQuery, insertValues);
    });

    // if all went well, then login user with newly created credentials
    return insertNewUserPromise
      .then(newUser => {
        if (!newUser)
          throw new Error(`Something went wrong! New user not created`);

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
