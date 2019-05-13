/**
 * 环境变量
 */

export const env = process.env.NODE_ENV;
export const isDev = Object.is(env, 'dev');
export const isProd = Object.is(env, 'prod');
export const isTest = Object.is(env, 'test');

export default {
  isDev,
  isProd,
  isTest,
  env,
};
