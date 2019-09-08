## JustTodo - Frontend

A todo fullstack application with user and login functionality.

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

UI styled from scratch using [PostCSS](https://postcss.org/) and [TailwindCSS](https://tailwindcss.com). **(No hefty opinionated css-frameworks in my house!)** Imports icons using [Fontawesome react-packages](https://github.com/FortAwesome/react-fontawesome). Stylesheets should be purged with [Purgecss](https://www.purgecss.com/) before deployment to minimize size.

---

## Installation

1. In frontend root, run : `npm install`
2. Setup backend and db (see backend project).
3. Configure **.env** to setup environment variables pointing to backend, etc.

## Available Scripts

In the project directory, you may run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the create react app section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run css:build`

Compiles the src css files in src/styles and outputs the build to src/index.build.css.

Observe that the js:build/js:start bundles and minifies the css even further (this step should be piped in to CRA's build setup)

### `npm run css:watch`

Same as css:build, but also watches for changes.

Observe that the js:build/js:start bundles and minifies the css even further _(I know, I know, this step should be piped in to CRA's build setup)_.

### `npm run test`

Unit and Integration tests; Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress`

End-to-end tests; Opens the Cypress Test Runner in interactive mode.

Observe! Needs whole stack (frontend, backend, db) to be run locally (according to default config) in order for all tests to succeed. Also needs db to be seeded with some data (readme will be updated with info at later time, for now see comments in Cypress test files).
