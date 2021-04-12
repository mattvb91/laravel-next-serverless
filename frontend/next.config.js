const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');

module.exports = withCSS(withSass(withTM({
    env: {
        API_TARGET: process.env.API_TARGET
    },
    future: {
        webpack5: true,
    },
})));