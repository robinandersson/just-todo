# JustTodo

A todo fullstack application with user and login functionality.

Uses PostgreSQL, Node, Express, GraphQL, and React.

## Installation

1. In **root** as well as **/frontend** and **/backend**, run:

```
npm install
```

### PostgreSQL database

2. Set up a postgreSQL database and enter correct credentials in **/backend/.env**.
3. Use `migrate`-script below to setup tables and columns (for now, migrate up as far as it goes to properly set up project).

### .env

4. Config **.env** -file in **/backend** to setup environment variables pointing to backend-server, db, etc.

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
