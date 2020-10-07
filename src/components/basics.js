import React from 'react'
import $ from 'jquery'
import { graphql, Link } from 'gatsby'
import basicsStyles from '../assets/scss/components/basics.module.scss'
import ProductCard from "../components/productcard"
import Slider from "react-slick"

const Basics = ({ node }) => {

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
          dots: true,
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
            {node.field_basics_header ? <div className={basicsStyles.title} dangerouslySetInnerHTML={{ __html: node.field_basics_header.processed }}></div> : ""}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 offset-lg-3">
            {node.field_basics_subtitle ? <div className={basicsStyles.subtitle} dangerouslySetInnerHTML={{ __html: node.field_basics_subtitle.processed }}></div> : ""}
          </div>
        </div>
        

    <div>
    {node.relationships && node.relationships.field_basics_product_card ?
            node.relationships.field_basics_product_card.map((item, index) => {
              return (
                <div className={["row", basicsStyles.rowWrapper].join(" ")}>
                  <div className={["col-12 col-lg-10 offset-lg-1", basicsStyles.colWrapper].join(" ")}>

                    <div className="row">
                      <div className={["col-12 col-lg-6", basicsStyles.wrapper].join(" ")}>
                        <div className="col-12">
                          <div className={basicsStyles.cardWrapper}>
                            {item.field_basics_card_title ? <div className={basicsStyles.pTitle} dangerouslySetInnerHTML={{ __html: item.field_basics_card_title.processed }}></div> : ""}
                            <div className={basicsStyles.productsSection}>
                              {item.field_basics_products_field ? <div className={basicsStyles.pField} dangerouslySetInnerHTML={{ __html: item.field_basics_products_field.processed }}></div> : ""}
                              {item.field_view_all_field ? <Link to="#"><div className={basicsStyles.vaField} dangerouslySetInnerHTML={{ __html: item.field_view_all_field.processed }}></div></Link> : ""}
                            </div>
                            {item.field_basics_card_description ? <div className={basicsStyles.pDesc} dangerouslySetInnerHTML={{ __html: item.field_basics_card_description.processed }}></div> : ""}
                            {item.relationships && item.relationships.field_card_skin_concerns ?
                              <div className={basicsStyles.perfect}>
                                <span className={basicsStyles.catTitle}>Perfect for:</span>
                                <span>
                                  {item.relationships.field_card_skin_concerns.map((it, index) => {
                                    return <><Link to={it.path.alias}>{it.name}</Link>{index === item.relationships.field_card_skin_concerns.length - 1 ? '' : ', '}</>
                                  })}
                                </span>
                              </div>
                              : ""}
                            <Link to="#" className={basicsStyles.shopLink}>Shop <div dangerouslySetInnerHTML={{ __html: item.field_basics_card_title.processed }}></div></Link>
                            {item.field_has_colored_section && item.field_has_colored_section === true ? <div className={basicsStyles.yellowSection}></div> : ""}

                          </div>
                        </div>
                      </div>

                      <div className={["col-12 col-lg-6", basicsStyles.whiteWrapper].join(" ")}>
                        <div className={["col-12", basicsStyles.colWrapper].join(" ")}>
                          <div className={basicsStyles.sliderWrapper}>
                            <Slider {...SliderSettings}>
                              <ProductCard
                                productLink=""
                                producttitle="Product Name"
                                productdescription=""
                                price="97"
                                rate="0"
                                productId="393"

                              />
                            </Slider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
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
              }
            }
          }
    }
`;