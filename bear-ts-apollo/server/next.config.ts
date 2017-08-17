import CopyWebpackPlugin from 'copy-webpack-plugin';
import { union } from 'lodash';

export default {
  webpack: (config): object => ({
    ...config,
    plugins: union(
      config.plugins,
      [
        new CopyWebpackPlugin([
          {
            from: '../static',
            to: '../static'
          }
        ], { copyUnmodified: true })
      ]
    )
  })
};
