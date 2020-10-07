import { graphql } from 'gatsby'
import React from 'react'
import Slider from 'react-slick'
import ProductCard from '../productcard'

import compStyles from '../../assets/scss/components/sys-related-products.module.scss';

export default function SysRelatedProducts({node}) {
    const system = node.relationships.node__medical_product[0];
    const products = system.relationships.field_medical_product_lines.relationships.node__medical_product.filter(prod => !(prod.field_medical_is_system));

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

    return (
        <>
            {
                checkDataCondition(node.field_enabled, (
                    <div className={`container-fluid ${compStyles.sysRelatedComp}`}>
                        <div className="row">
                            <div className="col">
                                <h2 className={`${compStyles.sysRelHeader}`}>
                                    {system.title}
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Slider {...sliderSettings}>            
                                    {
                                        checkDataCondition((products.length > 0), (
                                            products.map(prod => (
                                                <ProductCard 
                                                    key={prod.field_medical_id}
                                                    productId={prod.field_medical_id}
                                                    productLink={prod.path? prod.path.alias :''}
                                                    producttitle={prod.title? prod.title : ''}
                                                    productdescription={{
                                                        __html: prod.field_medical_description? prod.field_medical_description.processed : ''
                                                    }}
                                                    productimage={
                                                        checkDataCondition((prod.relationships && 
                                                                prod.relationships.field_medical_image && 
                                                                prod.relationships.field_medical_image[0].localFile &&
                                                                prod.relationships.field_medical_image[0].localFile.childImageSharp
                                                            ), (
                                                            prod.relationships.field_medical_image[0].localFile.childImageSharp.fluid
                                                        ))
                                                    }
                                                    price={prod.field_medical_price}
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
              field_medical_product_lines {
                name
                field_medical_product_lines_id
                relationships {
                  node__medical_product {
                    title
                    field_medical_is_system
                    field_medical_id
                    path {
                      alias
                    }
                    field_medical_description {
                      processed
                    }
                    field_medical_price
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
        }
    }
`;