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
        
        const pagesWrapper = e.target.closest('.pager-wrapper').previousSibling;
        const pagerWrapper = e.target.closest('.pager-wrapper');

        pagesWrapper.querySelectorAll('.page').forEach(link => link.classList.add('d-none'));
        pagesWrapper.querySelector(`.page-${pageNumber}`).classList.remove('d-none');

        pagerWrapper.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));
        pagerWrapper.querySelector(`.page-link-${pageNumber}`).classList.add('active');
        updateCurrPage(pageNumber);

        // scroll to page top
        pagesWrapper.scrollIntoView();
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

    function firstPage(e) {
        e.preventDefault();
        gotoPage(e, 1);
    }

    function lastPage(e) {
        e.preventDefault();
        gotoPage(e, pager.length)
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
                         {/* <li className={`page-item ${currPage == 1? 'd-none' : ''}`}>
                            <a class="page-link first-link" href="first" aria-label="First" onClick={firstPage}>
                                <span aria-hidden="true">first</span>
                                <span class="sr-only">First Page</span>
                            </a>
                        </li> */}
                        <li className={`page-item ${currPage == 1? 'd-none' : ''}`}>
                            <a class="page-link prev-link" href="prev" aria-label="Previous" onClick={prevPage}>
                                <span aria-hidden="true">&#60;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        
                        {
                            pager.map((item, index) => {
                                return <li class="page-item"><a className={`page-link page-link-${index + 1} ${(index > 0? '' : 'active')}`} href={`${index + 1}`} onClick={(e) => {gotoPage(e, index + 1)}}>{index + 1}</a></li>
                            })
                        }
                        
                        <li className={`page-item ${currPage == pager.length ? 'd-none' : ''}`}>
                            <a class="page-link next-link" href="next" aria-label="Next" onClick={nextPage}>
                                <span aria-hidden="true">&#62;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                        {/* <li className={`page-item ${currPage == pager.length ? 'd-none' : ''}`}>
                            <a class="page-link last-link" href="last" aria-label="last" onClick={lastPage}>
                                <span aria-hidden="true">last</span>
                                <span class="sr-only">Last Page</span>
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>          
        </>
    )
}