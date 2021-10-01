import React, {  useContext} from "react"
import * as searchResultStyle from '../assets/scss/components/search-results.module.scss'
import NewSearchProductsResult from "./new-search"
import SearchContext from "../providers/search-provider"
const SearchResult = () => {

    let nodetype = "clinicalCategories";
    const {searchWord}= useContext(SearchContext)
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {searchWord.length > 0 ?
                        <>
                        <div className={searchResultStyle.yourRes}>You searched for</div>
                        <div className={searchResultStyle.results}><span className={searchResultStyle.selected}>{searchWord.length > 0 ?`"${searchWord}"`: " "}</span></div>
                        </>
                        :
                        <div className={searchResultStyle.results}>Please enter some keywords.</div>
                        }
                    </div>
                </div>
            
            </div>
            <div>
                <NewSearchProductsResult/>
            </div>
        </div>
    )
}

export default SearchResult