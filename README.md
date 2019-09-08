# JustTodo

A todo fullstack application with user and login functionality.

Built with [PostgreSQL](https://www.postgresql.org/), [Node.js](https://nodejs.org), [Express](https://expressjs.com/), [GraphQL](https://graphql.org/), and [React.js](https://reactjs.org/).

See respective project root (**backend/** or **frontend/**) for more detailed descriptions and instructions.

## [DEMO](https://justtodoit.herokuapp.com) – Wait for host dyno to spin up on first page visit + first login/signup

Whole stack (including PostgreSQL) deployed as monrepo (Express app serving static React build) at [Heroku](https://www.heroku.com/).

---

## Installation

1. In **root** as well as **/frontend** and **/backend**, run `npm install`. Or just run:

```
npm run fullstack:install
```

2. Set up a postgreSQL database (note credentials for config in step 3).
3. Configure **/backend/.env** (and **/frontend/.env**) to setup environment variables pointing to backend server, db, etc.
4. Use `npm run migrate up`-script below to setup tables and columns.

## Available Scripts

In the project directory, you may run:

### `npm start`

Runs the backend and frontend in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

See header `npm run backend:start` below for backend details.

### `npm run backend:start`

Runs the backend in development mode.

Listens on port 8000 and uses `/graphql` for api calls. Open [http://localhost:8000/graphql](http://localhost:8000/graphql) for interactive graphql interface.

### `npm run frontend:start`

Runs the frontend in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run prettier`

Format project through [https://prettier.io/](Prettier). See _/.prettierrc_ for custom rules.

Pro-Tip! Use format-on-save setting in your editor when making changes.

### `npm run fullstack:install`

Installs packages in project root, backend, and frontend.

### `npm run migrate [up|down]`

Migrate db from current version, use it to setup tables and columns from fresh database.

Use `npm run migrate up` to migrate up completely. To migrate {N} migrations from current step, use `npm run migrate up {N}`. `npm run migrate down` migrates down one step at a time.

### `npm run frontend:test`

Unit and Integration tests for the frontend; Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run fullstack:cypress`

End-to-end tests; Opens the Cypress Test Runner in interactive mode.

Observe! Needs whole stack (frontend, backend, db) to be run locally (according to default config) in order for all tests to succeed. Also needs db to be seeded with some data (readme will be updated with info at later time, for now see comments in Cypress test files).
