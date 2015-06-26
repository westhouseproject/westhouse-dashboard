# Webpack and Babel boilerplate

This is just some boilerplate code for those that want to get bootstrapped with Babel and Webpack. This is strictly for front-end projects.

## Developing

The entry-point is in src/main.js, and all code goes in the `src` folder.

To preview your app, run `npm run develop`, and then navigate to `http://127.0.0.1:8080/webpack-dev-server`.

Although, as you are developing, unit tests are being run, but if you want to run your unit test separately, then execute the following command: `npm test`.

## Distributing

To have your project be distributable, run `npm run bundle`. The final build should be in the public folder.