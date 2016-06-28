const path = require('path');
const webpack = require('webpack');

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'src');
const env = process.env.NODE_ENV || 'development';
const minified = env === 'development' ? '' : '.min';
const exclude = [/node_modules/];

const config = {
  context: srcPath,

  entry: {
    reduxReuse: ['reduxReuse'],
  },

  output: {
    path: distPath,
    filename: `[name]${minified}.js`,
    library: ['reduxReuse', '[name]'],
    libraryTarget: 'umd',
  },

  resolve: {
    root: [srcPath]
  },

  module: {
    preloaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude
      }
    ]
  },
};

module.exports = [
  config,
  {
    ...config,
    entry: { reduxReuse: 'reduxReuse' },
    output: {
      ...config.output,
      filename: `reduxReuse${minified}.js`,
      library: 'reduxReuse',
    },
  }
];
