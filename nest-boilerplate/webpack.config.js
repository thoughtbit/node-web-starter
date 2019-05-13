const { join } = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV;
const isProduction = typeof env !== 'undefined' && env === 'production';
const mode = isProduction ? 'production' : 'development';
const dist = join(__dirname, 'dist');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.hmr.ts'],
  output: {
    path: dist,
    filename: 'server.js',
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  watch: true,
  plugins: [ 
    new webpack.HotModuleReplacementPlugin(), 
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [dist]
    }),
  ],
  mode: mode,
  target: 'node',
}