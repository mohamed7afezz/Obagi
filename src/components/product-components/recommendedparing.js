import React from 'react'
import ProductCard from "../../components/productcard"
import recommendedparing from '../../assets/scss/components/recommendedparing.module.scss'
import ProductStyles from '../../assets/scss/components/product-hero.module.scss'
import Slider from "react-slick";

const Recommendedparing = ({ node }) => {
  console.log('recommended', node)
  var settings = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        }
      },
    ]
  };
  return (
    <div className={["container-fluid", recommendedparing.recommendedcon, "recommendedcon"].join(" ")} >
      <div className={["row", recommendedparing.ordering].join(" ")}>
        <div className={["col-12", "col-lg-12", recommendedparing.allcontainer].join(" ")}>
          <div class="row">
            <div className={["col-12", "col-lg-3", "offset-lg-1", recommendedparing.recommendedparingLeftcol].join(" ")}>
              <p className={ProductStyles.productcat}>{node.field_section_title}</p>
              <h1 className={recommendedparing.recommendedparingtitle}>{node.field_product_type}</h1>
              <p className={recommendedparing.recommendedparingdesc}>{node.field_product_description}</p>
              <p className={recommendedparing.recommendedparingsec}><span>{node.field_question}</span> {node.field_product_inform}</p>
            </div>
            <div className={["col-12", "col-lg-7", "offset-lg-1", recommendedparing.recommendedparingrightcol, "recommendedparingrightcol"].join(" ")}>
              <div className={[recommendedparing.parseing, "col-lg-6", "offset-lg-3"].join(" ")}>

                <Slider {...settings}>
                  {
                    node.relationships.field_croduct_card.map((item, index) => (
                      <div className={["col-12", recommendedparing.allcon].join(" ")}>

                        <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[index].localFile.childImageSharp.fluid} price={item.field_clinical_price} rate="5" />

                      </div>
                    ))
                  }

                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Recommendedparing;

export const fragment = graphql`
    fragment recommendedParingParagrapgh on paragraph__recomended_paring {
      id
      field_product_description
      field_product_inform
      field_product_type
      field_question
      field_section_title
      relationships {
          field_croduct_card {
              id
              title
              field_clinical_price
              field_clinical_description {
                processed
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
            }
          }
    }
`;