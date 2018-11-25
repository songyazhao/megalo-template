// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true,
    es6: true
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'no-trailing-spaces': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    getPage: true
  }
}
