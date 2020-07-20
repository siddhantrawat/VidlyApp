import React from "react";
import { filter } from "../util/filter";
const Filter = props => {
  const {
    items,
    valueProperty,
    textProperty,
    onItemSelect,
    selectedItem
  } = props;

  return (
    <ul className="list group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            selectedItem == item[textProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = { valueProperty: "_id", textProperty: "name" };

export default Filter;
