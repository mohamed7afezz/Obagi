import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import reviewStyles from '../assets/scss/components/reviews.module.scss'
import Stars from './stars'
import ReviewBox from './review-box'
import ReviewModal from '../components/review-modal'
import WelcomeModal from '../components/welcome-modal'
const Reviews = ({ node , nodeType}) => {
  
  let data = node.relationships.node__clinical_product ? node.relationships.node__clinical_product : node.relationships.node__medical_product



 let productId = data[0].field_clinical_id? data[0].field_clinical_id :data[0].field_medical_id
 let productname= data[0].title
 let productpath = data[0].path.alias
 let productimg = data[0].relationships.field_clinical_image
 ?data[0].relationships.field_clinical_image[0]?data[0].relationships.field_clinical_image[0].localFile.childImageSharp.original.src:""
 :data[0].relationships.field_medical_image[0]?data[0].relationships.field_medical_image[0].localFile.childImageSharp.original.src:""
 
 
 if ( typeof window !== "undefined"){
  window.bvDCC = {
  
    catalogData: {
    
    locale: "en_US",
    
    catalogProducts: [{
    
    "productId" : `${productId}`,
    
    "productName" : `${productname}`,
    
    

    "productImageURL": `${productimg}`,
    
    //ex. https:\\site.com\pub\media\mh02-black_main.jpg
    
    "productPageURL":`${productpath}`,
    
      
    //ex: https:\\mywebsite.com\teton-pullover-hoodie.html
    
    "brandName" : "Obagi",
    
    "upcs" : ["724742001735","724742006907"],
    
    "inactive": false, //default
    
    "family": "Product Lines"
    
    }]
    
    }
    
    };
    
    window.bvCallback = function (BV) {
    
    BV.pixel.trackEvent("CatalogUpdate", {
    
    type: 'Product',
    
    locale: window.bvDCC.catalogData.locale,
    
    catalogProducts: window.bvDCC.catalogData.catalogProducts
    
    });
    
    };
  }
 
 return (


    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={["col-12", "col-lg-10", "offset-lg-1"].join(" ")}>
          <div className={reviewStyles.wrapper}>
            <div className={reviewStyles.title}>Product Reviews</div>

            <div className="d-none">
              <div className={reviewStyles.noReviews}>Be the first to review this product!</div>
            </div>
            
            <div data-bv-show="reviews" data-bv-product-id={productId}></div>

            {/* <ReviewBox />
            <ReviewModal />
            <WelcomeModal /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reviews;

export const fragment = graphql`
    fragment reviewsParagraph on paragraph__reviews {
      id
      field_review_title {
        processed
      }
      relationships {
        node__medical_product {
          field_medical_id
          path {
            alias
          }
          title
          relationships {
            field_medical_image {
              localFile {
                childImageSharp {
                  original {
                    src
                  }
                }
              }
            }
          }
        }
        
      }
    }
`;

// export const fragment = graphql`
//     fragment reviewsParagraph on paragraph__reviews {
//       id
//       field_review_title {
//         processed
//       }
//       relationships {
//         node__medical_product {
//           field_medical_id
//           path {
//             alias
//           }
//           title
//           relationships {
//             field_medical_image {
//               localFile {
//                 childImageSharp {
//                   original {
//                     src
//                   }
//                 }
//               }
//             }
//           }
//         }
//         node__clinical_product {
//           path {
//             alias
//           }
//           field_clinical_id
//           title
//           relationships {
//             field_clinical_image {
//               localFile {
//                 childImageSharp {
//                   original {
//                     src
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
// `;