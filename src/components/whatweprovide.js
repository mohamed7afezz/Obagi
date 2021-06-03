import React, { useContext,useEffect } from "react"
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"

import sectionStyle from "../assets/scss/components/products-we-provide.module.scss"
import productsliststyle from "../assets/scss/components/collection-list.module.scss"
import {checkStock} from '../assets/js/stock';
import ProductCard from './productcard'

const baseUrl = process.env.Base_URL;
const WhatWeProvide = ({ node }) => {
  useEffect(() => {
    if(typeof window != undefined ){
      checkStock(baseUrl);
    }
  }, [])
  return (
    <div className={sectionStyle.sectionCon}>
      <div className={["container-fluid productsWeProvide"].join(" ")}>
        <div className={["row "]}>
          <div className="col-12 col-lg-8 offset-lg-2 ">
            <div className={sectionStyle.titleCon}>
              <div dangerouslySetInnerHTML={{ __html: node.field_title_part_one.processed }} className={sectionStyle.rightColTitle}>
              </div>
              <div dangerouslySetInnerHTML={{ __html: node.field_title_part_two.processed }} className={sectionStyle.rightColTitle}>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: node.field_what_we_provide_header.processed }} className={sectionStyle.sectionheader}></div>
            </div>
          </div>
          <div className={sectionStyle.ProductsCon}>
            <div 
            
            className={[
              "d-flex products-list",
              productsliststyle.CollectionListcontainer,
              sectionStyle.mobwrap
            ].join(" ")}
            >
              {
                node.relationships.field_products_we_provide.map((item, index) => (
                  <div className="col-12 col-md-4 col-lg-3">

                      <ProductCard
                        productLink={item.path.alias}
                      producttitle={item.title}
                      productdescription={{__html:item.field_medical_description.processed}}
                      productimage={ item.relationships.field_medical_image &&  item.relationships.field_medical_image[0].localFile? item.relationships.field_medical_image[0].localFile.childImageSharp.fluid : ""}
                      price={item.field_medical_price}
                      productId={item.field_medical_id}
                      isrx={item.relationships.field_medical_rx?item.relationships.field_medical_rx.name :""}
                      premierid={item.field_medical_premier_points_id?item.field_medical_premier_points_id:""}
                       feild_preimer={item.field_medical_premier_points?item.field_medical_premier_points:""}
                       Sku={item.field_medical_sku?item.field_medical_sku:""}
                       minQuantity={item.field_min_quantity? item.field_min_quantity : ""}
                       productCat="medical"
                    />
                  </div>
                ))
              }
            </div>
          </div>
       
      </div>
    </div>

  )
}

export default WhatWeProvide;
export const fragment = graphql`
  fragment paragraphProductsWeProvide on paragraph__products_we_provide{
   
      field_title_part_one {
        processed
      }
      field_title_part_two {
        processed
      }
      field_what_we_provide_header {
        processed
      }
      relationships {
        field_products_we_provide {
          title
          field_medical_price
          field_medical_id
          field_medical_sku
          field_min_quantity
          field_medical_premier_points_id
          field_medical_description {
            processed
          }
          path {
            alias
          }
          relationships {
            field_medical_rx {
              name
            }
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
 
`;