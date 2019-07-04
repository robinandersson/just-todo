const express = require('express');

const { graphqlRoutes } = require('./api');
const { isAuthenticated } = require('./middleware/is-auth');

const app = express();

app.use(isAuthenticated);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use('/graphql', graphqlRoutes)

app.listen(8000);