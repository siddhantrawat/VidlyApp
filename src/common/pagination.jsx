import React, { Component } from "react";
import _ from "lodash";
import PropTypes, { number, func } from "prop-types";

const Pagination = props => {
  const { pageSize, totalItems, onPageClick, currentPage } = props;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageNo = _.range(1, totalPages + 1);

  if (totalPages === 1) return null;

  return (
    <nav className="nav">
      <ul className="pagination">
        {pageNo.map(page => (
          <li
            key={page}
            className={page == currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageClick(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.prototype = {
  pageSize: number.isRequired,
  totalItems: number.isRequired,
  onPageClick: func.isRequired,
  currentPage: number.isRequired
};
export default Pagination;
