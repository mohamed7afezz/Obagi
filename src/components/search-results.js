import React, { useEffect } from "react"
import { Link, graphql, useStaticQuery } from 'gatsby'
import searchResultStyle from '../assets/scss/components/search-results.module.scss'
import { CustomSelect } from '../assets/js/custom-select'

const SearchResult = () => {

    // useEffect(() => {
    //     if(document.querySelectorAll('.custom-select .select-selected').length < 1) {
    //       CustomSelect();
    //     }
    //     const isotope = require("isotope-layout")
    //     const filterValSelect = document.querySelector("#product-filter")
    //     const sortPriceSelect = document.querySelector(".sort-price")
    //     let sortAsc =
    //       sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
    //         ? true
    //         : false

    //     const isoGrid = new isotope(".products-list", {
    //       itemSelector: ".product-element",
    //       layoutMode: "masonry",
    //       getSortData: {
    //         price: item => {
    //           var weight = item.querySelector(".prod-price").textContent
    //           return parseFloat(weight)
    //         },
    //       },
    //       filter: item => {
    //         const filterVal =
    //           filterValSelect.options[filterValSelect.selectedIndex].value
    //         if (filterVal === "All" || filterVal == undefined) {
    //           return true
    //         }
    //         return item
    //           .getElementsByClassName("ingredient")[0]
    //           .innerText.includes(filterVal)
    //       },
    //       transitionDuration: 0,
    //       sortBy: "price",
    //       sortAscending: sortAsc,
    //     })

    //     //update view on sort on page load
    //     updateSortView()

    //     //filter
    //     filterValSelect.addEventListener("change", function (event) {
    //       sortAsc =
    //         sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
    //           ? true
    //           : false
    //       isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
    //       updateSortView()
    //     })
    //     //sort
    //     sortPriceSelect.addEventListener("change", function (event) {
    //       sortAsc =
    //         sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
    //           ? true
    //           : false
    //       isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
    //       updateSortView()
    //     })

    //     function updateSortView() {
    //       document.querySelector(".products-list").innerHTML = null
    //       isoGrid.getFilteredItemElements().map(item => {
    //         document.querySelector(".products-list").appendChild(item)
    //       })
    //     }
    //   })

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
                    <div className="col-12 col-lg-3 offset-lg-6">
                    <div
                                className={[
                                    searchResultStyle.Collectionfilter,
                                    "Collectionfilter",
                                ].join(" ")}
                            >
                                <label className={searchResultStyle.filter}>Sort by:</label>
                                <div className={["custom-select", searchResultStyle.custom].join(" ")}>
                                    <select class="filters-select sort-price" name="sort by">
                                        <option value="low" >
                                            Price :Low - High
            </option>
                                        <option value="low" >
                                            Price :Low - High
            </option>
                                        <option value="high">Price :High - Low</option>
                                    </select>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult