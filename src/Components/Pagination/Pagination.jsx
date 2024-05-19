import React from "react";

export default function Pagination({ itemPerPage, totalItems, paginate, currentPage, }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  // Determine the "block" where the current page falls
  const currentBlock = Math.ceil(currentPage / 3);

  // Calculate the range of numbers to be displayed
  const blockStart = (currentBlock - 1) * 3 + 1;
  const blockEnd = blockStart + 2;

  // Adjust the range for the last block
  const adjustedBlockEnd =
    blockEnd > pageNumbers.length ? pageNumbers.length : blockEnd;

  return (
    <nav className="w-100">
      <ul className="pagination justify-content-center">
        {currentPage > 1 && (
          <li className="page-item cursor-pointer">
            <a onClick={() => paginate(currentPage - 1)} className="page-link">
              Prev
            </a>
          </li>
        )}
        {pageNumbers.slice(blockStart - 1, adjustedBlockEnd).map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""
              } cursor-pointer`}
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li className="page-item cursor-pointer">
            <a onClick={() => paginate(currentPage + 1)} className="page-link">
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
