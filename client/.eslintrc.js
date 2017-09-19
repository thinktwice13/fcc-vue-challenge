module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module"
  },
  plugins: ["html"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: [1, "double"],
    semi: ["error", "never"],
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-console": 0,
    "no-unused-vars": 1
  }
}
