export function generateReactKey(prefix) {
  return `${prefix}_${new Date().getTime()}`;
}
