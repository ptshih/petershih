### Getting Started

- Create `.env` file and set to `development` values
- Edit `/etc/hosts` and insert: `127.0.0.1 www.domain.dev` and `127.0.0.1 api.domain.dev`
- Run `npm install`
- Run `npm run watch`

### Example .env file

```
NODE_ENV=development
DEBUG_PREFIX=...
PORT=3000
URL=http://www.domain.dev:3000
API_URL=http://api.domain.dev:3000
API_VHOST=api.domain.*
MONGODB_URL=127.0.0.1:27017/db
```

### Deploying to Heroku

- Make sure `Config Variables` are set to `production` values
- Omit `PORT`
- Set `NODE_ENV=production`
- Set `BUILD_ASSETS=true`
- Heroku will automatically build production assets during deploy (`postinstall`)

### Heroku Rollback

- Run `npm run rollback` to rollback to the previous Heroku deploy

### Heroku Purge

- Run `npm run purge` to wipe the Heroku `node_modules` cache

### Building Production Assets Locally

- Running `npm run build` will create the `/assets` folder

### Node Memory and GC Optimization

See `package.json -> scripts -> start`.

- Use `--max_old_space_size=460` for 1x dynos
- Use `--max_old_space_size=920` for 2x dynos

### ESLint

- Run `npm run eslint` to lint all code
- Run `npm run eslint:api` to lint only api code
- Run `npm run eslint:src` to lint only app code
- See `package.json -> eslintConfig`
- Extends from `airbnb` rules

### StyleLint

- See `package.json -> stylelint`
- Extends from `stylelint-config-standard` rules

### Tests

- Uses `mocha`, `chai`, `sinon`
- TBD

---

## Documentation

### Files

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

#### /server

- `./server/index.js` - the primary express server which utilizes 2 `vhosts`, one for the `app` and one for the `api`

#### /src

- This is where the client-side React app lives

#### /api

- This is where the backend api lives

---

### Universal Javascript Known Issues

- Can't use https://github.com/tcoopman/image-webpack-loader because of `images-require-hook`
- Can `import/require` stylesheets using `css-modules-require-hook` hack
- Can `import/require` images using `images-require-hook` hack
