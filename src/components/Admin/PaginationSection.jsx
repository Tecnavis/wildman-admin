import React from 'react';

const PaginationSection = ({ currentPage, totalPages, paginate, pageNumbers }) => {
  return (
    <div className="table-bottom-control">
      <div className="dataTables_info">
        Showing page {currentPage} of {totalPages}
      </div>

      <div className="dataTables_paginate paging_simple_numbers">
        <button
          className={`btn btn-primary previous ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-light fa-angle-left"></i>
        </button>

        {pageNumbers.map((number, index) => (
          <span key={index}>
            <button
              className={`btn btn-primary ${currentPage === number ? 'current' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </span>
        ))}

        <button
          className={`btn btn-primary next ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-light fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PaginationSection;
