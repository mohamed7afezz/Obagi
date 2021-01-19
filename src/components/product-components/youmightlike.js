import React from "react"
import productsuggestion from "../../assets/scss/components/productsuggestion.module.scss"
import ProductCard from "../../components/productcard"
import Slider from "react-slick"
import { useStaticQuery, graphql } from "gatsby"
const YouMayLike = ({key, node }) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  }
console.log('hassan1',node)

  return (
    <div
      className={[
        "container-fluid",
        productsuggestion.productsuggestioncon,
        "productsuggestioncon",
      ].join(" ")}
    >
      <h1 className={productsuggestion.productsuggestionhead}>
            {node.field_you_might_title}
      </h1>
      <div className={["row", productsuggestion.ordering,'equalheight'].join(" ")}>
          {node.parent_field_name == 'field_medical_components'?
        <div className={productsuggestion.slickcon}>
        <Slider {...settings}>
            {
              node.relationships.field_product_card.map((item, index) => (
                <div className={["col-12", productsuggestion.allcon].join(" ")}>
                    
                  <ProductCard
                  productLink={item.path.alias}
                  producttitle={item.title} 
                  productdescription={{__html: item.field_medical_description?item.field_medical_description.processed:"" }}
                  productimage={item.relationships.field_medical_image[0].localFile.childImageSharp.fluid}
                  price={item.field_medical_price} rate="5" 
                  premierid={item.field_medical_premier_points_id?item.field_medical_premier_points_id:""}
                  feild_preimer={item.field_medical_premier_points?item.field_medical_premier_points:""}
                  Sku={item.field_medical_sku?item.field_medical_sku:"" }
                  />

                </div>
              ))
            }

          </Slider>
        </div>
        :
          <div className={productsuggestion.slickcon}>
         <Slider {...settings}>
           {
             node.relationships.field_product_card.map((item, index) => (
               <div className={["col-12", productsuggestion.allcon].join(" ")}>
                    
                 <ProductCard productLink={item.path.alias} 
                 producttitle={item.title} 
                 productdescription={{ __html: item.field_clinical_description?item.field_clinical_description.processed:"" }} 
                 productimage={(item.relationships.field_clinical_image[0] &&item.relationships.field_clinical_image[0].localFile)? item.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : ''} 
                 Sku={item.field_medical_sku}
                 price={item.field_clinical_price}
                 rate="5" />

               </div>
             ))
           }

         </Slider>
       </div>
        }
      </div>
    </div>
  )
}
export default YouMayLike
export const fragment = graphql`
fragment youMightAlsoLikeParagrapgh on paragraph__you_might_also_like {
    id
    parent_field_name
    field_you_might_title
    relationships {
      field_product_card {
        ... on node__clinical_product {
          id
          title
          field_clinical_price
          field_clinical_sku
          path {
            alias
          }
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
  }
fragment youMightAlsoLikeMedicalParagrapgh on paragraph__you_might_also_like {
    id
    parent_field_name
    field_you_might_title  
    relationships {
      field_product_card {
        ... on node__medical_product {
          title
          field_medical_id
          field_medical_premier_points
          field_medical_sku
          field_medical_premier_points_id
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
`;