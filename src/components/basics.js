import React from "react"
import $ from "jquery"
import { graphql, Link } from "gatsby"
import basicsStyles from "../assets/scss/components/basics.module.scss"
import ProductCard from "../components/productcard"
import Slider from "react-slick"

const Basics = ({ node }) => {

  // console.log("basics", node)
  Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});


  const cardsProducts = node.relationships.field_basics_product_card.map(card => {
    let newCard = card.relationships.field_card_products_category?card.relationships.field_card_products_category.map(cat => {
      let products = [];
      for (const key in cat.relationships) {
        if (cat.relationships[key]) {
          products = cat.relationships[key];
        }
      }
      return products
    }):""

    return newCard.flat()
  });
  // console.log('bahiii', cardsProducts)


  function checkDataCondition(condition, data) {
    if (condition) {
      return data;
    } else {
      return '';
    }
  }
  const SliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.05,
          dots: false,
          arrows: false,
        },
      },
    ],
  }

  return (
    <div className={basicsStyles.containerWrapper}>
      <div className="container-fluid basics-paragraph">
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
            {node.field_basics_header ? (
              <div
                className={basicsStyles.title}
                dangerouslySetInnerHTML={{
                  __html: node.field_basics_header.processed,
                }}
              ></div>
            ) : (
                ""
              )}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 offset-lg-3">
            {node.field_basics_subtitle ? (
              <div
                className={basicsStyles.subtitle}
                dangerouslySetInnerHTML={{
                  __html: node.field_basics_subtitle.processed,
                }}
              ></div>
            ) : (
                ""
              )}
          </div>
        </div>

        <div>
          {node.relationships && node.relationships.field_basics_product_card
            ? node.relationships.field_basics_product_card.map(
              (item, index) => {
                return (
                  item.field_untouchable_fields === false ?
                    (
                      <div className={["row", basicsStyles.rowWrapper].join(" ")}>
                        <div
                          className={[
                            "col-12 col-lg-10 offset-lg-1",
                            basicsStyles.colWrapper,
                          ].join(" ")}
                        >
                          <div className="row  m-0">
                            <div
                              className={index % 2? "col-12 col-lg-6 " + basicsStyles.wrapper + " " + basicsStyles.blueEven : "col-12 col-lg-6 " + basicsStyles.wrapper}
                            >
                              <div className={["col-12 col-lg-8 offset-lg-2", basicsStyles.colPadding].join(" ")}>
                                <div className={basicsStyles.cardWrapper}>
                                  {item.field_basics_card_title ? (
                                    <div
                                      className={basicsStyles.pTitle}
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.field_basics_card_title.processed,
                                      }}
                                    ></div>
                                  ) : (
                                      ""
                                    )}
                                  <div className={basicsStyles.productsSection}>
                                    {item.field_basics_products_field ? (
                                      <div
                                        className={basicsStyles.pField}
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.field_basics_products_field
                                              .processed,
                                        }}
                                      ></div>
                                    ) : (
                                        ""
                                      )}
                                    {item.field_view_all_field ? (
                                      <Link to="#">
                                        <div
                                          className={basicsStyles.vaField}
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.field_view_all_field.processed,
                                          }}
                                        ></div>
                                      </Link>
                                    ) : (
                                        ""
                                      )}
                                  </div>
                                  {item.field_basics_card_description ? (
                                    <div
                                      className={basicsStyles.pDesc}
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.field_basics_card_description
                                            .processed,
                                      }}
                                    ></div>
                                  ) : (
                                      ""
                                    )}
                                  {item.relationships &&
                                    item.relationships.field_card_skin_concerns ? (
                                      <div className={basicsStyles.perfect}>
                                        <span className={basicsStyles.catTitle}>
                                          Perfect for: 
                                    </span>
                                        <span>
                                          {item.relationships.field_card_skin_concerns.map(
                                            (it, index) => {
                                              return (
                                                <>
                                                {index === 1? " " : ""}
                                                  <Link to={it.path.alias}>
                                                    {it.name}
                                                  </Link>
                                                  {index ===
                                                    item.relationships
                                                      .field_card_skin_concerns
                                                      .length -
                                                    1
                                                    ? ""
                                                    : ", "}
                                                </>
                                              )
                                            }
                                          )}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  {item.field_basics_card_title ? (
                                    <Link
                                      to="#"
                                      className={basicsStyles.shopLink}
                                    >
                                      Shop
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.field_basics_card_title
                                              .processed,
                                        }}
                                      ></div>
                                    </Link>
                                  ) : (
                                      ""
                                    )}
                                </div>
                              </div>
                            </div>
                            {/* Start of slider  */}
                            <div
                              className={index % 2? "col-12 col-lg-6 " + basicsStyles.whiteWrapper + " " + basicsStyles.evenSection : "col-12 col-lg-6 " + basicsStyles.whiteWrapper}
                            >
                              <div
                                className={[
                                  "col-12 col-lg-8 offset-lg-2",
                                  basicsStyles.colWrapper,
                                ].join(" ")}
                              >
                                <div className={[basicsStyles.sliderWrapper, "basicsProductWrapper"].join(" ")}>
                                  <Slider {...SliderSettings}>
                                    {cardsProducts[index].map((prod, ind, array) => (
                                      <>
                                      <ProductCard
                                        producttitle={prod.title ? prod.title : ""}
                                        productId={prod.field_medical_id ? prod.field_medical_id : prod.field_clinical_id ? prod.field_clinical_id : ""}
                                        price={prod.price ? prod.price : ""}
                                        rate="0"
                                        productdescription={prod.field_medical_description ? { __html: prod.field_medical_description.processed } : prod.field_clinical_description ? { __html: prod.field_clinical_description.processed } : ""}
                                        productLink={prod.path ? prod.path.alias : ""}
                                        productimage={prod.relationships &&
                                          prod.relationships.field_medical_image &&
                                          prod.relationships.field_medical_image[0].localFile &&
                                          prod.relationships.field_medical_image[0].localFile.childImageSharp ? prod.relationships.field_medical_image[0].localFile.childImageSharp.fluid
                                          :
                                          prod.relationships &&
                                            prod.relationships.field_clinical_image &&
                                            prod.relationships.field_clinical_image[0].localFile &&
                                            prod.relationships.field_clinical_image[0].localFile.childImageSharp ? prod.relationships.field_clinical_image[0].localFile.childImageSharp.fluid
                                            : ""}
                                      />
                                      <div className={basicsStyles.slideCounter}>{ind + 1 + "/" + array.length}</div>
                                      </>
                                    ))}
                                  </Slider>
                                </div>
                              </div>
                            </div>
                            {/* End of slider  */}
                          </div>

                          {item.field_has_colored_section &&
                            item.field_has_colored_section === true ? (
                              <div
                                className={index % 2 ? basicsStyles.yellowSection + " " + basicsStyles.yellowEven : basicsStyles.yellowSection}
                              ></div>
                            ) : (
                              ""
                            )}
                        </div>

                      </div>
                    )
                    : ""
                )
              }
            )
            : ""}
        </div>
      </div>
    </div>
  )
}

