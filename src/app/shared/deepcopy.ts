export function deepCopyObject(o) {
  let r;

  if (typeof o !== 'object') {
    return o;
  }
  if (!o) {
    return o;
  }

  if (o.constructor === Array) {
    r = [];
    const l = o.length;
    for (let i = 0; i < l; i++) {
      r[i] = deepCopyObject(o[i]);
    }
    return r;
  }
  r = {};
  for (const i in o) {
    if (o.hasOwnProperty(i)) {
      r[i] = deepCopyObject(o[i]);
    }
  }
  return r;
}
