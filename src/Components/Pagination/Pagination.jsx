import React from 'react'


export default function Pagination({ itemPerPage, totalItems, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className='w-100'>
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''} cursor-pointer`}>
                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
