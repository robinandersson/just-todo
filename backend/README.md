## JustTodo - Backend

A todo fullstack application with user and login functionality.

Backend built with [Node.js](https://nodejs.org), [Express](https://expressjs.com/) and [GraphQL](https://graphql.org/) ([GraphQl.js](https://github.com/graphql/graphql-js) and [express-graphql](https://github.com/graphql/express-graphql) packages). Uses [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) to handle user-sessions.

Persists data in [PostgreSQL](https://www.postgresql.org/) – handled through [pg-promise](http://vitaly-t.github.io/pg-promise/).

---

## Installation

1. in backend root, run: `npm install`

### Setup database

2. Set up a postgreSQL database (note credentials for config in step 4).
3. Use `npm run migrate up`-script below to setup tables and columns.

### Configure .env

4. Configure **.env** to setup environment variables pointing to backend server, db, etc.

## Available Scripts

In the project directory, you may run:

### `npm start`

Runs the backend in development mode at [http://localhost:8000](http://localhost:8000).

### `npm run migrate [up|down]`

Migrate db from current version, use it to setup tables and columns from fresh database.

Use `npm run migrate up` to migrate up completely. To migrate {N} migrations from current step, use `npm run migrate up {N}`. `npm run migrate down` migrates down one step at a time.
