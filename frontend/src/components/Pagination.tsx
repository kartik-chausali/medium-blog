import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          //style={i === currentPage ? {fontWeight:'bold' , color:'blue'} : {}}
          //className='bg-slate-200 p-2 m-1 rounded-full'
          className={i == currentPage ? 'bg-blue-400 rounded-full p-2' : 'bg-slate-200 p-2 m-1 rounded-xl'}
          
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className='bg-slate-200 p-2 m-1 rounded-xl hover:bg-slate-500'>
        Prev
      </button>
      {getPageNumbers()}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='bg-slate-200 p-2 m-1 rounded-xl hover:bg-slate-500'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
