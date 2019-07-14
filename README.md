# JustTodo

A todo fullstack application with user and login functionality.

Uses PostgreSQL, Node, Express, GraphQL, and React.

## Installation

1. In **root** as well as **/frontend** and **/backend**, run:

```
npm install
```

### .env

2. Config **/backend/.env** to setup environment variables pointing to backend-server, db (set up below), etc.

### PostgreSQL database

3. Set up a postgreSQL database (double check **db-credentials in **/backend/.env\*\*).
4. Use `npm run migrate up`-script below to setup tables and columns (for now, migrate up as far as it goes to properly set up project).

## Available Scripts

In the project directory, you may run:

### `npm start`

Runs the backend and frontend in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run backend:start`

Runs the backend in development mode.<br>
Listens on port 8000 and uses /graphql for api calls.<br>
Open [http://localhost:8000/graphql](http://localhost:8000/graphql) for interactive graphql interface.

### `npm run frontend:start`

Runs the frontend in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run prettier`

Format project through [https://prettier.io/](Prettier). See _/.prettierrc_ for custom rules.

Pro-Tip! Use format-on-save setting in your editor when making changes. See prettier and/or your editor documentation for how to set it up.

### `npm run migrate [up/down]`

Migrate db completely up or down from current step, use it to setup tables and columns.

To run N migrations from current step, use `npm run migrate [up/down] {N}`.
