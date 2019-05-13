import { join } from 'path';
export const packageJson = require(join(__dirname, '..', '..') +
  '/package.json');

export default {
  packageJson,
};
