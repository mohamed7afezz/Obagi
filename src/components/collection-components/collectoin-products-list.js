import React, { useEffect } from "react"
import { graphql } from "gatsby"
import ProductCard from "../../components/productcard"
import productsliststyle from "../../assets/scss/components/collection-list.module.scss"
import {CustomSelect} from '../../assets/js/custom-select'
import { Scrollbars } from "react-custom-scrollbars"
const Collectionproducts = ({ node, nodetype,checktaxonomyType }) => {

  let products = []
  let checkTaxonomy
  let pageNodeType = nodetype ? nodetype : ""
 
  if (pageNodeType == "clinicalConcern") {
   
    checkTaxonomy =
      node.data.taxonomyTermClinicalSkinConcern.relationships
        .node__clinical_product
  } else if (pageNodeType == "clinicalCategories") {
    checkTaxonomy =
      node.data.taxonomyTermClinicalCategories.relationships
        .node__clinical_product
  } else if (pageNodeType == "medicalConcern") {
    
    checkTaxonomy =
      node.data.taxonomyTermMedicalSkinConcern.relationships
        .node__medical_product
  } else if (pageNodeType == "medicalCategories") {
    checkTaxonomy =
      node.data.taxonomyTermMedicalCategories.relationships
        .node__medical_product
  }else if (pageNodeType == "clinicalGroups"){
    checkTaxonomy =
   node.data.taxonomyTermClinicalGroups.relationships
      .node__clinical_product 
  }else if(pageNodeType == 'medicalLine'){
    checkTaxonomy =
    node.data.taxonomyTermMedicalProductLines.relationships
      .node__medical_product     
  }else if(pageNodeType == 'skinClinicalType'){
    checkTaxonomy =
    node.data.taxonomyTermClinicalSkinType.relationships
      .node__clinical_product     
  }else if(pageNodeType == 'skinMedicalType'){
    checkTaxonomy =
    node.data.taxonomyTermMedicalSkinType.relationships
      .node__medical_product    
  } else if(pageNodeType == 'MedicalIngredients'){
    checkTaxonomy =
    node.data.taxonomyTermMedicalIngredients.relationships
      .node__medical_product    
  }else if (pageNodeType == "ClinicalIngredients"){
    checkTaxonomy =
   node.data.taxonomyTermClinicalIngredients.relationships
      .node__clinical_product 
  } else {
    checkTaxonomy = node
  }
  function checkProductExisitance(product) {
   
    return products.some(item => product.path.alias == item.path.alias)
  }
  function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    })

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}
  function saveselect(e){
    if (e.target.childNodes[0] != undefined) {
      let i = e.target.childNodes[0].value;
      document.querySelector('.skinsearch').innerHTML=i;
    }
  }
  function saveselectfilter(e){
    if (e.target.childNodes[0] != undefined) {
      let i = e.target.childNodes[0].value;
      document.querySelector('.filtersearch').innerHTML=i;
    }
  }
  function saveselectIngredients(e){
    if (e.target.childNodes[0] != undefined) {
      let i = e.target.childNodes[0].value;
      document.querySelector('.ingsearch').innerHTML=i;
    }
  }
  function sortselect(e){
    if (e.target.childNodes[0] != undefined) {
      let i = e.target.childNodes[0].value;
      document.querySelector('.sortsearch').innerHTML=i;
    }
  }
  function getIngredient (item) {
    let getdata="";
    if (item.relationships.field_clinical_ingredients  ) {
      if (!getdata.includes(item.relationships.field_clinical_ingredients.map(getname => getname.name).toString())) {
        getdata= getdata +  item.relationships.field_clinical_ingredients.map(getname => getname.name).toString();
        return getdata
      }

    } 
    if (item.relationships.field_medical_ingredients) {
      if (!getdata.includes(item.relationships.field_medical_ingredients.map(getname => getname.name).toString())) {
      getdata= getdata + " "+ item.relationships.field_medical_ingredients.map(getname => getname.name).toString();
      return getdata
      }
    }
   

  }
  function filtersearchData(){
    if(  document.querySelector('#flitersCon').classList.contains('hide')){
      document.querySelector('#flitersCon').classList.remove('hide')
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      document.querySelector('#flitersCon').classList.add('hide')
      document.querySelector('.filterlabel').classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }
  function sortSearchData(){
    if(  document.querySelector('#sortCon').classList.contains('hide')){
      document.querySelector('#sortCon').classList.remove('hide');
      document.querySelector('.sortlabel').classList.remove('hide');
      document.querySelector('.sortprodline').classList.remove('transparent-bg');

    }else{
      document.querySelector('#sortCon').classList.add('hide')
      document.querySelector('.sortlabel').classList.add('hide');
      document.querySelector('.sortprodline').classList.add('transparent-bg');

    }
    
  }  
  function filterIngredientsData(){
    if(  document.querySelector('#filterIngredients').classList.contains('hide')){
    document.querySelector('#filterIngredients').classList.remove('hide')
    document.querySelector('.ingredientlabel').classList.remove('hide')
    document.querySelector('.filterIngredients ').classList.remove('transparent-bg')

  }else{
    document.querySelector('#filterIngredients').classList.add('hide')
    document.querySelector('.ingredientlabel').classList.add('hide')
    document.querySelector('.filterIngredients ').classList.add('transparent-bg')

  }
  }
  function filterSkinconcernsearchData(){
  if(  document.querySelector('#filterSkinconcern').classList.contains('hide')){
    document.querySelector('#filterSkinconcern').classList.remove('hide')
    document.querySelector('.skinlabel').classList.remove('hide')
    document.querySelector('.filterSkinconcern').classList.remove('transparent-bg')

  }else{
    document.querySelector('#filterSkinconcern').classList.add('hide')
    document.querySelector('.skinlabel').classList.add('hide')
    document.querySelector('.filterSkinconcern').classList.add('transparent-bg')

  }

  }
  useEffect(() => {
    if(document.querySelectorAll('.custom-select .select-selected').length < 1) {
      CustomSelect();
    }
    
    // const isotope = require("isotope-layout")
    // const filterValSelect = document.querySelector("#product-filter")
    // const sortPriceSelect = document.querySelector(".sort-price")
    // let sortAsc =
    //   sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
    //     ? true
    //     : false

    // const isoGrid = new isotope(".products-list", {
    //   itemSelector: ".product-element",
    //   layoutMode: "masonry",
    //   getSortData: {
    //     price: item => {
    //       var weight = item.querySelector(".prod-price").textContent
    //       return parseFloat(weight)
    //     },
    //   },
    //   // filter: item => {
    //   //   const filterVal =
    //   //     filterValSelect.options[filterValSelect.selectedIndex].value
    //   //   if (filterVal === "All" || filterVal == undefined) {
    //   //     return true
    //   //   }
    //   //   return item
    //   //     .getElementsByClassName("ingredient")[0]
    //   //     .innerText.includes(filterVal)
    //   // },
    //   transitionDuration: 0,
    //   sortBy: "price",
    //   sortAscending: sortAsc,
    // })

    //update view on sort on page load
    // updateSortView()

    //filter
    // filterValSelect.addEventListener("change", function (event) {
    //   sortAsc =
    //     sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
    //       ? true
    //       : false
    //   isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
    //   updateSortView()
    // })
    // //sort
    // sortPriceSelect.addEventListener("change", function (event) {
    //   sortAsc =
    //     sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
    //       ? true
    //       : false
    //   isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
    //   updateSortView()
    // })

    // function updateSortView() {
    //   document.querySelector(".products-list").innerHTML = null
    //   isoGrid.getFilteredItemElements().map(item => {
    //     document.querySelector(".products-list").appendChild(item)
    //   })
    // }
  })

  return (
    <div
    className={checktaxonomyType === "clinical"? 
      "container-fluid collectionhero collectionList " + productsliststyle.collectionList
      :"container-fluid collectionhero collectionList  "+productsliststyle.listMedicalBg + " " + productsliststyle.listMedicalBg}
    >
      <div
        className={[
          "row",
          productsliststyle.Collectionfiltercontainer,
          "pb-20",
        ].join(" ")}
      >
        <div
          className={[
            "col-12",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
          ].join(" ")}
        >
          <label className={[productsliststyle.filter,"hide","filterlabel"].join(" ")}>Filter by:</label>
        <div class="appointment-elemnt advanced-search filterprodline transparent-bg">
            <p class="input-name filtersearch" onClick={() => { filtersearchData(); }}>Filter by:</p>
           <div id="prodLinesSelected">
        
              <div class="product-lines hide" id="flitersCon">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter"> 
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="All"/>All
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Aloe"/>Aloe
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Antioxidants"/>Antioxidants
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Arbutin" />Arbutin
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Benzoyl Peroxide" />Benzoyl Peroxide
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Caffeine"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Glycerin"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Glycolic Acid (AHA)"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Hyaluronic Acid"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Retinol"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                         
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectfilter(e)}}>
                              <input class="popupVideoInput" name="product" type="radio" value="Witch Hazel" />Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          

                          </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
            
         
        </div>
        <div
          className={[
            "col-12",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
          ].join(" ")}
        >
      
            
      <label className={[productsliststyle.filter,"hide","skinlabel"].join(" ")}>Skin concern:</label>

          <div class="appointment-elemnt advanced-search filterSkinconcern transparent-bg">
            <p class="input-name skinsearch" onClick={() => { filterSkinconcernsearchData(); }}>Skin concern:</p>
           <div id="prodLinesSelected">
        
              <div class="product-lines hide" id="filterSkinconcern">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter"> 
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="All"/>All
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Aloe"/>Aloe
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Antioxidants"/>Antioxidants
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Arbutin" />Arbutin
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Benzoyl Peroxide" />Benzoyl Peroxide
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Caffeine"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Glycerin"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Glycolic Acid (AHA)"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Hyaluronic Acid"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Retinol"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Salicylic Acid"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Tretinoin"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Vitamin C"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Witch Hazel" />Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselect(e)}}>
                              <input class="popupVideoInput" name="Skin-concern" type="radio" value="Zinc Oxide*"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>

                          </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
            
              
      
         
        </div>
        <div
          className={[
            "col-12",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
          ].join(" ")}
        >
      
            
      <label className={[productsliststyle.filter,"hide","ingredientlabel"].join(" ")}>Ingredients:</label>

          <div class="appointment-elemnt advanced-search filterIngredients transparent-bg">
            <p class="input-name ingsearch" onClick={() => { filterIngredientsData(); }}>Ingredients:</p>
           <div id="prodLinesSelected">
        
              <div class="product-lines hide" id="filterIngredients">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter"> 
                            <li>
                              <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="All"/>All
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Aloe"/>Aloe
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Antioxidants"/>Antioxidants
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Arbutin" />Arbutin
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Benzoyl Peroxide" />Benzoyl Peroxide
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Caffeine"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Glycerin"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Glycolic Acid (AHA)"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Vitamin C"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Witch Hazel" />Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                            <label class="checkcon terms" onClick={(e) => { saveselectIngredients(e)}}>
                              <input class="popupVideoInput" name="Ingredients" type="radio" value="Zinc Oxide*"/>Loram
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>

                          </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
            
              
      
         
        </div>
        <div
          className={[
            "col-12",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
          ].join(" ")}
        >
          <label class="terms Prescription">Prescription Not Required<input type="checkbox" name="footer-checkbox" /><span class="checkmark"></span></label>
          </div>
        <div
          className={[
            "col-12",
            "offset-lg-2",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
          ].join(" ")}
        >
                <label className={[productsliststyle.filter,"hide","sortlabel"].join(" ")}>Sort by:</label>

      <div class="appointment-elemnt advanced-search sortprodline transparent-bg">
            <p class="input-name sortsearch" onClick={() => { sortSearchData(); }}>Sort by:</p>
           <div id="prodLinesSelected">
        
              <div class="product-lines hide" id="sortCon">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter"> 
                            <li>
                              <label class="checkcon terms" onClick={(e) => { sortselect(e)}}>
                              <input class="popupVideoInput" name="sort" type="radio" value="Newest"/>Newest

                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { sortselect(e)}}>
                              <input class="popupVideoInput" name="sort" type="radio" value="Price: Low - High"/>Price: Low - High

                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms" onClick={(e) => { sortselect(e)}}>
                              <input class="popupVideoInput" name="sort" type="radio" value="Price: High - Low"/>Price: High - Low
                              <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                     
                          </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>   </div>
      </div>
      <div
        className={[
          "row products-list",
          productsliststyle.CollectionListcontainer,
        ].join(" ")}
      >
        {checkTaxonomy &&
        (pageNodeType.toLowerCase().includes('clinical') || 
          pageNodeType.toLowerCase().includes('medical')
          )
          ? checkTaxonomy.map((item, index) => {
              let ingredient = getIngredient(item);
              

              return (
                <>
                  {item.field_medical_is_system ? (
                    <div
                      className={[
                        "col-12 col-lg-6 col-md-6 product-element",
                        `vitamin-c-${index}`,
                        productsliststyle.productview,
                        "productview",
                      ].join(" ")}
                      data-ingrediant={`vitamin-c-${index}`}
                    >
                      {pageNodeType == "clinicalConcern" ? (
                        <ProductCard
                        productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description?item.field_clinical_description.processed:"",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)
                            ? item.relationships.field_clinical_image[0]
                                .localFile.childImageSharp?item.relationships.field_clinical_image[0]
                                .localFile.childImageSharp.fluid
                            : "":""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />
                        
                      ) : pageNodeType == "clinicalCategories" ? (
                        <ProductCard
                        productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description?item.field_clinical_description.processed:"",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)
                              ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp?item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid
                              : "":""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />
                      ) : (
                        <ProductCard
                        productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_medical_description?item.field_medical_description.processed:""
                          }}
                          productimage={
                            item.relationships.field_medical_image[0]
                              ? (item.relationships.field_medical_image[0]
                                  .localFile? item.relationships.field_medical_image[0]
                                  .localFile.childImageSharp.fluid : '')
                              : ""
                          }
                          isrx={item.relationships.field_medical_rx?item.relationships.field_medical_rx.name :""}
                          price={item.field_medical_price}
                          rate="0"
                          productId={item.field_medical_id}
                        />
                      )}
                      <div
                        class="d-none ingredient"
                        dangerouslySetInnerHTML={{ __html: ingredient }}
                      ></div>
                    </div>
                  ) : (
                    <div
                      className={[
                        "col-12 col-lg-3 col-md-4 product-element",
                        `vitamin-c-${index}`,
                        productsliststyle.productview,
                        "productview",
                      ].join(" ")}
                      data-ingrediant={`vitamin-c-${index}`}
                    >
                      {pageNodeType == "clinicalConcern" ? (
                        <ProductCard
                          productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description?item.field_clinical_description.processed:"",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)
                              ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp?item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid
                              : "":""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />
                      ) : pageNodeType == "ClinicalIngredients" ? ( <ProductCard
                        productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description?item.field_clinical_description.processed:"",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)
                              ? (item.relationships.field_clinical_image[0]
                                  .localFile? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid : '')
                              : ""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />): pageNodeType == "clinicalGroups" ? ( <ProductCard
                        productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description?item.field_clinical_description.processed:"",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)
                              ? (item.relationships.field_clinical_image[0]
                                  .localFile? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid : '')
                              : ""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />) : pageNodeType == "clinicalCategories" ? (
                        <ProductCard
                          productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description?item.field_clinical_description.processed:"",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)
                            ? item.relationships.field_clinical_image[0]
                                .localFile.childImageSharp?item.relationships.field_clinical_image[0]
                                .localFile.childImageSharp.fluid
                            : "":""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />
                      )  :  pageNodeType == "skinClinicalType" ? (
                        <ProductCard
                          productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description?item.field_clinical_description.processed:"",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)
                            ? item.relationships.field_clinical_image[0]
                                .localFile.childImageSharp?item.relationships.field_clinical_image[0]
                                .localFile.childImageSharp.fluid
                            : "":""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />
                       
                      ): (
                        <ProductCard
                          productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            
                            __html: item.field_medical_description?item.field_medical_description.processed:""
                          }}
                          productimage={
                            item.relationships.field_medical_image[0]
                              ? (item.relationships.field_medical_image[0].localFile? item.relationships.field_medical_image[0].localFile.childImageSharp.fluid : '')
                              : ""
                          }
                          isrx={item.relationships.field_medical_rx?item.relationships.field_medical_rx.name :""}
                          price={item.field_medical_price}
                          rate="0"
                          productId={item.field_medical_id}
                        />
                      )}
                      <div
                        class="d-none ingredient"
                        dangerouslySetInnerHTML={{ __html: ingredient }}
                      ></div>
                    </div>
                  )}
                </>
              )
            })
          : checkTaxonomy
          ? checkTaxonomy.relationships.field_vocabularies.map(item =>
              item.relationships.node__clinical_product
                ? item.relationships.node__clinical_product.map(
                    (product, index) => {
                      
                      let ingredient = getIngredient(product);
                      
                      
                      if (!checkProductExisitance(product)) {
                        products.push(product)
                        return (
                          <div
                            className={[
                              "col-12 col-lg-3 col-md-4 product-element",
                              `vitamin-c-${index}`,
                              productsliststyle.productview,
                              "productview",
                            ].join(" ")}
                            data-ingrediant={`vitamin-c-${index}`}
                          >
                            <ProductCard
                              productLink={product.path.alias}
                              producttitle={product.title}
                              productdescription={{
                                __html:
                                product.field_clinical_description?product.field_clinical_description.processed:"",
                              }}
                              productimage={
                                (product.relationships.field_clinical_image[0] && product.relationships.field_clinical_image[0].localFile)
                                  ? product.relationships.field_clinical_image[0].localFile.childImageSharp.fluid
                                  : ""
                              }
                              price={product.field_clinical_price}
                              rate="0"
                              productId={product.field_clinical_id}
                            />
                            <div
                              class="d-none ingredient"
                              dangerouslySetInnerHTML={{ __html: ingredient }}
                            ></div>
                          </div>
                        )
                      }
                      return;
                    }
                  )
                : item.relationships.node__medical_product
                ? item.relationships.node__medical_product.map(
                    (product, index) => {
                      if (!checkProductExisitance(product)) {
                        products.push(product)
                        let ingredient = getIngredient(product);
                      // Back Here Agian same As 168
                      return (
                        <div
                          className={[
                            "col-12 col-lg-3 col-md-4 product-element",
                            `vitamin-c-${index}`,
                            productsliststyle.productview,
                            "productview",
                          ].join(" ")}
                          data-ingrediant={`vitamin-c-${index}`}
                        >
                          <ProductCard
                            productLink={product.path.alias}
                            producttitle={product.title}
                            productdescription={{
                              __html:
                              product.field_medical_description? product.field_medical_description.processed: '',
                            }}
                            productimage={
                              product.relationships.field_medical_image[0]
                                ? product.relationships.field_medical_image[
                                    0
                                  ].localFile.childImageSharp.fluid
                                : ""
                            }
                            isrx={product.relationships.field_medical_rx?product.relationships.field_medical_rx.name :""}
                            price={product.field_medical_price}
                            rate="0"
                            productId={product.field_medical_id}
                          />
                           <div
                        class="d-none ingredient"
                        dangerouslySetInnerHTML={{ __html: ingredient }}
                      ></div>
                        </div>
                        
                      )
                    }
                  }
                  )
                : ""
            )
          : ""}
      </div>
    </div>
  )
}

