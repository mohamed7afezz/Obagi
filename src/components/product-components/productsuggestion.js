import React, { useContext } from "react"
import productsuggestion from "../../assets/scss/components/productsuggestion.module.scss"
import ProductCard from "../../components/productcard"
import Slider from "react-slick"
import { useStaticQuery, graphql } from "gatsby"
import CartContext from "../../providers/cart-provider"
const ProductSuggestion = ({ node }) => {
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

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
  const data = useStaticQuery(graphql`
    query {
      cardimg: file(relativePath: { eq: "product-images/main-image.png" }) {
        childImageSharp {
          fluid (quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    
      professionalC: nodeMedicalProduct(field_medical_id: {eq: "349"}) {
        id
        field_medical_price
        field_medical_id
        title
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
  
      elastiderm: nodeMedicalProduct(field_medical_id: {eq: "373"}) {
        id
        field_medical_price
        field_medical_id
        title
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
  
      hydrate: nodeMedicalProduct(field_medical_id: {eq: "352"}) {
        id
        field_medical_price
        field_medical_id
        title
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
  
      cMicro: nodeMedicalProduct(field_medical_id: {eq: "356"}) {
        id
        field_medical_price
        field_medical_id
        title
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
  
      spf: nodeMedicalProduct(field_medical_id: {eq: "383"}) {
        id
        field_medical_price
        field_medical_id
        title
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
  
      product1: nodeClinicalProduct(field_clinical_id: {eq: "339"}) {
        id
        field_clinical_price
        field_clinical_id
        title
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
                fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                  }
              }
            }
          }
        }
      }
  
      product2: nodeClinicalProduct(field_clinical_id: {eq: "346"}) {
        id
        field_clinical_price
        field_clinical_id
        title
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
                fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                  }
              }
            }
          }
        }
      }
  
      product3: nodeClinicalProduct(field_clinical_id: {eq: "343"}) {
        id
        field_clinical_price
        field_clinical_id
        title
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
                fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                  }
              }
            }
          }
        }
      }
  
      product4: nodeClinicalProduct(field_clinical_id: {eq: "345"}) {
        id
        field_clinical_price
        field_clinical_id
        title
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
                fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                  }
              }
            }
          }
        }
      }
  
      product5: nodeClinicalProduct(field_clinical_id: {eq: "347"}) {
        id
        field_clinical_price
        field_clinical_id
        title
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
                fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                  }
              }
            }
          }
        }
      }
    }
  `);
  
  


  const { state } = useContext(CartContext);
  const { lineItems } = state.cart;

  let isClinical = true;
  function getRecommendedProducts(bag) {
    if(bag == undefined) {
      return [];
    }

    if(bag.length > 3) {
      return [];
    }

    let medicalList = [
      data.professionalC,
      data.elastiderm,
      data.hydrate,
      data.cMicro,
      data.spf
    ]
    let clinicalList = [
      data.product1,
      data.product2,
      data.product3,
      data.product4,
      data.product5
    ]

    let recommendedList = [];
    let tempList = [];
    
    // check if bag products are all clinical => recommended from clinical List 
    // if not recommended from medical List
    // choose top 2 from list which not in the bag

    for(let i = 0; i < bag.length; i++) {
      if(!bag[i].url.includes('clinical')) {
        isClinical = false;
        break;
      }
    }

    if(isClinical) {
      tempList = clinicalList.filter(item => bag.filter(product => product.product_id === parseInt(item.field_clinical_id)).length < 1);
    } else {
      tempList = medicalList.filter(item => bag.filter(product => product.product_id === parseInt(item.field_medical_id)).length < 1);
    }

    recommendedList = tempList;
    console.log('bahiiii', recommendedList);
    return recommendedList;
  }

  return (
    <div
      className={[
        "container-fluid",
        productsuggestion.productsuggestioncon,
        "productsuggestioncon",
      ].join(" ")}
    >
      <h1 className={productsuggestion.productsuggestionhead}>
        You might Also Like
      </h1>
      <div className={["row", productsuggestion.ordering].join(" ")}>
        <div className={`col-lg-8 offset-lg-2 ${productsuggestion.slickcon}`}>
        <Slider {...settings}>
          {
            getRecommendedProducts(lineItems.physical_items).length > 0? getRecommendedProducts(lineItems.physical_items).map(product => (
              <ProductCard
                producttitle={product.title}
                productId={isClinical? product.field_clinical_id : product.field_medical_id}
                productimage={isClinical ? ((product.relationships.field_clinical_image && product.relationships.field_clinical_image[0].localFile) ? product.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : '' ) : ((product.relationships.field_medical_image && product.relationships.field_medical_image[0].localFile) ? product.relationships.field_medical_image[0].localFile.childImageSharp.fluid : '')}
                price={isClinical ? (product.field_clinical_price? product.field_clinical_price : "") : (product.field_medical_price? product.field_medical_price : "")}
                // productdescription={isClinical ? (product.field_clinical_description? {__html: product.field_clinical_description.processed} : "") : (product.field_medical_description? {__html: product.field_medical_description.processed} : "")}
              />
            )) : ''
          }
        </Slider>
        </div>
      </div>
    </div>
  )
}
export default ProductSuggestion
