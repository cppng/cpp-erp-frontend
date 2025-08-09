import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import './Pagination.css'

const Pagination = ({ code, totalCount }) => {

    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalCount / itemsPerPage); // Calculate total pages
    const { page } = useParams(); // Get the current page from the URL
    const currentPage = parseInt(page) || 1;
    const renderPageNumbers = () => {
      const pageNumbers = [];
  
      // Always show first page
      if (currentPage > 3) {
        pageNumbers.push(
          <Link key={1} to={`/form/submissions/${code}/1`} className="page-number">
            1
          </Link>
        );
        if (currentPage > 4) {
          pageNumbers.push(<span key="start-dots" className="dots">...</span>);
        }
      }
  
      // Show up to 2 pages before and after current page
      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(totalPages, currentPage + 2);
        i++
      ) {
        pageNumbers.push(
          <Link
            key={i}
            to={`/form/submissions/${code}/${i}`}
            className={`page-number ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </Link>
        );
      }
  
      // Always show last page
      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pageNumbers.push(<span key="end-dots" className="dots">...</span>);
        }
        pageNumbers.push(
          <Link key={totalPages} to={`/form/submissions/${code}/${totalPages}`} className="page-number">
            {totalPages}
          </Link>
        );
      }
  
      return pageNumbers;
    };
  
    return (
      <div className="pagination-container">
        <Link
          to={`/form/submissions/${code}/${currentPage - 1}`}
          className="pagination-button"
          style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
        >
          Prev
        </Link>
        <div className="page-numbers">{renderPageNumbers()}</div>
        <Link
          to={`/form/submissions/${code}/${currentPage + 1}`}
          className="pagination-button"
          style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
        >
          Next
        </Link>
      </div>
    );
  };

  export default Pagination;