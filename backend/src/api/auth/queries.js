const { GraphQLString, GraphQLError } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../pgAdapter');
const { AuthDataType } = require('./types');

const { AuthError } = require('../../helpers/auth');

const loginQuery = {
  type: AuthDataType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, { email, password }) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    const userPromise = db.oneOrNone(query, values);

    const passwordPromise = userPromise.then(user => {
      if (!user) throw new Error(`User with email "${email}" does not exist`);

      return bcrypt.compare(password, user.password);
    });

    // login successfull
    return Promise.all([userPromise, passwordPromise])
      .then(([user, passwordIsCorrect]) => {
        if (!passwordIsCorrect)
          throw new AuthError('Password is incorrect!', 401);

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          'supersecretkey', //TODO: generate secure key and store elswehere
          { expiresIn: '1h' }
        );

        // AuthDataType expected
        return {
          userId: user.id,
          username: user.username,
          token,
          tokenExpiration: 1,
        };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
};

module.exports = { loginQuery };
