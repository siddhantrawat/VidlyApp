import _ from "lodash";

export function paginate(items, pageSize, pageNumber) {
  const startIndex = (pageNumber - 1) * pageSize;
  const sliced_items = _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();

  return sliced_items;
}