export default Basics

export const fragment = graphql`
  fragment paragraphBasics on paragraph__basics {
    id
    field_basics_header {
      processed
    }
    field_basics_subtitle {
      processed
    }
    relationships {
      field_basics_product_card {
        field_untouchable_fields
        field_basics_card_title {
          processed
        }
        field_basics_products_field {
          processed
        }
        field_view_all_field {
          processed
        }
        field_basics_card_description {
          processed
        }
        field_has_colored_section

        relationships {
          field_card_skin_concerns {
            ... on taxonomy_term__clinical_categories {
              id
              name
              path {
                alias
              }
            }
            ... on taxonomy_term__medical_skin_concern {
              id
              name
              path {
                alias
              }
            }
          }

          field_card_products_category {
            ... on taxonomy_term__clinical_categories {
              id
              name
              path {
                alias
              }
            }
            ... on taxonomy_term__clinical_groups {
              id
              name
              path {
                alias
              }
            }
            ... on taxonomy_term__medical_product_lines {
              id
              name
              path {
                alias
              }
            }
            ... on taxonomy_term__medical_rx_category {
              id
              name
            }
            ... on taxonomy_term__medical_skin_concern {
              id
              name
              path {
                alias
              }
            }
          }
          field_card_products_category {
            ... on taxonomy_term__clinical_categories {
              id
              name
              path {
                alias
              }
              relationships {
                node__clinical_product {
                  field_clinical_id
                  field_clinical_price
                  field_clinical_type
                  field_clinical_description {
                    processed
                  }
                  title
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
                }
              }
            }
            ... on taxonomy_term__clinical_groups {
              id
              name
              relationships {
                node__clinical_product {
                  field_clinical_id
                  field_clinical_price
                  field_clinical_type
                  path {
                    alias
                  }
                  field_clinical_description {
                    processed
                  }
                  title
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
                }
              }
            }
            ... on taxonomy_term__clinical_ingredients {
              id
              name
              relationships {
                node__clinical_product {
                  field_clinical_id
                  field_clinical_price
                  field_clinical_type
                  path {
                    alias
                  }
                  field_clinical_description {
                    processed
                  }
                  title
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
                }
              }
            }
            ... on taxonomy_term__clinical_skin_concern {
              id
              name
              relationships {
                node__clinical_product {
                  field_clinical_id
                  field_clinical_price
                  field_clinical_type
                  path {
                    alias
                  }
                  field_clinical_description {
                    processed
                  }
                  title
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
                }
              }
            }
            ... on taxonomy_term__clinical_skin_type {
              id
              name
              relationships {
                node__clinical_product {
                  field_clinical_id
                  field_clinical_price
                  field_clinical_type
                  path {
                    alias
                  }
                  field_clinical_description {
                    processed
                  }
                  title
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
                }
              }
            }
            ... on taxonomy_term__medical_categories {
              id
              name
              relationships {
                node__medical_product {
                  title
                  field_medical_id
                  field_medical_description {
                    processed
                  }
                  field_medical_price
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
            ... on taxonomy_term__medical_ingredients {
              id
              name
              relationships {
                node__medical_product {
                  title
                  field_medical_id
                  field_medical_description {
                    processed
                  }
                  field_medical_price
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
              relationships {
                node__medical_product {
                  title
                  field_medical_id
                  field_medical_description {
                    processed
                  }
                  field_medical_price
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
            ... on taxonomy_term__medical_rx_category {
              id
              name
              relationships {
                node__medical_product {
                  title
                  field_medical_id
                  field_medical_description {
                    processed
                  }
                  field_medical_price
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
            ... on taxonomy_term__medical_skin_concern {
              id
              name
              relationships {
                node__medical_product {
                  title
                  field_medical_id
                  field_medical_description {
                    processed
                  }
                  field_medical_price
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
            ... on taxonomy_term__medical_skin_type {
              id
              name
              relationships {
                node__medical_product {
                  title
                  field_medical_id
                  field_medical_description {
                    processed
                  }
                  field_medical_price
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
          }
        }
      }
    }
  }
`