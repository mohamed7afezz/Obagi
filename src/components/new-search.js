import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductCard from "../components/productcard"
import productsliststyle from "../assets/scss/components/collection-list.module.scss"
import {CustomSelect} from '../assets/js/custom-select'
import searchResultStyle from '../assets/scss/components/search-results.module.scss'

const NewSearchProductsResult = ({ searchResult, node, nodetype }) => {



  let products = []
  let checkTaxonomy = searchResult
  let pageNodeType = nodetype ? nodetype : ""
  
function clinicalbg (){
  document.querySelector('.collectionList').classList.remove('medicalbg')
}
function medicalbg (){
  document.querySelector('.collectionList').classList.add('medicalbg')
}
  function checkProductExisitance(product) {
   
    return products.some(item => product.path.alias == item.path.alias)
  }

  function getIngredient (item) {
    // if (item.relationships.field_clinical_components) {
    //   return item.relationships.field_clinical_components.filter(
    //     comp => {
    //       return comp.__typename == "paragraph__ingredient"
    //     }
    //   )[0].relationships.field_read_more[0].field_read_more_content
    //     .processed;
    // } 
    // return item.relationships.field_medical_components.filter(
     
    //   comp => {
        
    //     return comp.__typename == "paragraph__ingredient"
    //   }
    // )[0]?item.relationships.field_medical_components.filter(
     
    //   comp => {
        
    //     return comp.__typename == "paragraph__ingredient"
    //   }
    // )[0].relationships.field_read_more[0].field_read_more_content
    //   .processed:''
  }
  useEffect(() => {
    if(document.querySelectorAll('.custom-select .select-selected').length < 1) {
      CustomSelect();
    }
    const isotope = require("isotope-layout")
    //  const filterValSelect = document.getElementsByName("radiono");
  
    const sortPriceSelect = document.querySelector(".sort-price")
    let sortAsc =
      sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
        ? true
        : false

    const isoGrid = new isotope(".products-list", {
      itemSelector: ".product-element",
      layoutMode: "masonry",
      getSortData: {
        price: item => {
          var weight = item.querySelector(".prod-price").textContent
          return parseFloat(weight)
        },
      },
      // filter: item => {
  
       
      //         return    item.getElementsByClassName("ingredient")[0]
      //         .innerText.includes();
             
              
        
        
      // },
      transitionDuration: 0,
      sortBy: "price",
      sortAscending: sortAsc,
    })

    //update view on sort on page load
    updateSortView()

    //filter
    // filterValSelect.addEventListener("change", function (event) {
    //   sortAsc =
    //     sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
    //       ? true
    //       : false
    //   isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
    //   updateSortView()
    // })
    //sort
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

  return (
    <div
      className={[
        "container-fluid",
        productsliststyle.collectionList,
        "collectionhero",
        "collectionList",
        "mt-48"
      ].join(" ")}
    >
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
            <label className="radioLabel"  onClick={() => {medicalbg();}}><input name="radiono" value="medical"   type="radio"/><span class="radiomark"></span>Medical (6)</label>
            <label className="radioLabel"  onClick={() => {clinicalbg(); }}><input name="radiono" value="Clinical"  type="radio"/> <span class="radiomark"></span>Clinical (4)</label>
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
                            __html: item.field_clinical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_clinical_image[0]
                              ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid
                              : ""
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
                            __html: item.field_clinical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_clinical_image[0]
                              ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid
                              : ""
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
                            __html: item.field_medical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_medical_image[0]
                              ? item.relationships.field_medical_image[0]
                                  .localFile.childImageSharp.fluid
                              : ""
                          }
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
                            __html: item.field_clinical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_clinical_image[0]
                              ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid
                              : ""
                          }
                          price={item.field_clinical_price}
                          rate="0"
                          productId={item.field_clinical_id}
                        />
                      ) : pageNodeType == "clinicalGroups" ? ( <ProductCard
                        productLink={item.path.alias}
                          producttitle={item.title}
                          productdescription={{
                            __html: item.field_clinical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_clinical_image[0]
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
                            __html: item.field_clinical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_clinical_image[0]
                              ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid
                              : ""
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
                            __html: item.field_clinical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_clinical_image[0]
                              ? item.relationships.field_clinical_image[0]
                                  .localFile.childImageSharp.fluid
                              : ""
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
                            __html: item.field_medical_description.processed,
                          }}
                          productimage={
                            item.relationships.field_medical_image[0]
                              ? (item.relationships.field_medical_image[0].localFile? item.relationships.field_medical_image[0].localFile.childImageSharp.fluid : '')
                              : ""
                          }
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
                                  product.field_clinical_description.processed,
                              }}
                              productimage={
                                product.relationships.field_clinical_image[
                                  0
                                ]
                                  ? product.relationships.field_clinical_image[
                                      0
                                    ].localFile.childImageSharp.fluid
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
                                product.field_medical_description.processed,
                            }}
                            productimage={
                              product.relationships.field_medical_image[0]
                                ? product.relationships.field_medical_image[
                                    0
                                  ].localFile.childImageSharp.fluid
                                : ""
                            }
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

export default NewSearchProductsResult
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
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
  fragment vocabulariesList1 on paragraph__vocabularies {
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
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid {
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
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
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
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid {
                        src
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
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid {
                        src
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
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid {
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
                      fluid {
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
                      fluid {
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
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid {
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
                      fluid {
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
