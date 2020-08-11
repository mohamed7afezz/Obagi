import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import lineStyles from "../assets/scss/components/product-line.module.scss"
import productsuggestion from '../assets/scss/components/productsuggestion.module.scss'
import ProductCard from "../components/productcard"
const ProductLine = ({ node }) => {
  const [state, setState] = useState({
    nav1: null,
    nav2: null,
  })

  const slider1 = useRef()
  const slider2 = useRef()

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    })
  }, [])

  const { nav1, nav2 } = state

  const HeroSettings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    afterChange: () =>
      this.setState(state => ({ updateCount: state.updateCount + 1 })),
    beforeChange: (current, next) => this.setState({ slideIndex: next }),
  }
  const SliderSetting1= {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  }
  const SliderSetting = {
    infinite: true,
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
  }
  const TabSliderSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1.5,
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
  }

  function slickGoToslide(int) {
    slider1.current.slickGoTo(int)
  }

  function addActiveClass(e) {
    document
      .querySelectorAll(".tab")
      .forEach(Elem => Elem.classList.remove("active"))
    let active = e.target
    active.classList.add("active")
  }

  const data = useStaticQuery(graphql`
    query My {
      allTaxonomyTermMedicalProductLines {
        edges {
          node {
            name
            path {
              alias
            }
            relationships {
              node__medical_product {
                path {
                  alias
                }
              }
            }
          }
        }
      }
    }
  `)

  let currentName = node.relationships.field_line_card.map(item => {
    return item.field_line_title
  })
  let productCount = 0
  let taxonomy = data.allTaxonomyTermMedicalProductLines.edges.filter(item => {
    return currentName.includes(item.node.name.split(" ")[0])
  })[0]

  productCount = taxonomy
    ? taxonomy.node.relationships.node__medical_product
      ? taxonomy.node.relationships.node__medical_product.length
      : 0
    : 0

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

          <div style={{ width: "100%" }}>
            <Slider
              ref={slider => (slider1.current = slider)}
              {...TabSliderSetting}
              className="tab-slider"
            >
              {node.relationships.field_line_card
                ? node.relationships.field_line_card.map((item, index) => {
                    return (
                      <div>
                        <div className="col-12 p-0">
                          <div className={lineStyles.tabWrapper}>
                            {item.field_tab_title ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.field_tab_title.processed,
                                }}
                                onClick={() => slickGoToslide(index)}
                                className={[lineStyles.tab, "line-tab"].join(
                                  " "
                                )}
                              ></div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                : ""}
            </Slider>
          </div>
        
            <div className={["col-10","offset-lg-1","row"].join(" ")}>
                <div className={["col-md-6","col-12"].join(" ")}>
                    <div style={{ width: "100%" }}>
                        <Slider
                        ref={slider => (slider1.current = slider)}
                        {...SliderSetting1}
                        >
                        {node.relationships.field_line_card
                            ? node.relationships.field_line_card.map((item, index) => {
                                return (
                                <div>
                                    <div
                                    className={[
                                        "col-12",
                                        lineStyles.cardWrapper,
                                    ].join(" ")}
                                    >
                                    {item.field_card_subtitle ? (
                                        <div
                                        dangerouslySetInnerHTML={{
                                            __html: item.field_card_subtitle.processed,
                                        }}
                                        className="subtitle"
                                        ></div>
                                    ) : (
                                        ""
                                    )}
                                    {item.field_line_title ? (
                                        <div
                                        dangerouslySetInnerHTML={{
                                            __html: item.field_line_title.processed,
                                        }}
                                        className={lineStyles.cardTitle}
                                        ></div>
                                    ) : (
                                        ""
                                    )}
                                    <div className={lineStyles.products}>
                                        PRODUCTS (
                                        <span className={lineStyles.productsNo}>
                                        {productCount}
                                        </span>
                                        )
                                    </div>
                                    {item.field_line_description ? (
                                        <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                            item.field_line_description.processed,
                                        }}
                                        className={lineStyles.description}
                                        ></div>
                                    ) : (
                                        ""
                                    )}
                                    <div className={lineStyles.perfect}>
                                        PERFECT FOR:{" "}
                                        {item.relationships.field_line_category.map(
                                        (item, index, array) => {
                                            return (
                                            <span className={lineStyles.category}>
                                                <Link to="#"> {item.name}</Link>
                                                {index === array.length - 1 ? "" : ", "}
                                            </span>
                                            )
                                        }
                                        )}
                                    </div>
                                    {item.relationships.field_line_image.localFile ? (
                                        <div className={lineStyles.imageWrapper}>
                                        <Img
                                            fluid={
                                            item.relationships.field_line_image
                                                .localFile.childImageSharp.fluid
                                            }
                                        />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {item.field_line_link ? (
                                        <div>
                                        <Link
                                            to={item.field_line_link.uri}
                                            className={[
                                            "button-link",
                                            lineStyles.link,
                                            ].join(" ")}
                                        >
                                            {item.field_line_link.title}
                                        </Link>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    </div>
                                </div>
                                )
                            })
                            : ""}
                        </Slider>
                    </div>
                </div>
                <div className={["col-md-4","col-12","offset-lg-1"].join(" ")}>
                <div className={ productsuggestion.slickcon}>
                     <Slider {...SliderSetting}>
                         {
                             node.relationships.field_line_card
                             ? node.relationships.field_line_card.map((item, index) => {
                                 return ( <div className={["col-12",  productsuggestion.allcon].join(" ")}>
                                 <ProductCard   producttitle={item.name}
                              productdescription={{
                                __html:
                                 node.field_product_line_title.processed,
                              }}
                              productimage={
                                item.relationships.field_line_image
                                .localFile.childImageSharp.fluid
                              }
                              price={item.name}
                              rate="0"/>
                                 </div>)
                         })
                         :
                         ""
                        }
           
                </Slider>
            </div>
                </div>   
            </div>
          </div>
    

        {/* <div className={[lineStyles.wrapper].join(" ")}>
                            <div onClick={() => slickGoToslide(0)} className="active">Nu-Derm®</div>
                            <div onClick={() => slickGoToslide(1)}>ELASTIderm®</div>
                            <div onClick={() => slickGoToslide(2)}>Hydrate®</div>
                            <div onClick={() => slickGoToslide(3)}>KeraPhine®</div>
                            <div onClick={() => slickGoToslide(4)}>Nu-Derm®</div>
                            <div onClick={() => slickGoToslide(5)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(6)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(7)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(8)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(9)}>Daily Hydro-Drops™</div>
                        </div>

                        <div className={lineStyles.progressBar}><div className={lineStyles.progress}></div></div> */}
      </div>
      {/* <div className="row">
                <div className="col-12">
                    <Slider ref={slider => (slider1.current = slider)} {...SliderSetting}>
                        <div className={lineStyles.blue}>Nu-Derm®</div>
                        <div className={lineStyles.green}>ELASTIderm®</div>
                        <div className={lineStyles.red}>Hydrate®</div>
                        <div className={lineStyles.black}>KeraPhine®</div>
                        <div className={lineStyles.purple}>Nu-Derm®</div>
                        <div className={lineStyles.pink}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.grey}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.beige}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.maroon}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.yellow}>Daily Hydro-Drops™</div>
                    </Slider>
                </div>
            </div> */}
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
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }

          field_line_category {
            ... on taxonomy_term__clinical_categories {
              id
              name
            }
            ... on taxonomy_term__clinical_skin_concern {
              id
              name
            }
            ... on taxonomy_term__medical_categories {
              id
              name
            }
            ... on taxonomy_term__medical_skin_concern {
              id
              name
            }
          }
        }
      }
    }
  }
`
