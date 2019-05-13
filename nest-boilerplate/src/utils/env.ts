/**
 * Node环境变量
 */

export const nodeEnv = process.env.NODE_ENV;
export const isDevEnv = nodeEnv === 'development';
export const isTestEnv = nodeEnv === 'test';
export const isProdEnv = nodeEnv === 'production';

export default {
  isDevEnv,
  isTestEnv,
  isProdEnv,
  nodeEnv,
};
