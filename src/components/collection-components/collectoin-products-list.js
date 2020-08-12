import React, { useEffect } from "react"
import { graphql } from "gatsby"
import ProductCard from "../../components/productcard"
import productsliststyle from "../../assets/scss/components/collection-list.module.scss"

const Collectionproducts = ({ node, nodetype }) => {
  
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
  }else if (pageNodeType == "clnicalGroups"){
    checkTaxonomy =
   node.data.taxonomyTermClinicalGroups.relationships
      .node__clinical_product 
  }else if(pageNodeType == 'medicalLine'){
    console.log('hassan',node) 
    checkTaxonomy =
    node.data.taxonomyTermMedicalProductLines.relationships
       .node__medical_product
       
  } else {
    checkTaxonomy = node
  }
  function checkProductExisitance(product) {
   
    return products.some(item => product.path.alias == item.path.alias)
  }
  useEffect(() => {
    const isotope = require("isotope-layout")
    const filterValSelect = document.getElementById("product-filter")
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
      filter: item => {
        const filterVal =
          filterValSelect.options[filterValSelect.selectedIndex].value
        if (filterVal === "All" || filterVal == undefined) {
          return true
        }
        return item
          .getElementsByClassName("ingredient")[0]
          .innerText.includes(filterVal)
      },
      transitionDuration: 0,
      sortBy: "price",
      sortAscending: sortAsc,
    })

    //update view on sort on page load
    updateSortView()

    //filter
    filterValSelect.addEventListener("change", function (event) {
      sortAsc =
        sortPriceSelect.options[sortPriceSelect.selectedIndex].value === "low"
          ? true
          : false
      isoGrid.arrange({ sortBy: "price", sortAscending: sortAsc })
      updateSortView()
    })
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
      ].join(" ")}
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
          <label className={productsliststyle.filter}>Filter by:</label>
          <select id="product-filter" name="filter by">
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
        <div
          className={[
            "col-12",
            "col-lg-2",
            productsliststyle.Collectionfilter,
            "Collectionfilter",
          ].join(" ")}
        >
          <label className={productsliststyle.filter}>Sort by:</label>
          <select class="filters-select sort-price" name="sort by">
            <option value="low" selected>
              Price :Low - High
            </option>
            <option value="high">Price :High - Low</option>
          </select>
        </div>
      </div>
      <div
        className={[
          "row products-list",
          productsliststyle.CollectionListcontainer,
        ].join(" ")}
      >
        {checkTaxonomy &&
        (pageNodeType.includes("clinicalConcern") ||
          pageNodeType.includes("clinicalCategories") ||
          pageNodeType.includes("medicalConcern") ||
          pageNodeType.includes("medicalCategories") ||
          pageNodeType.includes("clnicalGroups")) ||
          pageNodeType.includes("medicalLine")
          ? checkTaxonomy.map((item, index) => {
              let ingredient = ""
              if (pageNodeType == "clinicalConcern" || pageNodeType == "clinicalCategories" || pageNodeType == "clnicalGroups") {
                ingredient = item.relationships.field_clinical_components.filter(
                  comp => {
                    return comp.__typename == "paragraph__ingredient"
                  }
                )[0].relationships.field_read_more[0].field_read_more_content
                  .processed
              }

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
                        />
                      ) : pageNodeType == "clnicalGroups" ? ( <ProductCard
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
                            />
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
                          />
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
  fragment vocabularySkinConcerList on paragraph__vocabularies {
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
        ... on taxonomy_term__medical_categories {
          id
          name
          path {
            alias
          }
          relationships {
            node__medical_product {
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
              field_medical_description {
                processed
              }
              field_medical_price
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
              field_medical_description {
                processed
              }
              field_medical_price
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
