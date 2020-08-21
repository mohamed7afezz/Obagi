import React from 'react';

export default function Paginator({pagerData, rowComponent, rowsPerPage}) {
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

    function gotoPage(pageNumber) {
        // document.querySelector()
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
                        <li class="page-item d-none">
                            <a class="page-link" href="prev" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        
                        {
                            pager.map((item, index) => {
                                return <li class="page-item"><a class="page-link" href={`${index + 1}`} onClick={(e) => {}}>{index + 1}</a></li>
                            })
                        }
                        
                        <li class="page-item">
                            <a class="page-link" href="next" aria-label="Next">
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