export function search(items, searchvalue) {
  return items.filter(item => item.indexOf(/searchvalue/i) == true);
}
