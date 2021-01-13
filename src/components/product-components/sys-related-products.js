import { graphql } from 'gatsby'
import React from 'react'
import Slider from 'react-slick'
import ProductCard from '../productcard'

import compStyles from '../../assets/scss/components/sys-related-products.module.scss';

export default function SysRelatedProducts({node}) {
    const system = node.relationships.node__medical_product[0];
    const products = system.relationships.field_medical_system[0]?system.relationships.field_medical_system[0].relationships.node__medical_product.filter(prod => !(prod.field_medical_is_system)):[];
    const sliderSettings = {    
        slidesToShow: 2,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                },
            },
        ],
    }

    function checkDataCondition(condition, data) {
        if(condition) {
            return data;
        } else {
            return '';
        }
    }
//     checkloadedscript();
//     function checkloadedscript(){
// if (document.querySelector('.sysRelatedComp .slick-track')) {
//     slickheight()
// }else

// {
//     setTimeout(checkloadedscript,2000)  
// }
// }
//     function slickheight(){
//     if(typeof window !== "undefined") {
        
//         var stHeight = document.querySelector('.sysRelatedComp .slick-track').offsetHeight;
//         document.querySelector('.sysRelatedComp .slick-slide').style.minHeight=`${stHeight}px`
//         }
//     }
    return (
        <>
            {
                checkDataCondition((node.field_enabled && products.length > 0), (
                    <div className={`container-fluid ${compStyles.sysRelatedComp} sysRelatedComp`}>
                        <div className="row">
                            <div className="col">
                                <h2 className={`${compStyles.sysRelHeader}`}>
                                    Product Set Includes
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col offset-lg-2 col-lg-8">
                                <Slider {...sliderSettings}>            
                                    {
                                        checkDataCondition((products.length > 0), (
                                            products.map(prod => (
                                                <ProductCard 
                                                    key={prod.field_medical_id}
                                                    productId={prod.field_medical_id}
                                                    productLink={prod.path? prod.path.alias :''}
                                                    producttitle={prod.title? prod.title : ''}
                                                    isrx = {prod.relationships && prod.relationships.field_medical_rx? prod.relationships.field_medical_rx.name : "" }
                                                    productdescription={{
                                                        __html: prod.field_medical_description? prod.field_medical_description.processed : ''
                                                    }}
                                                    productimage={
                                                        prod?checkDataCondition((prod.relationships && 
                                                                prod.relationships.field_medical_image && 
                                                                prod.relationships.field_medical_image[0].localFile &&
                                                                prod.relationships.field_medical_image[0].localFile.childImageSharp
                                                            ), (
                                                            prod.relationships.field_medical_image[0].localFile.childImageSharp.fluid
                                                        )):""
                                                    }
                                                    Sku={prod.field_medical_sku?prod.field_medical_sku:"" }
                                                    price={prod.field_medical_price}
                                                    premierid={prod.field_medical_premier_points_id?prod.field_medical_premier_points_id:""}
                                                   feild_preimer={prod.field_medical_premier_points?prod.field_medical_premier_points:""}
                                                />
                                            ))
                                        ))
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

// fragment
export const fragment = graphql`
  fragment sysRelatedProduct on paragraph__sys_related_products {
    id
    field_enabled
    relationships {
      node__medical_product {
        title
        field_medical_is_system
        relationships {
          field_medical_system {
            field_product_system_id
            relationships {
              node__medical_product {
                title
                field_medical_is_system
                field_medical_id
                field_medical_premier_points
                field_medical_sku
              field_medical_premier_points_id
                path {
                  alias
                }
                field_medical_description {
                  processed
                }
                field_medical_price
                relationships {
                  field_medical_rx {
                    name
                  }
                  field_medical_image {
                    localFile {
                      childImageSharp {
                        fluid(quality: 100) {
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
`