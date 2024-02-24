module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue-pug/vue3-recommended',
    'eslint:recommended',
    '@vue/standard'
  ],
  rules: {
    'vue/max-attributes-per-line': 'off'
  }
}
