# petershih.com

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting Started](#getting-started)
  - [Local Machine Setup](#local-machine-setup)
  - [Example .env file](#example-env-file)
  - [Universal / Isomorphic / Server Side Rendering](#universal--isomorphic--server-side-rendering)
  - [Building and Testing Production Assets Locally](#building-and-testing-production-assets-locally)
- [Code Style](#code-style)
  - [Style Guide](#style-guide)
  - [Babel and ES6](#babel-and-es6)
  - [ESLint for Javascript](#eslint-for-javascript)
  - [StyleLint for CSS / SCSS](#stylelint-for-css--scss)
- [Tests](#tests)
- [Deploying to Heroku](#deploying-to-heroku)
  - [Node Memory and GC Optimization for Heroku Dynos](#node-memory-and-gc-optimization-for-heroku-dynos)
  - [Heroku Rollback](#heroku-rollback)
  - [Heroku Purge](#heroku-purge)
- [Heroku Specific Links](#heroku-specific-links)
- [Documentation](#documentation)
    - [/](#)
    - [/bin](#bin)
    - [/webpack](#webpack)
    - [/www](#www)
    - [/api](#api)
- [Universal Javascript Known Issues](#universal-javascript-known-issues)
- [Git Cheatsheet](#git-cheatsheet)
    - [Reset local master to origin master (discarding changes)](#reset-local-master-to-origin-master-discarding-changes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

### Local Machine Setup

- Create `.env` file and set to `development` values (see example `.env` file)
- Edit `/etc/hosts`, add `127.0.0.1    www.domain.dev` and `127.0.0.1    api.domain.dev`
- Run `npm install`
- Run `npm run watch`

### Example .env file

```
NODE_ENV=development
PORT=3000
URL=http://www.domain.dev:3000
API_URL=http://api.domain.dev:3000
API_VHOST=api.domain.*
MONGODB_URL=127.0.0.1:27017/db
```

### Universal / Isomorphic / Server Side Rendering

- When running in `development`, SSR is turned **off** by default
- When running in `production`, SSR is turned **on** by default

### Building and Testing Production Assets Locally

- Running `npm run build` will create the `/assets` folder
- To simulate a `production` build, run `NODE_ENV=production npm run build`
- To simulate a `production` server, run `NODE_ENV=production npm start`

## Code Style

### Style Guide

- Javascript: https://github.com/airbnb/javascript/blob/master/README.md
- React: https://github.com/airbnb/javascript/blob/master/react/README.md

- There are some exceptions (making certain errors into warnings)
- See `package.json` -> `eslintConfig.rules`

### Babel and ES6

- Presets used: `es2015`, `react`, `stage-1`
- Plugins used: `transform-runtime`
- See `package.json` -> `babel`

### ESLint for Javascript

- Extends from `airbnb` rules
- See `package.json` -> `eslintConfig`


- Run `npm run eslint` to lint all code
- Run `npm run eslint:api` to lint only api code
- Run `npm run eslint:www` to lint only app code

### StyleLint for CSS / SCSS

- Extends from `stylelint-config-standard` rules
- See `package.json` -> `stylelint`

## Tests

- Uses `mocha`, `chai`, `sinon`

## Deploying to Heroku

- Make sure `Heroku App Config Variables` are set to `production` values
- No need to set `PORT`
- No need to set `NODE_ENV`, Heroku defaults to `production`

### Node Memory and GC Optimization for Heroku Dynos

- Use `--max_old_space_size=460` for 1x dynos
- Use `--max_old_space_size=920` for 2x dynos
- See `package.json` -> `scripts.start`

### Heroku Rollback

- Run `npm run rollback` to rollback to the previous Heroku deploy

### Heroku Purge

- Run `npm run purge` to wipe the Heroku `node_modules` cache

## Heroku Specific Links

- https://devcenter.heroku.com/articles/node-best-practices#avoid-garbage
- https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps

## Documentation

#### /

- `./server.js` - the primary express server which utilizes 2 `vhosts`, one for the `app` and one for the `api`

#### /bin

- `/bin/bootstrap.js` - launches the app, depends on `NODE_ENV`
- `/bin/build.js` - uses webpack to build production assets
- `/bin/webpack-dev-server.js` - in `development`, launches the webpack livereload proxy

#### /webpack

- `/webpack/webpack.config.js` - webpack config depends on `NODE_ENV`
- `/webpack/loaders.js` - shared webpack loaders for all environments
- `/webpack/plugins.js` - shared webpack plugins for all environments
- `/webpack/build-define.js` - generates environment variables to be passed to the app
- `/webpack/build-css-loaders.js` - generates css/scss/less and css modules loaders (postcss)

#### /www

- This is where the client-side React app lives

#### /api

- This is where the backend api lives

## Universal Javascript Known Issues

- Can't use https://github.com/tcoopman/image-webpack-loader because of `images-require-hook`

## Git Cheatsheet

#### Reset local master to origin master (discarding changes)

```
git fetch
git reset --hard origin/master
```

---

**[⬆ back to top](#table-of-contents)**