export default Collectionproducts
export const fragment = graphql`
  fragment collectionproducts on taxonomy_term__clinical_skin_concern {
    relationships {
      node__clinical_product {
        
        field_clinical_id
        field_clinical_description {
          processed
        }
        path {
          alias
        }
        field_clinical_price
        title
        relationships {
          
          field_clinical_components {
            ... on paragraph__ingredient {
              relationships {
                field_read_more {
                  field_read_more_content {
                    processed
                  }
                }
              }
            }
          }

          field_clinical_image {
            localFile {
              childImageSharp {
                fluid (quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
  fragment vocabulariesList on paragraph__vocabularies {
    id
    relationships {
      field_vocabularies {
        ... on taxonomy_term__clinical_categories {
          id
          path {
            alias
          }
          relationships {
            node__clinical_product {
              field_clinical_id
              title
              field_clinical_description {
                processed
              }
              path {
                alias
              }
              field_clinical_price
              relationships {
                field_clinical_ingredients {
                  name
                }
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              relationships {
                field_clinical_components {
                  ... on paragraph__ingredient {
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
      
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        },
        ... on taxonomy_term__clinical_ingredients {
          id
          path {
            alias
          }
          relationships {
            node__clinical_product {
              field_clinical_id
              title
              field_clinical_description {
                processed
              }
              path {
                alias
              }
              field_clinical_price
              relationships {
                field_clinical_ingredients {
                  name
                }
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              relationships {
                field_clinical_components {
                  ... on paragraph__ingredient {
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
      
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }, 
        ... on taxonomy_term__medical_product_lines {
          id
          name
          relationships {
            node__medical_product {
              field_medical_id
              field_medical_description {
                processed
              }
              title
              path {
                alias
              }
              field_medical_price
              relationships {
                field_medical_ingredients {
                  name
                }
                field_medical_rx {
                  name
                }
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                field_medical_components {
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        ... on taxonomy_term__medical_ingredients {
          id
          name
          relationships {
            node__medical_product {
              field_medical_id
              field_medical_description {
                processed
              }
              title
              path {
                alias
              }
              field_medical_price
              relationships {
                field_medical_ingredients {
                  name
                }
                field_medical_rx {
                  name
                }
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                field_medical_components {
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        ... on taxonomy_term__medical_categories {
          id
          name
          path {
            alias
          }
          relationships {
            node__medical_product {
              field_medical_id
              field_medical_description {
                processed
              }
              field_medical_price
              title
              path {
                alias
              }
              relationships {
                field_medical_ingredients {
                  name
                }
                field_medical_rx {
                  name
                }
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                field_medical_components {
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ... on taxonomy_term__medical_product_lines {
          id
          name
          path {
            alias
          }
          relationships {
            node__medical_product {
              path {
                alias
              }
              title
              field_medical_id
              field_medical_description {
                processed
              }
              field_medical_price
              relationships {
                field_medical_rx {
                  name
                }
                field_medical_ingredients {
                  name
                }
                field_medical_components {
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
               
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ... on taxonomy_term__medical_skin_concern {
          id
          name
          relationships {
            node__medical_product {
              title
              path {
                alias
              }
              field_medical_id
              field_medical_description {
                processed
              }
              field_medical_price
              relationships {
                field_medical_ingredients {
                  name
                }
                field_medical_components {
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
                field_medical_rx {
                  name
                }
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
          path {
            alias
          }
        }
        ... on taxonomy_term__clinical_skin_concern {
          id
          name
          relationships {
            node__clinical_product {
              field_clinical_id
              field_clinical_price
              title
              field_clinical_description {
                processed
              }
              path {
                alias
              }
              relationships {
                field_clinical_ingredients {
                  name
                }
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              relationships {
                field_clinical_components {
                  ... on paragraph__ingredient {
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
      
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
          path {
            alias
          }
        }
      }
    }
  }
`
