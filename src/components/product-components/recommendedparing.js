import React from 'react'
import ProductCard from "../../components/productcard"
import recommendedparing from '../../assets/scss/components/recommendedparing.module.scss'
import ProductStyles from '../../assets/scss/components/product-hero.module.scss'
import Slider from "react-slick";

const Recommendedparing = ({ node }) => {
  if (node.parent_field_name === 'field_medical_components') {
    var checkCardType 
  }
  
  const settings = {

    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 1.05,
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
        <div className={recommendedparing.recommendedparingtitle}>{node.field_product_type}</div>
        <p className={recommendedparing.recommendedparingdesc}>{node.field_product_description}</p>
        <p className={recommendedparing.recommendedparingsec}><span>{node.field_question}</span> {node.field_product_inform}</p>
      </div>
      {node.parent_field_name === 'field_medical_components'?
         
         <div className={["col-12", "col-lg-7", "offset-lg-1", recommendedparing.recommendedparingrightcol, "recommendedparingrightcol"].join(" ")}>
         <div className={[recommendedparing.parseing, "col-lg-6", "offset-lg-3"].join(" ")}>
 
           <Slider {...settings}>
             {
               node.relationships.field_croduct_card.map((item, index) => (
                 <div className={["col-12", recommendedparing.allcon].join(" ")}>
 
                   <ProductCard 
                    productLink={item.path.alias}
                    producttitle={item.title}
                    productdescription={{ __html: item.field_medical_description?item.field_medical_description.processed:"" }} 
                    productimage={item.relationships.field_medical_image[0].localFile.childImageSharp.fluid} 
                    price={item.field_medical_price} 
                    productId={item.field_medical_id} rate="5"
                    premierid={item.field_medical_premier_points_id?item.field_medical_premier_points_id:""}
                    feild_preimer={item.field_medical_premier_points?item.field_medical_premier_points:""}
                    Sku={item.field_medical_sku?item.field_medical_sku:"" }
                    minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0)? item.field_min_quantity : ""}
                    productCat="medical"
                    />
 
                 </div>
               ))
             }
 
           </Slider>
           </div>
           </div>
     : 
      <div className={["col-12", "col-lg-7", "offset-lg-1", recommendedparing.recommendedparingrightcol, "recommendedparingrightcol"].join(" ")}>
        <div className={[recommendedparing.parseing, "col-lg-6", "offset-lg-3"].join(" ")}>

          <Slider {...settings}>
            {
              node.relationships.field_croduct_card.map((item, index) => (
                <div className={["col-12", recommendedparing.allcon].join(" ")}>

                  <ProductCard  productLink={item.path.alias} producttitle={item.title} productdescription={{ __html: item.field_clinical_description?item.field_clinical_description.processed:"" }} productimage={item.relationships.field_clinical_image[index].localFile? item.relationships.field_clinical_image[index].localFile.childImageSharp.fluid : ''} productCat="medical" price={item.field_clinical_price} Sku={item.field_clinical_sku} minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0)? item.field_min_quantity : ""} productId={item.field_clinical_id} rate="5" />

                </div>
              ))
            }

          </Slider>
        </div>
      </div>
}
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
        relationships {
          field_croduct_card {
            ... on node__clinical_product {
              id
              field_clinical_id
              title
              path {
                alias
              }
              field_clinical_price
              field_clinical_sku
              field_min_quantity
              field_clinical_description {
                processed
              }
              relationships {
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
        field_section_title
        field_question
        field_product_type
        field_product_inform
        field_product_description
        parent_field_name
  
}
fragment recommendedMedicalParingParagrapgh on paragraph__recomended_paring {
  
          id
          parent_field_name
          field_section_title
          field_question
          field_product_type
          field_product_inform
          field_product_description
          relationships {
            field_croduct_card {
              ... on node__medical_product {
                id
               field_medical_premier_points_id
               field_medical_sku
               field_min_quantity
               field_medical_premier_points
                field_medical_id
                path {
                  alias
                }
                fields {
                  slug
                }
                title
                field_medical_price
                relationships {
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
                field_medical_description {
                  processed
                }
              }
            }
          }
        }
 
`;
