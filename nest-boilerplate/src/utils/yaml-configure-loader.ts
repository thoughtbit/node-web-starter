import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

function loadYamlConfigure(configFileName: string): any {
  try {
    const config = yaml.safeLoad(readFileSync(configFileName, 'utf8'));
    return config;
  } catch (e) {
    console.log(e);
  }
}

export { loadYamlConfigure };
