const express = require('express');
const path = require('path');

const { graphqlRoutes } = require('./api');
const { isAuthenticated } = require('./middleware/is-auth');
const { allowCORS, forceHTTPS } = require('./middleware/security-policies');

const app = express();

app.use(allowCORS);

// TODO force https when deployment is ready
// if (process.env.NODE_ENV === 'production') {
//   app.use(forceHTTPS);
// }

app.use(isAuthenticated);

app.use(express.json());

app.use(process.env.GRAPHQL_ROUTE || '/graphql', graphqlRoutes);

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
