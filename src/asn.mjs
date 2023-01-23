import fs from 'fs';
import IP from '@wnynya/ip';

import path from 'path';
import { fileURLToPath } from 'url';
const ___filename = fileURLToPath(import.meta.url);
const ___dirname = path.dirname(___filename);
const ip2as = JSON.parse(
  fs.readFileSync(path.resolve(___dirname, '../data/asn-ip-as.json'))
);
const as2name = JSON.parse(
  fs.readFileSync(path.resolve(___dirname, '../data/asn-as-name.json'))
);

/**
 * @async
 * @function query
 * @desc Get AS infrmation about ip address
 * @param {string} ip
 */
function query(ip) {
  let result = {
    ip: ip,
    number: null,
    name: '',
  };

  if (!ip2as || !as2name) {
    return result;
  }

  const ipa = new IP(ip);

  const m = ip.match(/(\d+)\.(\d+\.\d+\.\d+)/);
  if (!m) {
    return result;
  }
  const fn = m[1] * 1;
  const set = ip2as[fn];
  for (const key in set) {
    if (ipa.in(new IP(fn + '.' + key))) {
      result.number = set[key] * 1;
      result.name = as2name[result.number];
      break;
    }
  }

  return result;
}

export default query;

export { query };
