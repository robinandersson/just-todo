const { GraphQLString, GraphQLError } = require('graphql');
const bcrypt = require('bcryptjs');

const db = require('../pgAdapter');
const { AuthDataType } = require('./types');

const { AuthError, loginUser } = require('../../helpers/auth');

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

    return Promise.all([userPromise, passwordPromise])
      .then(([user, passwordIsCorrect]) => {
        if (!passwordIsCorrect)
          throw new AuthError('Password is incorrect!', 401);

        // login successfull
        return loginUser(user);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
};

module.exports = { loginQuery };
