import React, { useContext, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductCard from "../components/productcard"
import productsliststyle from "../assets/scss/components/collection-list.module.scss"
import {CustomSelect} from '../assets/js/custom-select'
import searchResultStyle from '../assets/scss/components/search-results.module.scss'
import SearchContext from "../providers/search-provider"
import $ from "jquery"

const NewSearchProductsResult = ({ node }) => {


  const {clinicalSearchResults} = useContext(SearchContext);
  const {medicalSearchResults} = useContext(SearchContext);
  let products = []
  let isDefultSelectCategoryMedical = medicalSearchResults.length > clinicalSearchResults.length;
  
  function clinicalbg (){
    document.querySelector('.collectionList').classList.remove('medicalbg')
    document.getElementById("clinicalRadio").checked = true;
  }
  function medicalbg (){
    document.querySelector('.collectionList').classList.add('medicalbg')
    document.getElementById("medicalRadio").checked = true;
  }
  function checkProductExisitance(product) {
    return products.some(item => product.path.alias == item.path.alias)
  }

  useEffect(() => {
    
    isDefultSelectCategoryMedical = medicalSearchResults.length > clinicalSearchResults.length;
    if(document.querySelectorAll('.custom-select .select-selected').length < 1) {
      CustomSelect();
    }

    const isotope = require("isotope-layout")
    const sortPriceSelect = document.querySelector(".sort-price")
    let sortAsc = sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low" ? true : false

    const isoGrid = new isotope(".products-list", {
       itemSelector: ".product-element",
       layoutMode: "masonry",
       getSortData: {
         price: item => {
           var weight = item.querySelector(".prod-price").textContent
           return parseFloat(weight)
         },
       },
//       // filter: item => {
  
       
//       //         return    item.getElementsByClassName("ingredient")[0]
//       //         .innerText.includes();
             
              
        
        
//       // },
       transitionDuration: 0,
       sortBy: "price",
       sortAscending: sortAsc,
     })

//     //update view on sort on page load
//     updateSortView()

//     //filter
//     // filterValSelect.addEventListener("change", function (event) {
//     //   sortAsc =
//     //     sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
//     //       ? true
//     //       : false
//     //   isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
//     //   updateSortView()
sortPriceSelect.addEventListener("change", function (event) {
  sortAsc =
    sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
      ? true
       : false
   isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
   updateSortView()
 })
 function updateSortView() {
  document.querySelector(".products-list").innerHTML = null
  isoGrid.getFilteredItemElements().map(item => {
    document.querySelector(".products-list").appendChild(item)
  })
}
})
//     //sort
  
//     function updateSortView() {
//       document.querySelector(".products-list").innerHTML = null
//       isoGrid.getFilteredItemElements().map(item => {
//         document.querySelector(".products-list").appendChild(item)
//       })
//     }
//   })
 
  return (
    <div
      className={medicalSearchResults? (clinicalSearchResults? ( medicalSearchResults.length > clinicalSearchResults.length? "container-fluid collectionhero collectionList mt-48 medicalbg " + productsliststyle.collectionList :  "container-fluid collectionhero collectionList mt-48 " + productsliststyle.collectionList) : "container-fluid collectionhero collectionList mt-48 medicalbg " + productsliststyle.collectionList) : "container-fluid collectionhero collectionList mt-48 " + productsliststyle.collectionList}>
      <div
        className={[
          "row",
          "align-items-center",
          productsliststyle.Collectionfiltercontainer,
          "pb-40",
        ].join(" ")}
      >
        {/* <div
          className={[
            "col-12",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
          ].join(" ")}
        >
          <label className={productsliststyle.filter}>Filter by:</label>
          <div className="custom-select">
            <select id="product-filter" name="filter by">
              <option vlaue="All">All</option>
              <option vlaue="All">All</option>
              <option value="Hyaluronic Acid">Hyaluronic Acid</option>
              <option value="Retinol">Retinol</option>
              <option value="Glycolic Acid (AHA)">Glycolic Acid (AHA)</option>
              <option value="Arbutin">Arbutin</option>
              <option value="Vitamin C">Vitamin C</option>
              <option value="Salicylic Acid">Salicylic Acid</option>
              <option value="Hydroquinone*">Hydroquinone*</option>
              <option value="Cleanser">Cleanser</option>
              <option value="Toner">Toner</option>
              <option value="Serum">Serum</option>
              <option value="Lotion/Cream">Lotion/Cream</option>
              <option value="Mask">Mask</option>
              <option value="Peptides">Peptides</option>
            </select>
          </div>
        </div>*/}
             <div className="col-12 col-lg-4">

        <div className="producTypeSelect d-flex">
            <label className={searchResultStyle.title}>Products:</label>
      <label className="radioLabel" onClick={() => {medicalbg();}}><input id="medicalRadio" name="radiono" checked={isDefultSelectCategoryMedical} value="medical"  type="radio" /><span class="radiomark"></span>Medical ({medicalSearchResults.length})</label>
            <label className="radioLabel" onClick={() => {clinicalbg(); }}><input id="clinicalRadio" name="radiono" checked={!isDefultSelectCategoryMedical} value="Clinical"  type="radio" /> <span class="radiomark"></span>Clinical ({clinicalSearchResults.length})</label>
        </div>
        </div>
        <div 
          className={[
            "col-12",
            "offset-lg-5",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
            "removeSelectBorder"
          ].join(" ")}
        >
          <label className={[productsliststyle.filter,"SelectChanges"].join(" ")}>Sort by:</label>
          <div className="custom-select">
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
      <div
        className={[
          "row products-list",
          productsliststyle.CollectionListcontainer,
        ].join(" ")}
      >
           
                  {
                medicalSearchResults.length > 0?
                medicalSearchResults.map( (data , index)=>(
                  <div
                  className={[
                    "col-12 col-lg-3 col-md-4 product-element medicalProduct",
                    `vitamin-c-${index}`,
                    productsliststyle.productview,
                    "productview",
                  ].join(" ")}
                  data-ingrediant={`vitamin-c-${index}`}
                >         
                      
                       <ProductCard
                        productLink={data.path.alias}
                      producttitle={data.title}
                      productdescription={{__html:data.field_medical_description.processed}}
                      productimage={ data.relationships.field_medical_image &&  data.relationships.field_medical_image[0].localFile? data.relationships.field_medical_image[0].localFile.childImageSharp.fluid : ""}
                      price={data.field_medical_price}
                      productId={data.field_medical_id}
                    />
                  </div> 
                      )) : <div className="col-12 text-center medicalProduct">No results found.</div> }
                  {
                     clinicalSearchResults.length > 0?
                     clinicalSearchResults.map( (data , index)=>(
                      
                      <div
                  className={[
                    "col-12 col-lg-3 col-md-4 product-element clinicalProduct",
                    `vitamin-c-${index}`,
                    productsliststyle.productview,
                    "productview",
                  ].join(" ")}
                  data-ingrediant={`vitamin-c-${index}`}
                >     
                       <ProductCard
                         productLink={data.path.alias}
                        producttitle={data.title}
                        productdescription={{__html:data.field_clinical_description.processed}}
                        productimage={data.relationships.field_clinical_image && data.relationships.field_clinical_image[0].localFile?data.relationships.field_clinical_image[0].localFile.childImageSharp.fluid:''}
                        price={data.field_clinical_price}
                        productId={data.field_clinical_id}
                      />
                           </div> 
                     )) : <div className="col-12 text-center clinicalProduct">No results found.</div> }
            </div>
    </div>
  )
}

export default NewSearchProductsResult