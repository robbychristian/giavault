export function isEmpty(obj: any) {
  for (var i in obj) {
    if (obj[i].length <= 1) return true;
    return false;
  }
  return true;
}
