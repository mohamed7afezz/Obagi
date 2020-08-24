import React, { useState } from 'react';

export default function Paginator({pagerData, rowComponent, rowsPerPage}) {
    const [currPage, updateCurrPage] = useState(1);

    const Row = rowComponent;
    const pager = constructPagerData(pagerData, rowsPerPage);

    /**
     * @requires data,rowsPerPage
     * @param {Array} data array of data
     * @param {number} rowsPerPage number of rows to show
     * @returns pagerData array contains pages [ [pageData], [PageData] ]
     */
    function constructPagerData (data, rowsPerPage) {
        let pagerData = [];
        let pageData = [];

        pagerData = data.reduce((acc, item, index) => {
            pageData.push(item);
            if((index  + 1) % rowsPerPage == 0 || (index + 1) === data.length) {
                acc.push(pageData);
                pageData = [];
            }
            return acc;
        }, [])

        return pagerData;
    }

    function gotoPage(e, pageNumber) {
        e.preventDefault();
        document.querySelectorAll('.pages-wrapper .page').forEach(link => link.classList.add('d-none'));
        document.querySelector(`.pages-wrapper .page-${pageNumber}`).classList.remove('d-none');

        document.querySelectorAll('.pager-wrapper .page-link').forEach(link => link.classList.remove('active'));
        document.querySelector(`.pager-wrapper .page-link-${pageNumber}`).classList.add('active');
        updateCurrPage(currPage + 1);
    }

    function prevPage(e) {
        e.preventDefault();
        if(currPage > 1) {
            gotoPage(e, currPage - 1);
        }        
    }

    function nextPage(e) {
        e.preventDefault();
        if(currPage < pager.length) {
            gotoPage(e, currPage  + 1);
        }
    }

    return (
        <>
            <div className="pages-wrapper">
                {
                    pager.map((page, index) => {
                        return (
                            <div className={["page", `page-${index + 1}`, index != 0? 'd-none': ''].join(' ')}>
                                {
                                    page.map(row => {
                                        return <Row data={row} />
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>  

            <div className="pager-wrapper">
                {/* pages navigator */}
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li className={`page-item ${currPage == 1? 'd-none' : ''}`}>
                            <a class="page-link prev-link d-none" href="prev" aria-label="Previous" onClick={(e) => {prevPage(e)}}>
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        
                        {
                            pager.map((item, index) => {
                                return <li class="page-item"><a className={`page-link page-link-${index + 1} ${(index > 0? '' : 'active')}`} href={`${index + 1}`} onClick={(e) => {gotoPage(e, index + 1)}}>{index + 1}</a></li>
                            })
                        }
                        
                        <li class="page-item">
                            <a class="page-link next-link" href="next" aria-label="Next" onClick={(e) => {nextPage(e)}}>
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>          
        </>
    )
}