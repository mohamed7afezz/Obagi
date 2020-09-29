import React, { useContext, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductCard from "../components/productcard"
import productsliststyle from "../assets/scss/components/collection-list.module.scss"
import {CustomSelect} from '../assets/js/custom-select'
import searchResultStyle from '../assets/scss/components/search-results.module.scss'
import SearchContext from "../providers/search-provider"

const NewSearchProductsResult = ({ searchResult, node, nodetype }) => {


  const {clinicalSearchResults} = useContext(SearchContext);
  const {medicalSearchResults} = useContext(SearchContext);
  let products = []
  let checkTaxonomy = searchResult
  let pageNodeType = nodetype ? nodetype : ""
  let outside="";
  
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
 console.log("hassan",medicalSearchResults)
  return (
    <div
      className={[
        "container-fluid",
        productsliststyle.collectionList,
        "collectionhero",
        "collectionList",
        "medicalbg",
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
            <label className="radioLabel"  onClick={() => {medicalbg();}}><input name="radiono"  value="medical"   type="radio"/><span class="radiomark"></span>Medical </label>
            <label className="radioLabel"  onClick={() => {clinicalbg(); }}><input name="radiono" value="Clinical"  type="radio"/> <span class="radiomark"></span>Clinical </label>
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
           
                  {medicalSearchResults.data?
                medicalSearchResults.data.length > 0?
                medicalSearchResults.data.map( (data , index)=>(
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
                        productLink={data.attributes.path.alias}
                      producttitle={data.attributes.title}
                      productdescription={{__html:data.attributes.field_medical_description.processed}}
                      productimage={data.attributes.relationships? data.attributes.relationships.field_medical_image.links.related.href : ""}
                      price={data.attributes.field_medical_price}
                      productId={data.attributes.field_medical_id}
                    />
                  </div> 
                      )) : "" :""}
                  {clinicalSearchResults.data?
                     clinicalSearchResults.data.length > 0?
                     clinicalSearchResults.data.map( (data , index)=>(
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
                         productLink={data.attributes.path.alias}
                        producttitle={data.attributes.title}
                        productdescription={{__html:data.attributes.field_clinical_description.processed}}
                        productimage=" "
                        price={data.attributes.field_clinical_price}
                        productId={data.attributes.field_clinical_id}
                      />
                           </div> 
                     )) : "" :""}
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
                fluid (quality: 100){
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
                      fluid (quality: 100){
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
                      fluid (quality: 100){
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
                      fluid (quality: 100){
                        ...GatsbyImageSharpFluid
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
                      fluid (quality: 100){
                        ...GatsbyImageSharpFluid
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
                      fluid (quality: 100){
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
                      fluid (quality: 100){
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
                      fluid (quality: 100){
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
                      fluid (quality: 100){
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
                      fluid (quality: 100){
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
