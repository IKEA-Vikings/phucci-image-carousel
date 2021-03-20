const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'client/index.jsx'),

  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/public')
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        }
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },

      // CSS modules config
      // {
      //   test: /\.css$/i,
      //   exclude: /node_modules/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //       },
      //     },
      //   ],
      // }
    ]
  },

};
