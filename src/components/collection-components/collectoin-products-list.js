import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductCard from "../../components/productcard"
import productsliststyle from "../../assets/scss/components/collection-list.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
import { Scrollbars } from "react-custom-scrollbars"
import { checkDataCondition } from "../paragraphs-helper"
import { checkStock } from '../../assets/js/stock';
import $ from 'jquery'
import needtoknow from '../../assets/scss/components/needtoknow.module.scss'
import lightblub from '../../assets/images/product-images/light-bulb-icon.svg'
import blueblub from '../../assets/images/product-images/bluelamb.svg'
import ContentTile from "../content-tile"
const baseUrl = process.env.Base_URL;

const Collectionproducts = ({ node, nodetype, checktaxonomyType }) => {
  useEffect(() => {
    if (typeof window != undefined) {
      checkStock(baseUrl);
    }
  }, [])
  const dataType = checktaxonomyType ? checktaxonomyType : (node.relationships.field_vocabularies[0].path ? (node.relationships.field_vocabularies[0].path.alias.includes('medical') ? 'medical' : 'clinical') : '');
  const filtersDataQuery = useStaticQuery(graphql`
    {
      clinicalType: allTaxonomyTermClinicalSkinType {
        edges {
          node {
            name
          }
        }
      }
      clinicalSkin: allTaxonomyTermClinicalSkinConcern {
        edges {
          node {
            name
          }
        }
      }
      clinicalIngredients: allTaxonomyTermClinicalIngredients {
        edges {
          node {
            name
          }
        }
      }

      medicalType: allTaxonomyTermMedicalSkinType {
        edges {
          node {
            name
          }
        }
      }
      medicalSkin: allTaxonomyTermMedicalSkinConcern {
        edges {
          node {
            name
          }
        }
      }
      medicalIngredients: allTaxonomyTermMedicalIngredients {
        edges {
          node {
            name
          }
        }
      }
    }
  `);


  let isoGrid;

  useEffect(() => {
    if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
      CustomSelect();
    }


    getDefault(document.querySelectorAll('.popupVideoInput[name="product"]'), document.querySelector('.filtersearch'));
    getDefault(document.querySelectorAll('.popupVideoInput[name="Skin-concern"]'), document.querySelector('.skinsearch'));
    getDefault(document.querySelectorAll('.popupVideoInput[name="Ingredients"]'), document.querySelector('.ingsearch'));
    const isotope = require("isotope-layout");
    isoGrid = new isotope(".products-list", {
      itemSelector: ".product-element",
      layoutMode: "masonry",
      getSortData: {
        name: item => {
          if (item.classList.contains('content-tile')) {
            return null;
          }
          var name = item.querySelector(".productcarddesc").textContent;
          return name
        },
        price: item => {
          if (item.classList.contains('content-tile')) {
            return null;
          }
          var weight = item.querySelector(".prod-price").textContent;

          return parseFloat(weight)
        },
        bestseller: item => {
          if (item.classList.contains('content-tile')) {
            return null;
          }
          var isBestSeller = item.classList.contains('bestSeller');

          return isBestSeller ? '' : item.querySelector(".productcarddesc").textContent;


        },
      },
      filter: '*',
      transitionDuration: 0
    });

    //update view on sort on page load
    updateSortView()
    let contentTileCol = document.querySelector('#contentTile') ? document.querySelector('#contentTile') : ""

    if (contentTileCol) {
      let allCol = document.querySelectorAll('.products-list .product-element')
      let ind = 1;
      if (allCol[0] && allCol[1] && (allCol[0].classList.contains('col-lg-6') && allCol[1].classList.contains('col-lg-6'))) { ind = 2 }
      else if (allCol[1] && allCol[2] && (allCol[1].classList.contains('col-lg-6') && allCol[2].classList.contains('col-lg-6'))) { ind = 2 }
      else if (allCol[0] && allCol[1] && (allCol[0].classList.contains('col-lg-6') || allCol[1].classList.contains('col-lg-6'))) { ind = 3 }
      else if (allCol[0] && allCol[1] && allCol[2] && allCol[3] && (!allCol[0].classList.contains('col-lg-6') && !allCol[1].classList.contains('col-lg-6') && !allCol[2].classList.contains('col-lg-6') && !allCol[3].classList.contains('col-lg-6'))) { ind = 4 }
  
      isoGrid.element.insertBefore(contentTileCol, isoGrid.element.childNodes[ind])
      
    }
  });


  function updateSortView() {

    document.querySelector(".products-list").innerHTML = null
    isoGrid.getFilteredItemElements().map((item, index) => {
      document.querySelector(".products-list").appendChild(item)

    })
  }


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
  } else if (pageNodeType == "clinicalGroups") {
    checkTaxonomy =
      node.data.taxonomyTermClinicalGroups.relationships
        .node__clinical_product
  } else if (pageNodeType == 'medicalLine') {
    checkTaxonomy =
      node.data.taxonomyTermMedicalProductLines.relationships
        .node__medical_product
  } else if (pageNodeType == 'skinClinicalType') {
    checkTaxonomy =
      node.data.taxonomyTermClinicalSkinType.relationships
        .node__clinical_product
  } else if (pageNodeType == 'skinMedicalType') {
    checkTaxonomy =
      node.data.taxonomyTermMedicalSkinType.relationships
        .node__medical_product
  } else if (pageNodeType == 'MedicalIngredients') {
    checkTaxonomy =
      node.data.taxonomyTermMedicalIngredients.relationships
        .node__medical_product
  } else if (pageNodeType == "ClinicalIngredients") {
    checkTaxonomy =
      node.data.taxonomyTermClinicalIngredients.relationships
        .node__clinical_product
  } else {
    checkTaxonomy = node
  }



  let contentTile

  if (pageNodeType == "medicalConcern") {

    contentTile =
      node.data.taxonomyTermMedicalSkinConcern.relationships.field_skinconc_content_tile

  } else if (pageNodeType == "medicalCategories") {
    contentTile =
      node.data.taxonomyTermMedicalCategories.relationships.field_medcat_content_tile

  } else if (pageNodeType == 'medicalLine') {
    contentTile =
      node.data.taxonomyTermMedicalProductLines.relationships.field_prodline_content_tile

  } else if (pageNodeType == 'skinMedicalType') {
    contentTile =
      node.data.taxonomyTermMedicalSkinType.relationships.field_skintype_content_tile

  } else if (pageNodeType == 'MedicalIngredients') {
    contentTile =
      node.data.taxonomyTermMedicalIngredients.relationships.field_meding_content_tile

  } else {
    contentTile = ""
  }

  function checkProductExisitance(product) {

    return products.some(item => product.path.alias == item.path.alias)
  }
  function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
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

  // update HTML with selected filters value
  let isoFilterData = {
    type: '',
    concern: '',
    ing: '',
    rx: ''
  };
  function saveselect(e) {
    document.querySelector('.skinsearch').innerHTML = e.target.value;
    // close dropdown
    filterSkinconcernsearchData();
    // update filter view
    isoFilter('type', e.target.value);
  }
  function saveselectfilter(e) {
    document.querySelector('.filtersearch').innerHTML = e.target.value;
    // close dropdown
    filtersearchData();
    // update filter view
    isoFilter('concern', e.target.value);
  }
  function saveselectIngredients(e) {
    document.querySelector('.ingsearch').innerHTML = e.target.value;
    // close dropdown
    filterIngredientsData();
    // update filter view
    isoFilter('ing', e.target.value);

  }
  function sortselect(e) {
    document.querySelector('.sortsearch').innerHTML = e.target.value;
    // close dropdown
    sortSearchData();
    // update sort/filtered view
    switch (e.target.value) {
      case 'BestSeller':
        isoGrid.arrange({ sortBy: 'bestseller', sortAscending: true });
        updateSortView();
        break;
      case 'Alphabetically(A-Z)':
        isoGrid.arrange({ sortBy: 'name', sortAscending: true });
        updateSortView();
        break;
      case 'Alphabetically(Z-A)':
        isoGrid.arrange({ sortBy: 'name', sortAscending: false });
        updateSortView();
        break;
      case 'Price: High - Low':
        isoGrid.arrange({ sortBy: 'price', sortAscending: false });
        updateSortView();
        break;
      case 'Price: Low - High':
        isoGrid.arrange({ sortBy: 'price', sortAscending: true });

        updateSortView();
        break;
      default:
        break;
    }

  }
  useEffect(() => {

    isoGrid.arrange({ sortBy: 'name', sortAscending: true });
    updateSortView();
  }, [])
  function handlePrescribe(e) {
    if (e.target.checked) {
      isoFilter('rx', ':not(.RX)');
    } else {
      isoFilter('rx', 'All');
    }
  }
  function handleBestseller(e) {
    if (e.target.checked) {

      isoFilter('bestSeller', 'bestSeller');

    } else {

      isoFilter('bestSeller', 'All');
    }
  }
  function checkparray(item) {
    return item != "";
  }
  function isoFilter(type, val) {
    let item = val;
    if (item === ":not(.RX)") {
      item = val
    }
    else {
      item = val.replace('(', `\\(`)
      item = item.replace(')', '\\)');
      item = item.replace('+', '\\+')
    }


    isoFilterData[type] = item === 'All' ? '' : item.split(' ').join('_');
    let newFilter = '';
    for (const key in isoFilterData) {
      if (isoFilterData.hasOwnProperty(key) && key != 'rx') {
        newFilter += isoFilterData[key] !== '' ? '.' + isoFilterData[key] : '';
        isoGrid.arrange({ filter: newFilter });
      } else {
        newFilter += isoFilterData[key] !== '' ? isoFilterData[key] + '' : '';
        isoGrid.arrange({ filter: `${newFilter}:not(rx)` });
      }

    }



    updateSortView();
  }

  function getIngredient(item) {
    let getdata = "";
    if (item.relationships.field_clinical_ingredients) {
      if (!getdata.includes(item.relationships.field_clinical_ingredients.map(getname => getname.name).toString())) {
        getdata = getdata + item.relationships.field_clinical_ingredients.map(getname => getname.name).toString();
        return getdata
      }

    }
    if (item.relationships.field_medical_ingredients) {
      if (!getdata.includes(item.relationships.field_medical_ingredients.map(getname => getname.name).toString())) {
        getdata = getdata + " " + item.relationships.field_medical_ingredients.map(getname => getname.name).toString();
        return getdata
      }
    }


  }
  function filtersearchData() {
    let i = document.querySelectorAll('#flitersCon');

    for (let item of i) {
      if (
        item.classList.contains('hide')) {
        item.classList.remove('hide')
        document.querySelector('.filterlabel').classList.remove('hide');
        document.querySelector('.filterprodline ').classList.remove('transparent-bg')

      } else {
        item.classList.add('hide')
        document.querySelector('.filterlabel').classList.add('hide')
        document.querySelector('.filterprodline ').classList.add('transparent-bg')

      }
    }

  }
  function sortSearchData() {
    let i = document.querySelectorAll('#sortCon')
    for (let item of i) {
      if (item.classList.contains('hide')) {
        item.classList.remove('hide');
        document.querySelector('.sortlabel').classList.remove('hide');
        document.querySelector('.sortprodline').classList.remove('transparent-bg');

      } else {
        item.classList.add('hide')
        document.querySelector('.sortlabel').classList.add('hide');
        document.querySelector('.sortprodline').classList.add('transparent-bg');

      }
    }


  }
  function filterIngredientsData() {
    let i = document.querySelectorAll('#filterIngredients')
    for (let item of i) {
      if (item.classList.contains('hide')) {
        item.classList.remove('hide')
        document.querySelector('.ingredientlabel').classList.remove('hide')
        document.querySelector('.filterIngredients ').classList.remove('transparent-bg')

      } else {
        item.classList.add('hide')
        document.querySelector('.ingredientlabel').classList.add('hide')
        document.querySelector('.filterIngredients ').classList.add('transparent-bg')

      }
    }

  }
  function filterSkinconcernsearchData() {
    let i = document.querySelectorAll('#filterSkinconcern')
    for (let item of i) {
      if (item.classList.contains('hide')) {
        item.classList.remove('hide')
        document.querySelector('.skinlabel').classList.remove('hide')
        document.querySelector('.filterSkinconcern').classList.remove('transparent-bg')

      } else {
        item.classList.add('hide')
        document.querySelector('.skinlabel').classList.add('hide')
        document.querySelector('.filterSkinconcern').classList.add('transparent-bg')

      }
    }
  }

  function getDefault(selector, target) {
    let val = '';

    selector.forEach(item => {
      if (item.checked) {
        val = item.value
      }
    })
    if (val != '') {
      target.innerHTML = val;
    }
  }

  function changeText(e) {
    if ($('#readButton').attr('aria-expanded') === "true") {
      document.getElementById("readButton").innerHTML = "Read Less -";
    } else {
      document.getElementById("readButton").innerHTML = "Read More +"
    }
  }

  return (
    <>
      {/* Need to know */}
      {/* product Line */}
      {node.data ? node.data.taxonomyTermMedicalProductLines ? node.data.taxonomyTermMedicalProductLines.field_tax_needtoknow ?
        <div id="needToKnow" className={["container-fluid", needtoknow.needtoknowcontent].join(" ")}>

          <div className={"row"}>
            <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "imgcolclinical"].join(" ")}>
              <img src={lightblub} alt="lightblub" />
            </div>
            <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "medicalclinical"].join(" ")}>
              <img src={blueblub} alt="lightblub" />
            </div>
            <div className={["col-12", "col-lg-7", needtoknow.rightcontent].join(" ")}>
              <p className={needtoknow.needtoknowtitle} >
                {node.data ? node.data.taxonomyTermMedicalProductLines ? node.data.taxonomyTermMedicalProductLines.field_tax_needtoknow ?
                  node.data.taxonomyTermMedicalProductLines.field_tax_needtoknow.processed : '' : "" : ""}
              </p>
              {node.data ? node.data.taxonomyTermMedicalProductLines ?
                <div dangerouslySetInnerHTML={{
                  __html: node.data.taxonomyTermMedicalProductLines.field_tax_need_to_know_descripti ?
                    node.data.taxonomyTermMedicalProductLines.field_tax_need_to_know_descripti.processed : ''
                }}></div>
                : "" : ""}
              <div className="collapse" id="needReadMore" dangerouslySetInnerHTML={{
                __html: node.data.taxonomyTermMedicalProductLines.field_tax_description_second_par ?
                  node.data.taxonomyTermMedicalProductLines.field_tax_description_second_par.processed : ''
              }}></div>
              {node.data ? node.data.taxonomyTermMedicalProductLines ?
                node.data.taxonomyTermMedicalProductLines.field_tax_description_second_par ?
                  <a id="readButton" className={needtoknow.readMore} data-toggle="collapse" href="#needReadMore" role="button" aria-expanded="false" aria-controls="needReadMore" onClick={(e) => { changeText(e); }}>Read More +</a>
                  : "" : "" : ""}
            </div>
          </div>
        </div>
        : "" : "" : ""}
      {/* Medical Ingerdient */}
      {node.data ? node.data.taxonomyTermMedicalIngredients ?
        node.data.taxonomyTermMedicalIngredients.field_need__to_know__title ?
          <div id="needToKnow" className={["container-fluid", needtoknow.needtoknowcontent].join(" ")}>

            <div className={"row"}>
              <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "imgcolclinical"].join(" ")}>
                <img src={lightblub} alt="lightblub" />
              </div>
              <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "medicalclinical"].join(" ")}>
                <img src={blueblub} alt="lightblub" />
              </div>
              <div className={["col-12", "col-lg-7", needtoknow.rightcontent].join(" ")}>
                <p className={needtoknow.needtoknowtitle} >
                  {node.data ? node.data.taxonomyTermMedicalIngredients ? node.data.taxonomyTermMedicalIngredients.field_need__to_know__title ?
                    node.data.taxonomyTermMedicalIngredients.field_need__to_know__title.processed : '' : "" : ""}
                </p>
                {node.data ? node.data.taxonomyTermMedicalIngredients ?
                  <div dangerouslySetInnerHTML={{
                    __html: node.data.taxonomyTermMedicalIngredients.field_need_to__know__description ?
                      node.data.taxonomyTermMedicalIngredients.field_need_to__know__description.processed : ''
                  }}></div>
                  : "" : ""}
                <div className="collapse" id="needReadMore" dangerouslySetInnerHTML={{
                  __html: node.data.taxonomyTermMedicalIngredients.field_need_sec__know_description ?
                    node.data.taxonomyTermMedicalIngredients.field_need_sec__know_description.processed : ''
                }}></div>
                {node.data ? node.data.taxonomyTermMedicalIngredients ?
                  node.data.taxonomyTermMedicalIngredients.field_need_sec__know_description ?
                    <a id="readButton" className={needtoknow.readMore} data-toggle="collapse" href="#needReadMore" role="button" aria-expanded="false" aria-controls="needReadMore" onClick={(e) => { changeText(e); }}>Read More +</a>
                    : "" : "" : ""}
              </div>
            </div>
          </div>
          : "" : "" : ""}
      {/* Medical Skin concern */}
      {node.data ? node.data.taxonomyTermMedicalSkinConcern ?
        node.data.taxonomyTermMedicalSkinConcern.field_need_know_title ?
          <div id="needToKnow" className={["container-fluid", needtoknow.needtoknowcontent].join(" ")}>

            <div className={"row"}>
              <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "imgcolclinical"].join(" ")}>
                <img src={lightblub} alt="lightblub" />
              </div>
              <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "medicalclinical"].join(" ")}>
                <img src={blueblub} alt="lightblub" />
              </div>
              <div className={["col-12", "col-lg-7", needtoknow.rightcontent].join(" ")}>
                <p className={needtoknow.needtoknowtitle} >
                  {node.data ? node.data.taxonomyTermMedicalSkinConcern ? node.data.taxonomyTermMedicalSkinConcern.field_need_know_title ?
                    node.data.taxonomyTermMedicalSkinConcern.field_need_know_title.processed : '' : "" : ""}
                </p>
                {node.data ? node.data.taxonomyTermMedicalSkinConcern ?
                  <div dangerouslySetInnerHTML={{
                    __html: node.data.taxonomyTermMedicalSkinConcern.field_need__know_description ?
                      node.data.taxonomyTermMedicalSkinConcern.field_need__know_description.processed : ''
                  }}></div>
                  : "" : ""}
                <div className="collapse" id="needReadMore" dangerouslySetInnerHTML={{
                  __html: node.data.taxonomyTermMedicalSkinConcern.field_need_to_know_second_descri ?
                    node.data.taxonomyTermMedicalSkinConcern.field_need_to_know_second_descri.processed : ''
                }}></div>
                {node.data ? node.data.taxonomyTermMedicalSkinConcern ?
                  node.data.taxonomyTermMedicalSkinConcern.field_need_to_know_second_descri ?
                    <a id="readButton" className={needtoknow.readMore} data-toggle="collapse" href="#needReadMore" role="button" aria-expanded="false" aria-controls="needReadMore" onClick={(e) => { changeText(e); }}>Read More +</a>
                    : "" : "" : ""}
              </div>
            </div>
          </div>
          : "" : "" : ""}
      {/* Medical categories */}
      {node.data ? node.data.taxonomyTermMedicalCategories ?
        node.data.taxonomyTermMedicalCategories.field_need_to_know_title ?
          <div id="needToKnow" className={["container-fluid", needtoknow.needtoknowcontent].join(" ")}>

            <div className={"row"}>
              <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "imgcolclinical"].join(" ")}>
                <img src={lightblub} alt="lightblub" />
              </div>
              <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol, "medicalclinical"].join(" ")}>
                <img src={blueblub} alt="lightblub" />
              </div>
              <div className={["col-12", "col-lg-7", needtoknow.rightcontent].join(" ")}>
                <p className={needtoknow.needtoknowtitle} >
                  {node.data ? node.data.taxonomyTermMedicalCategories ? node.data.taxonomyTermMedicalCategories.field_need_to_know_title ?
                    node.data.taxonomyTermMedicalCategories.field_need_to_know_title.processed : '' : "" : ""}
                </p>
                {node.data ? node.data.taxonomyTermMedicalCategories ?
                  <div dangerouslySetInnerHTML={{
                    __html: node.data.taxonomyTermMedicalCategories.field_need_to_know_description ?
                      node.data.taxonomyTermMedicalCategories.field_need_to_know_description.processed : ''
                  }}></div>
                  : "" : ""}
                <div className="collapse" id="needReadMore" dangerouslySetInnerHTML={{
                  __html: node.data.taxonomyTermMedicalCategories.field_desc_sec_par ?
                    node.data.taxonomyTermMedicalCategories.field_desc_sec_par.processed : ''
                }}></div>
                {node.data ? node.data.taxonomyTermMedicalCategories.field_desc_sec_par ?
                  node.data.taxonomyTermMedicalCategories.field_desc_sec_par ?
                    <a id="readButton" className={needtoknow.readMore} data-toggle="collapse" href="#needReadMore" role="button" aria-expanded="false" aria-controls="needReadMore" onClick={(e) => { changeText(e); }}>Read More +</a>
                    : "" : "" : ""}
              </div>
            </div>
          </div>
          : "" : "" : ""}
      {/* End need to Know */}
      <div
        className={checktaxonomyType === "clinical" ?
          "container-fluid collectionhero collectionList " + productsliststyle.collectionList
          : "container-fluid collectionhero collectionList  " + productsliststyle.listMedicalBg + " " + productsliststyle.listMedicalBg}
      >


        {/* Fiters */}
        <div
          className={[
            "row",
            productsliststyle.Collectionfiltercontainer,
            "pb-20",
            "lg-visibility"
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
            <label className={[productsliststyle.filter, "hide", "filterlabel", "d-block"].join(" ")}>Filter by:</label>
            <div class="appointment-elemnt advanced-search filterprodline transparent-bg">
              <p class="input-name filtersearch" onClick={() => { filtersearchData(); }}>Skin Type</p>
              <div id="prodLinesSelected">

                <div class="product-lines hide" id="flitersCon">
                  <Scrollbars style={{ height: 250 }}>
                    <ul class="popupUl popupFilter">
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { saveselectfilter(e); }} name="product" type="radio" value="All" />All
                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>
                      {checkDataCondition((dataType === 'clinical'), (
                        <>
                          {filtersDataQuery.clinicalType.edges.map(({ node }) => (
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselectfilter(e); }} name="product" type="radio" value={node.name} />{node.name}
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          ))}
                        </>
                      ))}

                      {checkDataCondition((dataType === 'medical'), (
                        <>
                          {filtersDataQuery.medicalType.edges.map(({ node }) => (
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselectfilter(e); }} name="product" type="radio" value={node.name} />{node.name}
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          ))}
                        </>
                      ))}

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


            <label className={[productsliststyle.filter, "hide", "skinlabel"].join(" ")}>Skin concern:</label>

            <div class="appointment-elemnt advanced-search filterSkinconcern transparent-bg">
              <p class="input-name skinsearch" onClick={() => { filterSkinconcernsearchData(); }}>Skin concern</p>
              <div id="prodLinesSelected">

                <div class="product-lines hide" id="filterSkinconcern">
                  <Scrollbars style={{ height: 250 }}>
                    <ul class="popupUl popupFilter">
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { saveselect(e) }} name="Skin-concern" type="radio" value="All" />All
                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>
                      {checkDataCondition((dataType === 'clinical'), (
                        <>
                          {filtersDataQuery.clinicalSkin.edges.map(({ node }) => (
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselect(e) }} name="Skin-concern" type="radio" value={node.name} />{node.name}
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          ))}
                        </>
                      ))}

                      {checkDataCondition((dataType === 'medical'), (
                        <>
                          {filtersDataQuery.medicalSkin.edges.map(({ node }) => (
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselect(e) }} name="Skin-concern" type="radio" value={node.name} />{node.name}
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          ))}
                        </>
                      ))}

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


            <label className={[productsliststyle.filter, "hide", "ingredientlabel"].join(" ")}>Ingredients:</label>

            <div class="appointment-elemnt advanced-search filterIngredients transparent-bg">
              <p class="input-name ingsearch" onClick={() => { filterIngredientsData(); }}>Ingredients</p>
              <div id="prodLinesSelected">

                <div class="product-lines hide" id="filterIngredients">
                  <Scrollbars style={{ height: 250 }}>
                    <ul class="popupUl popupFilter">
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { saveselectIngredients(e) }} name="Ingredients" type="radio" value="All" />All
                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>

                      {checkDataCondition((dataType === 'clinical'), (
                        <>
                          {filtersDataQuery.clinicalIngredients.edges.map(({ node }) => (
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselectIngredients(e) }} name="Ingredients" type="radio" value={node.name} />{node.name}
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          ))}
                        </>
                      ))}

                      {checkDataCondition((dataType === 'medical'), (
                        <>
                          {filtersDataQuery.medicalIngredients.edges.map(({ node }) => (
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselectIngredients(e) }} name="Ingredients" type="radio" value={node.name} />{node.name}
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          ))}
                        </>
                      ))}

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
              `${dataType == 'clinical' ? 'd-none' : ''}`
            ].join(" ")}
          >
            <label class="terms Prescription">Prescription Not Required<input type="checkbox" name="footer-checkbox" onChange={handlePrescribe} /><span class="checkmark"></span></label>
          </div>


          <div
            className={[
              "col-12",
              `${dataType == 'clinical' ? 'offset-lg-4' : 'offset-lg-2'}`,
              "col-lg-2",
              productsliststyle.Collectionfilter,
              "Collectionfilter",
            ].join(" ")}
          >
            <label className={[productsliststyle.filter, "hide", "sortlabel", "d-block"].join(" ")}>Sort by:</label>

            <div class="appointment-elemnt advanced-search sortprodline transparent-bg">
              <p class="input-name sortsearch" onClick={() => { sortSearchData(); }}>Select One</p>
              <div id="prodLinesSelected">

                <div class="product-lines hide" id="sortCon">
                  <Scrollbars style={{ height: 250 }}>
                    <ul class="popupUl popupFilter">
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="Alphabetically(A-Z)" defaultChecked={true} />Alphabetically(A-Z)

                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="Alphabetically(Z-A)" />Alphabetically(Z-A)

                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="Price: Low - High" />Price: Low - High

                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="Price: High - Low" />Price: High - Low
                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>
                      <li>
                        <label class="checkcon terms">
                          <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="BestSeller" />Best Seller
                          <span className="checkmarkfinder"></span>
                        </label>
                      </li>
                    </ul>
                  </Scrollbars>
                </div>
              </div>
            </div>   </div>
        </div>
        <div className={["sm-visibility", productsliststyle.filtermob].join(" ")}>
          <button data-toggle="modal" data-target="#collectionPopup" className={["col-12 col-md-3 col-lg-12", productsliststyle.filterbtn].join(" ")}>
            Filters
          </button>
        </div>
        {/* List */}
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
                    <>

                      <div
                        className={[
                          "col-12 col-lg-6 col-md-6 product-element",

                          productsliststyle.productview,
                          "productview", `${item.relationships.field_medical_skin_type ? item.relationships.field_medical_skin_type.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_medical_skin_concern ? item.relationships.field_medical_skin_concern.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_medical_ingredients ? item.relationships.field_medical_ingredients.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_clinical_skin_type ? item.relationships.field_clinical_skin_type.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_clinical_skin_concern ? item.relationships.field_clinical_skin_concern.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_clinical_ingredients ? item.relationships.field_clinical_ingredients.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,

                          `${item.relationships.taxonomy_term__clinical_categories ? item.relationships.taxonomy_term__clinical_categories.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,

                          `${item.relationships.taxonomy_term__clinical_skin_concern ? item.relationships.taxonomy_term__clinical_skin_concern.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_medical_rx ? item.relationships.field_medical_rx.name : ''}`,
                          `${item.field_is_best_seller ? 'bestSeller' : ''}`,
                        ].join(" ")}

                      >
                        {pageNodeType == "clinicalConcern" ? (
                          <ProductCard
                            productCat="clinical"
                            productLink={item.path.alias}
                            producttitle={item.title}
                            productdescription={{
                              __html: item.field_clinical_description ? item.field_clinical_description.processed : "",
                            }}
                            productimage={
                              (item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile)
                                ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp ? item.relationships.field_clinical_image[0]
                                    .localFile.childImageSharp.fluid
                                  : "" : ""
                            }
                            price={item.field_clinical_price}
                            rate="0"
                            productId={item.field_clinical_id}
                            Sku={item.field_clinical_sku}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                          />

                        ) : pageNodeType == "clinicalCategories" ? (
                          <ProductCard
                            productCat="clinical"
                            productLink={item.path.alias}
                            producttitle={item.title}
                            productdescription={{
                              __html: item.field_clinical_description ? item.field_clinical_description.processed : "",
                            }}
                            productimage={
                              (item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile)
                                ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp ? item.relationships.field_clinical_image[0]
                                    .localFile.childImageSharp.fluid
                                  : "" : ""
                            }
                            price={item.field_clinical_price}
                            rate="0"
                            productId={item.field_clinical_id}
                            Sku={item.field_clinical_sku}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                          />
                        ) : (
                          <ProductCard
                            productCat="medical"
                            productLink={item.path.alias}
                            producttitle={item.title}
                            productdescription={{
                              __html: item.field_medical_description ? item.field_medical_description.processed : ""
                            }}
                            productimage={
                              item.relationships.field_medical_image[0]
                                ? (item.relationships.field_medical_image[0]
                                  .localFile ? item.relationships.field_medical_image[0]
                                    .localFile.childImageSharp.fluid : '')
                                : ""
                            }
                            isrx={item.relationships.field_medical_rx ? item.relationships.field_medical_rx.name : ""}
                            price={item.field_medical_price}
                            rate="0"
                            productId={item.field_medical_id}
                            premierid={item.field_medical_premier_points_id ? item.field_medical_premier_points_id : ""}
                            feild_preimer={item.field_medical_premier_points ? item.field_medical_premier_points : ""}
                            Sku={item.field_medical_sku}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                          />
                        )}
                        <div
                          class="d-none ingredient"
                          dangerouslySetInnerHTML={{ __html: ingredient }}
                        ></div>
                      </div>
                    </>) : (<>

                      <div
                        className={[
                          "col-12 col-lg-3 col-md-4 product-element",

                          productsliststyle.productview,
                          "productview", `${item.relationships.field_medical_skin_type ? item.relationships.field_medical_skin_type.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_medical_skin_concern ? item.relationships.field_medical_skin_concern.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_medical_ingredients ? item.relationships.field_medical_ingredients.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_clinical_skin_type ? item.relationships.field_clinical_skin_type.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_clinical_skin_concern ? item.relationships.field_clinical_skin_concern.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_clinical_ingredients ? item.relationships.field_clinical_ingredients.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,

                          `${item.relationships.taxonomy_term__clinical_categories ? item.relationships.taxonomy_term__clinical_categories.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,

                          `${item.relationships.taxonomy_term__clinical_skin_concern ? item.relationships.taxonomy_term__clinical_skin_concern.map(prod => (
                            " " + prod.name.split(' ').join('_') + " "
                          )) : " "}`,
                          `${item.relationships.field_medical_rx ? item.relationships.field_medical_rx.name : ''}`,
                          `${item.field_is_best_seller ? 'bestSeller' : ''}`,
                        ].join(" ")}

                      >
                        {pageNodeType == "clinicalConcern" ? (
                          <ProductCard
                            productCat="clinical"
                            productLink={item.path.alias}
                            producttitle={item.title}
                            productdescription={{
                              __html: item.field_clinical_description ? item.field_clinical_description.processed : "",
                            }}
                            productimage={
                              (item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile)
                                ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp ? item.relationships.field_clinical_image[0]
                                    .localFile.childImageSharp.fluid
                                  : "" : ""
                            }
                            price={item.field_clinical_price}
                            rate="0"
                            productId={item.field_clinical_id}
                            Sku={item.field_clinical_sku}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                          />
                        ) : pageNodeType == "ClinicalIngredients" ? (<ProductCard
                          productCat="clinical"
                          productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description ? item.field_clinical_description.processed : "",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile)
                              ? (item.relationships.field_clinical_image[0]
                                .localFile ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid : '')
                              : ""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                          Sku={item.field_clinical_sku}
                          minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                        />) : pageNodeType == "clinicalGroups" ? (<ProductCard
                          productCat="clinical"
                          productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description ? item.field_clinical_description.processed : "",
                          }}
                          productimage={
                            (item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile)
                              ? (item.relationships.field_clinical_image[0]
                                .localFile ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid : '')
                              : ""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                          Sku={item.field_clinical_sku}
                          minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                        />) : pageNodeType == "clinicalCategories" ? (
                          <ProductCard
                            productCat="clinical"
                            productLink={item.path.alias}
                            producttitle={item.title}
                            productdescription={{
                              __html: item.field_clinical_description ? item.field_clinical_description.processed : "",
                            }}
                            productimage={
                              (item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile)
                                ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp ? item.relationships.field_clinical_image[0]
                                    .localFile.childImageSharp.fluid
                                  : "" : ""
                            }
                            price={item.field_clinical_price}
                            rate="0"
                            productId={item.field_clinical_id}
                            Sku={item.field_clinical_sku}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                          />
                        ) : pageNodeType == "skinClinicalType" ? (
                          <ProductCard
                            productCat="clinical"
                            productLink={item.path.alias}
                            producttitle={item.title}
                            productdescription={{
                              __html: item.field_clinical_description ? item.field_clinical_description.processed : "",
                            }}
                            productimage={
                              (item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile)
                                ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp ? item.relationships.field_clinical_image[0]
                                    .localFile.childImageSharp.fluid
                                  : "" : ""
                            }
                            price={item.field_clinical_price}
                            rate="0"
                            productId={item.field_clinical_id}
                            Sku={item.field_clinical_sku}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                          />

                        ) : (
                          <ProductCard
                            productCat="medical"
                            productLink={item.path.alias}
                            producttitle={item.title}
                            productdescription={{

                              __html: item.field_medical_description ? item.field_medical_description.processed : ""
                            }}
                            productimage={
                              item.relationships.field_medical_image[0]
                                ? (item.relationships.field_medical_image[0].localFile ? item.relationships.field_medical_image[0].localFile.childImageSharp.fluid : '')
                                : ""
                            }
                            isrx={item.relationships.field_medical_rx ? item.relationships.field_medical_rx.name : ""}
                            price={item.field_medical_price}
                            rate="0"
                            productId={item.field_medical_id}
                            premierid={item.field_medical_premier_points_id ? item.field_medical_premier_points_id : ""}
                            feild_preimer={item.field_medical_premier_points ? item.field_medical_premier_points : ""}
                            Sku={item.field_medical_sku}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                          />
                        )}
                        <div
                          class="d-none ingredient"
                          dangerouslySetInnerHTML={{ __html: ingredient }}
                        ></div>
                      </div>
                    </>)}

                  {(contentTile && index == 3) ?
                    <div id="contentTile" className={`col-12 col-lg-3 col-md-4 content-tile product-element ${productsliststyle.productview}`}>
                      <ContentTile
                        image={contentTile.relationships.field_tile_image
                          && contentTile.relationships.field_tile_image.localFile
                          && contentTile.relationships.field_tile_image.localFile.childImageSharp
                          && contentTile.relationships.field_tile_image.localFile.childImageSharp.fluid ?
                          contentTile.relationships.field_tile_image.localFile.childImageSharp.fluid : ""}

                        title={contentTile.field_tile_title ? { __html: contentTile.field_tile_title.processed } : ""}
                        text={contentTile.field_tile_text ? { __html: contentTile.field_tile_text.processed } : ""}
                        link={contentTile.field_tile_link ? contentTile.field_tile_link : ""}
                      />
                    </div>
                    : ""}
                </>
              )
            })
            : checkTaxonomy
              ? checkTaxonomy.relationships.field_vocabularies.map(item =>

                (item.relationships && item.relationships.node__clinical_product)
                  ? item.relationships.node__clinical_product.map(
                    (product, index) => {
                      let ingredient = getIngredient(product);


                      if (!checkProductExisitance(product)) {

                        products.push(product)
                        return (
                          <div
                            className={[
                              "col-12 col-lg-3 col-md-4 product-element",
                              productsliststyle.productview,
                              "productview",
                              `${product.relationships.field_medical_skin_type ? product.relationships.field_medical_skin_type.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,
                              `${product.relationships.field_medical_skin_concern ? product.relationships.field_medical_skin_concern.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,
                              `${product.relationships.field_medical_ingredients ? product.relationships.field_medical_ingredients.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,
                              `${product.relationships.field_clinical_skin_type ? product.relationships.field_clinical_skin_type.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,
                              `${product.relationships.field_clinical_skin_concern ? product.relationships.field_clinical_skin_concern.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,
                              `${product.relationships.field_clinical_ingredients ? product.relationships.field_clinical_ingredients.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,

                              `${product.relationships.taxonomy_term__clinical_categories ? product.relationships.taxonomy_term__clinical_categories.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,

                              `${product.relationships.taxonomy_term__clinical_skin_concern ? product.relationships.taxonomy_term__clinical_skin_concern.map(prod => (
                                " " + prod.name.split(' ').join('_') + " "
                              )) : " "}`,
                              `${product.relationships.field_medical_rx ? product.relationships.field_medical_rx.name : ''}`,
                              `${product.field_is_best_seller ? 'bestSeller' : ''}`,
                            ].join(" ")}

                          >
                            <ProductCard
                              productCat="clinical"
                              productLink={product.path.alias}
                              producttitle={product.title}
                              productdescription={{
                                __html:
                                  product.field_clinical_description ? product.field_clinical_description.processed : "",
                              }}
                              productimage={
                                (product.relationships.field_clinical_image[0] && product.relationships.field_clinical_image[0].localFile)
                                  ? product.relationships.field_clinical_image[0].localFile.childImageSharp.fluid
                                  : ""
                              }
                              price={product.field_clinical_price}
                              rate="0"
                              productId={product.field_clinical_id}
                              Sku={product.field_clinical_sku}
                              minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
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
                  : (item.relationships && item.relationships.node__medical_product)
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
                                `${item.name.split(' ').join('_')}`,
                                productsliststyle.productview,
                                "productview", `${product.relationships.field_medical_skin_type ? product.relationships.field_medical_skin_type.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,
                                `${product.relationships.field_medical_skin_concern ? product.relationships.field_medical_skin_concern.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,
                                `${product.relationships.field_medical_ingredients ? product.relationships.field_medical_ingredients.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,
                                `${product.relationships.field_clinical_skin_type ? product.relationships.field_clinical_skin_type.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,
                                `${product.relationships.field_clinical_skin_concern ? product.relationships.field_clinical_skin_concern.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,
                                `${product.relationships.field_clinical_ingredients ? product.relationships.field_clinical_ingredients.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,

                                `${product.relationships.taxonomy_term__clinical_categories ? product.relationships.taxonomy_term__clinical_categories.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,

                                `${product.relationships.taxonomy_term__clinical_skin_concern ? product.relationships.taxonomy_term__clinical_skin_concern.map(prod => (
                                  " " + prod.name.split(' ').join('_') + " "
                                )) : " "}`,
                                `${product.relationships.field_medical_rx ? product.relationships.field_medical_rx.name : ''}`,
                                `${product.field_is_best_seller ? 'bestSeller' : ''}`,
                              ].join(" ")}

                            >
                              <ProductCard
                                productCat="medical"
                                productLink={product.path.alias}
                                producttitle={product.title}
                                productdescription={{
                                  __html:
                                    product.field_medical_description ? product.field_medical_description.processed : '',
                                }}
                                productimage={
                                  product.relationships.field_medical_image[0]
                                    ? product.relationships.field_medical_image[
                                      0
                                    ].localFile ? product.relationships.field_medical_image[
                                      0
                                    ].localFile.childImageSharp.fluid
                                      : "" : ""
                                }
                                isrx={product.relationships.field_medical_rx ? product.relationships.field_medical_rx.name : ""}
                                price={product.field_medical_price}
                                rate="0"
                                productId={product.field_medical_id}
                                premierid={product.field_medical_premier_points_id ? product.field_medical_premier_points_id : ""}
                                feild_preimer={product.field_medical_premier_points ? product.field_medical_premier_points : ""}
                                Sku={product.field_medical_sku}
                                minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
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
        <div
          class="modal fade"
          id="collectionPopup"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog " role="document">
            <div class="modal-content">
              <div class="modal-header">
                <p className="filterpopuptitle">Filter</p>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div class="modal-body collectionPopup-body">
                <div
                  className={[

                    `${dataType == 'clinical' ? 'offset-lg-4' : 'offset-lg-2'}`,

                    productsliststyle.Collectionfilter,
                    "Collectionfilter",
                  ].join(" ")}
                >

                  <div class="appointment-elemnt advanced-search sortprodline transparent-bg">
                    <p class="input-name sortsearch" onClick={() => { sortSearchData(); }}>Sort By:</p>
                    <div id="prodLinesSelected">

                      <div class="product-lines hide" id="sortCon">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="Name" defaultChecked={true} />Name

                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="Price: Low - High" />Price: Low - High

                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="Price: High - Low" />Price: High - Low
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { sortselect(e) }} name="sort" type="radio" value="BestSeller" />Best Seller
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>   </div>

                <div
                  className={[

                    productsliststyle.Collectionfilter,
                    "Collectionfilter",
                  ].join(" ")}
                >

                  <div class="appointment-elemnt advanced-search filterprodline transparent-bg">
                    <p class="input-name filtersearch" onClick={() => { filtersearchData(); }}>Skin Type</p>
                    <div id="prodLinesSelected">

                      <div class="product-lines hide" id="flitersCon">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselectfilter(e); }} name="product" type="radio" value="All" />All
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            {checkDataCondition((dataType === 'clinical'), (
                              <>
                                {filtersDataQuery.clinicalType.edges.map(({ node }) => (
                                  <li>
                                    <label class="checkcon terms">
                                      <input class="popupVideoInput" onChange={(e) => { saveselectfilter(e); }} name="product" type="radio" value={node.name} />{node.name}
                                      <span className="checkmarkfinder"></span>
                                    </label>
                                  </li>
                                ))}
                              </>
                            ))}

                            {checkDataCondition((dataType === 'medical'), (
                              <>
                                {filtersDataQuery.medicalType.edges.map(({ node }) => (
                                  <li>
                                    <label class="checkcon terms">
                                      <input class="popupVideoInput" onChange={(e) => { saveselectfilter(e); }} name="product" type="radio" value={node.name} />{node.name}
                                      <span className="checkmarkfinder"></span>
                                    </label>
                                  </li>
                                ))}
                              </>
                            ))}

                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>


                </div>
                <div
                  className={[

                    productsliststyle.Collectionfilter,
                    "Collectionfilter",
                  ].join(" ")}
                >


                  <label className={[productsliststyle.filter, "hide", "skinlabel"].join(" ")}>Skin concern:</label>

                  <div class="appointment-elemnt advanced-search filterSkinconcern transparent-bg">
                    <p class="input-name skinsearch" onClick={() => { filterSkinconcernsearchData(); }}>Skin concern</p>
                    <div id="prodLinesSelected">

                      <div class="product-lines hide" id="filterSkinconcern">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselect(e) }} name="Skin-concern" type="radio" value="All" />All
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>
                            {checkDataCondition((dataType === 'clinical'), (
                              <>
                                {filtersDataQuery.clinicalSkin.edges.map(({ node }) => (
                                  <li>
                                    <label class="checkcon terms">
                                      <input class="popupVideoInput" onChange={(e) => { saveselect(e) }} name="Skin-concern" type="radio" value={node.name} />{node.name}
                                      <span className="checkmarkfinder"></span>
                                    </label>
                                  </li>
                                ))}
                              </>
                            ))}

                            {checkDataCondition((dataType === 'medical'), (
                              <>
                                {filtersDataQuery.medicalSkin.edges.map(({ node }) => (
                                  <li>
                                    <label class="checkcon terms">
                                      <input class="popupVideoInput" onChange={(e) => { saveselect(e) }} name="Skin-concern" type="radio" value={node.name} />{node.name}
                                      <span className="checkmarkfinder"></span>
                                    </label>
                                  </li>
                                ))}
                              </>
                            ))}

                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={[

                    productsliststyle.Collectionfilter,
                    "Collectionfilter",
                  ].join(" ")}
                >


                  <label className={[productsliststyle.filter, "hide", "ingredientlabel"].join(" ")}>Ingredients:</label>

                  <div class="appointment-elemnt advanced-search filterIngredients transparent-bg">
                    <p class="input-name ingsearch" onClick={() => { filterIngredientsData(); }}>Ingredients</p>
                    <div id="prodLinesSelected">

                      <div class="product-lines hide" id="filterIngredients">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class="checkcon terms">
                                <input class="popupVideoInput" onChange={(e) => { saveselectIngredients(e) }} name="Ingredients" type="radio" value="All" />All
                                <span className="checkmarkfinder"></span>
                              </label>
                            </li>

                            {checkDataCondition((dataType === 'clinical'), (
                              <>
                                {filtersDataQuery.clinicalIngredients.edges.map(({ node }) => (
                                  <li>
                                    <label class="checkcon terms">
                                      <input class="popupVideoInput" onChange={(e) => { saveselectIngredients(e) }} name="Ingredients" type="radio" value={node.name} />{node.name}
                                      <span className="checkmarkfinder"></span>
                                    </label>
                                  </li>
                                ))}
                              </>
                            ))}

                            {checkDataCondition((dataType === 'medical'), (
                              <>
                                {filtersDataQuery.medicalIngredients.edges.map(({ node }) => (
                                  <li>
                                    <label class="checkcon terms">
                                      <input class="popupVideoInput" onChange={(e) => { saveselectIngredients(e) }} name="Ingredients" type="radio" value={node.name} />{node.name}
                                      <span className="checkmarkfinder"></span>
                                    </label>
                                  </li>
                                ))}
                              </>
                            ))}

                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>




                </div>

              </div>
              <div
                className={[

                  productsliststyle.Collectionfilter,
                  "Collectionfilter",
                  "medical-rx",
                  `${dataType == 'clinical' ? 'd-none' : ''}`
                ].join(" ")}
              >
                <label class="terms Prescription">Prescription Not Required<input type="checkbox" name="footer-checkbox" onChange={handlePrescribe} /><span class="checkmark"></span></label>
              </div>

              <div class="modal-footer">
                <button type="button" class=" collectionPopup-fbtn hide" >Cancel</button>
                <button type="button" class="collectionPopup-fbtn" data-dismiss="modal">APPLY</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>)
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
        field_clinical_sku
        field_min_quantity
        title
        relationships {
          field_clinical_ingredients {
            name
          }
          field_clinical_skin_concern {
            name
          }
          field_clinical_skin_type {
            name
          }
          field_clinical_categories {
            name
          }
          field_clinical_groups {
            name
          }

       
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
          name
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
              field_clinical_sku
              field_min_quantity
              relationships {
                field_clinical_ingredients {
                  name
                }
                field_clinical_skin_concern {
                  name
                }
                field_clinical_skin_type {
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
          name
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
              field_clinical_sku
              field_min_quantity
              relationships {
            
                field_clinical_ingredients {
                  name
                }
                field_clinical_skin_concern {
                  name
                }
                field_clinical_skin_type {
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
              field_is_best_seller
              field_medical_premier_points
              field_medical_sku
              field_min_quantity
              field_medical_premier_points_id
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
                  id
                  name
                }
                field_medical_skin_concern {
                  name
                }
                field_medical_skin_type {
                  name
                }
                field_medical_categories {
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
              field_is_best_seller
              field_medical_premier_points
              field_medical_sku
              field_min_quantity
              field_medical_premier_points_id
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
                  id
                  name
                }
                field_medical_skin_concern {
                  name
                }
                field_medical_skin_type {
                  name
                }
                field_medical_categories {
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
              field_medical_premier_points
              field_medical_sku
              field_min_quantity
              field_is_best_seller
              field_medical_premier_points_id
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
                  id
                  name
                }
                field_medical_skin_concern {
                  name
                }
                field_medical_skin_type {
                  name
                }
                field_medical_categories {
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
              field_is_best_seller
              field_medical_premier_points
              field_medical_sku
              field_min_quantity
              field_medical_premier_points_id
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
                field_medical_skin_type {
                  name
                }
                field_medical_ingredients {
                  name
                }
                field_medical_skin_concern {
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
              field_is_best_seller
              field_medical_premier_points
              field_medical_sku
              field_min_quantity
              field_medical_premier_points_id
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
                  id
                  name
                }
                field_medical_skin_concern {
                  name
                }
                field_medical_skin_type {
                  name
                }
                field_medical_categories {
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
              field_clinical_sku
              field_min_quantity
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
                field_clinical_skin_concern {
                  name
                }
                field_clinical_skin_type {
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
