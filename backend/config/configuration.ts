import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

/**
 * CHANGE ENV VAR IN YML
 * @param obj
 * @returns
 */
const changeValue = (obj) => {
  if (typeof obj === 'object') {
    // iterating over the object using for..in
    for (const keys in obj) {
      //checking if the current value is an object itself
      if (typeof obj[keys] === 'object') {
        // if so then again calling the same function
        changeValue(obj[keys]);
      } else {
        if (obj[keys] && typeof obj[keys] == 'string') {
          const regex = /(\$\{(.*)\})/g;

          const found = obj[keys].match(regex);

          if (found) {
            const myKey = obj[keys].replace(regex, '$2');

            if (process.env[myKey]) {
              const newValue = obj[keys].replace(regex, process.env[myKey]);

              obj[keys] = newValue;
            }
          }
        }
      }
    }
  }
  return obj;
};

export default () => {
  const res = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;

  return changeValue(res);
};
