const withLess = require('@zeit/next-less');

module.exports = withLess({
  cssModules: false,
  devIndicators: {
    autoPrerender: false,
  },
});
