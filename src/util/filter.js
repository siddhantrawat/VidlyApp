export function filter(items, filtervalue) {
  return items.filter(item => item.genre.name == filtervalue);
}
