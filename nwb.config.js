module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'with-mobx-store',
      externals: {
        react: 'React'
      }
    }
  }
}
