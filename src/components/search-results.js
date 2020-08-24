import React, { useEffect } from "react"
import { Link, graphql, useStaticQuery } from 'gatsby'
import searchResultStyle from '../assets/scss/components/search-results.module.scss'
import { CustomSelect } from '../assets/js/custom-select'
import SearchProductsResult from "./search-poducts-result"

const SearchResult = () => {


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className={searchResultStyle.results}>Results for "<span className={searchResultStyle.selected}>Cleanser</span>"</div>
                        <div className={searchResultStyle.footnote}>We couldn’t find results for</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-3">

                        <div className={searchResultStyle.buttonsWrapper}>
                            <div className={searchResultStyle.typeButton}><Link to="#">(<span>6</span>) MEDICAL</Link></div>
                            <div className={searchResultStyle.typeButton}><Link to="#" >(<span>4</span>) CLINICAL</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                        <SearchProductsResult searchResult={[
                            
                        ]}/>

                    </div>
        </div>
    )
}

export default SearchResult