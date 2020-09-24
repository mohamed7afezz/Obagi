import React, {  useContext} from "react"

import searchResultStyle from '../assets/scss/components/search-results.module.scss'

import NewSearchProductsResult from "./new-search"
import SearchContext from "../providers/search-provider"
const SearchResult = () => {
    let searchResult  = [
        { field_clinical_id: "345", field_clinical_price: "55.00", title: "Kinetin+ Hydrating Cream ", path: {alias:'/hafez'},field_clinical_description: {processed:'<p>hafez</p>'},relationships:{field_clinical_image:''}},
        { field_clinical_id: "344", field_clinical_price: "55.00", title: "Retinol 0.5 Retexturizing Cream ", path: {alias:'/hafez'},field_clinical_description: {processed:'<p>hafez</p>'},relationships:{field_clinical_image:''} }
    ]
    let nodetype = "clinicalCategories";

    const {searchWord}= useContext(SearchContext)
    
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                            <div className={searchResultStyle.yourRes}>You searched for</div>
                        <div className={searchResultStyle.results}><span className={searchResultStyle.selected}>{searchWord.length > 0 ?`"${searchWord}"`: " "}</span></div>
                        {/* <div className={searchResultStyle.footnote}>We couldn’t find results for</div> */}
                    </div>
                </div>
            
            </div>
            <div>
                <NewSearchProductsResult searchResult={searchResult} nodetype={nodetype}/>
            </div>
        </div>
    )
}

export default SearchResult