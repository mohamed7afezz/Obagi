import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import lineStyles from "../assets/scss/components/product-line.module.scss"
import productsuggestion from '../assets/scss/components/productsuggestion.module.scss'
import ProductCard from "../components/productcard"
const ProductLine = ({ node }) => {
  const [nav1, setNav1] = React.useState(null)
  const [nav2, setNav2] = React.useState(null)
  let slider1 = []
  let slider2 = []

  React.useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2])
  const SliderSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
    beforeChange: (current, next) => {
      let progressbar = document.querySelectorAll('.tab-slider .slick-dots li');

      progressbar.forEach((activeLi, index) => {

        if (index <= next) {
          activeLi.classList.add('slick-data-active')

        } else if (index > next) {
          progressbar[index].classList.remove('slick-data-active')

        }




      })

      let tabsstate = document
        .querySelectorAll(".line-tab ");
      let i = current;
      tabsstate.forEach((activetab, index) => {

        if (index == next) {
          activetab.classList.add('active')
        }
        else {
          activetab.classList.remove('active')
        }

      })
    },
  }

  const SliderSetting2 = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],

  }
  const TabSliderSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    arrows: false,
    dots: true,

    responsive: [
      {

        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          dots: true,
          arrows: false,
        },
      },
    ],

  }

  function slickGoToslide(e, int) {
    slider1.current.slickGoTo(int)

    addActiveClass(e)

    let progressbar = document.querySelectorAll('.tab-slider .slick-dots li');

    progressbar.forEach((activeLi, index) => {
      activeLi.classList.remove("slick-data-active")
    })

    progressbar.forEach((activeLi, index) => {

      if (index <= int) {
        activeLi.classList.add('slick-data-active')
      }

    })
  }
  function slickGoToslide(e, int) {
    slider1.slickGoTo(int)

    addActiveClass(e)

    let progressbar = document.querySelectorAll('.tab-slider .slick-dots li');

    progressbar.forEach((activeLi, index) => {
      activeLi.classList.remove("slick-data-active")
    })

    progressbar.forEach((activeLi, index) => {

      if (index <= int) {
        activeLi.classList.add('slick-data-active')
      }

    })
  }
  useEffect(() => {

    let progressbarContainer = document.querySelector('.tab-slider .slick-dots');
    progressbarContainer.innerHTML = "";
    document
      .querySelectorAll(".line-tab ")
      .forEach((Elem) => {
        progressbarContainer.innerHTML += '<li></li>';
      })
    document.querySelector('.tab-slider .slick-dots li:first-child').classList.add('slick-data-active')
  }, [])



  function addActiveClass(e) {

    document
      .querySelectorAll(".line-tab ")
      .forEach((Elem) => {
        Elem.classList.remove("active")
      })

    let active = e.target
    active.classList.add("active")
  }

  const data = useStaticQuery(graphql`
    query My {
      allTaxonomyTermMedicalProductLines (sort: {fields: weight, order: ASC}){
        edges {
          node {
            name
            field_product_lines_cta_title
            description {
              processed
            }
            path {
              alias
            }
            relationships {
              field_hero_productline_taxonomy {
                field_taxonomy_hero_para_descrip {
                  processed
                }
              }
              node__medical_product {
                title
                field_medical_price
                field_medical_id
                path {
                  alias
                }
                field_medical_description {
                  processed
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
                }
              }
            }
          }
        }
      }
      image: file(relativePath: { eq: "252x193.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  let systemName = data.allTaxonomyTermMedicalProductLines.edges.map((item, index) => {
    return (item.node.name)
  })


  // let productCount = 0
  // let taxonomy = data.allTaxonomyTermMedicalProductLines.edges.filter((item) => {
  //   return systemName.includes(item.node.name)
  // })[0]

  // productCount = taxonomy
  //   ? taxonomy.node.relationships.node__medical_product
  //     ? taxonomy.node.relationships.node__medical_product.length
  //     : 0
  //   : 0;


  


  return (
    <div className={[lineStyles.wrapper, "product-line"].join(" ")}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {node.field_product_line_title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: node.field_product_line_title.processed,
                }}
                className={lineStyles.wrapperTitle}
              ></div>
            ) : (
                ""
              )}
          </div>

          <div className={["col-lg-10", "offset-lg-1", "col-12"].join(" ")}>
            <div style={{ width: "100%" }}>
              <Slider
                asNavFor={nav2}
                ref={slider => (slider1 = slider)}
                {...TabSliderSetting}
                className="tab-slider"
              >
                {data.allTaxonomyTermMedicalProductLines.edges
                  ? data.allTaxonomyTermMedicalProductLines.edges.map((item, index) => {
                    return (
                    (item.node.name === "Obagi MEDICAL" || item.node.name === "Obagi MEDICAL Rx")? "" :

                    (  <div>
                        <div className="col-12 p-0">
                          <div className={lineStyles.tabWrapper}>
                            {item.node.name ? (
                              
                              (<div
                                onClick={(e) => slickGoToslide(e, index)}
                                className={[lineStyles.tab, "line-tab", index == 0 ? 'active' : ""].join(
                                  " "
                                )}
                              >{item.node.name}</div>)
                            ) : (
                                ""
                              )}
                          </div>
                        </div>
                      </div>)
                    )
                  })
                  : ""}
              </Slider>
            </div>
          </div>

          <div className={["col-lg-10", "col-12", "offset-lg-1", "pr-0", "pl-0"].join(" ")}>
            <div className={["col-12", "desk-pr-0", "desk-pl-0", "bigSliderContainer"].join(" ")}>
              <div style={{ width: "100%" }}>
                <Slider
                  {...SliderSetting}
                  asNavFor={nav1}
                  ref={slider => (slider2 = slider)}
                >
                  {data.allTaxonomyTermMedicalProductLines
                    ? data.allTaxonomyTermMedicalProductLines.edges.map((item, index) => {
                      
                      return (
                    (item.node.name === "Obagi MEDICAL" || item.node.name === "Obagi MEDICAL Rx")? "" :

           (             <div className={["row", lineStyles.sliderFlex].join(" ")}>
                          <div
                            className={["col-12", "col-lg-6", lineStyles.cardWrapper, "cardWrapper"].join(
                              " "
                            )}
                          >
                            <div
                              className={["subtitle", lineStyles.subtitle].join(" ")}
                            >FEATURED</div>

                            <div className={["offset-lg-2", "col-lg-8", "pr-0", "pl-0", lineStyles.leftSliderwapper].join(" ")}>
                              {item.node.name ? (
                               (item.node.name === "Obagi MEDICAL" || item.node.name === "Obagi MEDICAL Rx")? "" :
                              (
                                <div
                                  className={lineStyles.cardTitle}
                                >{item.node.name}</div>
                              )) : (
                                  ""
                                )}
                              <div className={lineStyles.products}>
                                PRODUCTS (
                            <span className={lineStyles.productsNo}>
                                  {item.node.relationships.node__medical_product ? item.node.relationships.node__medical_product.length : '0'}
                                </span>
                            )
                          </div>
                              <div
                                className={lineStyles.description}
                              >

                                { item.node.description ? <div dangerouslySetInnerHTML={{__html:item.node.description.processed}}></div> : ""}
                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae. */}
                            </div>

                              <div className={lineStyles.perfect}>
                                PERFECT FOR:{" "}
                                {/* {node.relationships.field_line_card.relationships.field_line_category.map(
                              (item, index, array) => {
                                return ( */}
                                <span className={lineStyles.category}>
                                  <Link to="#">Anti-Aging, </Link>
                                  <Link to="#"> Breakouts</Link>
                                  {/* {index === array.length - 1 ? "" : ", "} */}
                                </span>
                                {/* )
                              }
                            )} */}
                              </div>
                              {/* {node.relationships.field_line_card.relationships.field_line_image.localFile ? ( */}
                              <div className={lineStyles.imageWrapper}>
                                <Img
                                  fluid={
                                    data.image.childImageSharp.fluid
                                  }
                                />
                              </div>
                              {/* ) : (
                            ""
                          )} */}
                              {item.node.path.alias ? (
                                <div>
                                  <Link
                                    to={item.node.path.alias}
                                    className={[
                                      "button-link",
                                      lineStyles.link,
                                    ].join(" ")}
                                  >
                                    { item.node.field_product_lines_cta_title ? item.node.field_product_lines_cta_title : "Shop " + systemName[index] }
                                  </Link>
                                </div>
                              ) : (
                                  ""
                                )}
                            </div>
                          </div>
                          <div
                            className={["col-lg-4", "col-12", "offset-lg-1", lineStyles.productInlineSlider, "productInlineSlider"].join(" ")}
                          >
                            {/* <div className="product-slider-pager">{ '0/' + (item.node.relationships.node__medical_product? item.node.relationships.node__medical_product.length : '0')}</div> */}
                            <div className={[productsuggestion.slickcon, "pt-45"].join(" ")}>
                              <Slider   {...SliderSetting2}>
                                {item.node.relationships.node__medical_product
                                  ? item.node.relationships.node__medical_product.map(
                                    (item, index) => {
                                      return (
                                        <div
                                          className={[
                                            "col-12",
                                            productsuggestion.allcon,
                                          ].join(" ")}
                                        >
                                          <ProductCard
                                            productLink={item.path.alias}
                                            producttitle={item.title}
                                            productdescription={{

                                              __html: item.field_medical_description?item.field_medical_description.processed:""                                            }}
                                            productimage={
                                              item.relationships.field_medical_image[0]
                                                ? (item.relationships.field_medical_image[0]
                                                  .localFile ? item.relationships.field_medical_image[0]
                                                    .localFile.childImageSharp.fluid : '')
                                                : ""
                                            }
                                            price={item.field_medical_price}
                                            rate="0"
                                            productId={item.field_medical_id}
                                          />
                                        </div>
                                      )
                                    }
                                  )
                                  : ""}
                              </Slider>
                            </div>
                          </div>
                        </div>)
                      )
                    })
                    : ""}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductLine

export const fragment = graphql`
  fragment paragraphProductLine on paragraph__product_line {
    field_product_line_title {
      processed
    }
    relationships {
      field_line_card {
        field_tab_title {
          processed
        }
        field_card_subtitle {
          processed
        }
        field_line_title {
          processed
        }
        field_line_description {
          processed
        }
        field_line_link {
          title
          uri
        }
        relationships {
          field_line_image {
            localFile {
              childImageSharp {
                fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }

          field_line_category {
            ... on taxonomy_term__clinical_categories {
              id
              name
              path {
                alias
              }
            }
            ... on taxonomy_term__clinical_skin_concern {
              id
              name
              path {
                alias
              }
            }
            ... on taxonomy_term__medical_categories {
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
        }
      }
    }
  }
`
