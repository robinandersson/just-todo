const express = require('express');
const path = require('path');

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

app.use('/graphql', graphqlRoutes);

switch (process.env.NODE_ENV) {
  case 'production':
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname, '/../../frontend/build')));

    // Handles any requests that don't match the ones above
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/../../frontend/build/index.html'));
    });
    break;

  case 'development':
  default:
    break;
}

app.listen(process.env.PORT || 8000);
