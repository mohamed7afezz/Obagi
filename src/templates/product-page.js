import React, { useContext, useEffect , useState} from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';


import { getProductParagraph } from "../components/paragraphs-helper";

import ProductHero from '../components/product-components/product-hero';
import ViewedProductsContext from '../providers/latestview-provider';

const ProductPage = props => {
  

    let data = props.data;
    const nodeType = props.pageContext.nodetype;
    const product = nodeType === 'clinical' ? data.nodeClinicalProduct : data.nodeMedicalProduct;
    const storageName = nodeType === 'clinical' ? 'clinicalViewedProducts' : 'medicalViewedProducts';
    const paragraphs = nodeType === 'clinical' ?
        data.nodeClinicalProduct.relationships.paragraphs.map(getProductParagraph) : data.nodeMedicalProduct.relationships.paragraphs.map(getProductParagraph);

    const { updateProductsViewedStorage } = useContext(ViewedProductsContext);
    updateProductsViewedStorage(storageName, nodeType, product);
    let seo = product.path? product.path.alias : props.location.pathname?props.location.pathname:"";
    // let seo1 = seo?seo.split('.com'):""
    return (
        <Layout nodeType={nodeType} menuType="relative">
            <SEO canonical={seo}
                title={product.field_clinical_metatags && product.field_clinical_metatags.title ? product.field_clinical_metatags.title
                    : product.field_medical_metatags && product.field_medical_metatags.title ? product.field_medical_metatags.title : ""}

                description={product.field_clinical_metatags && product.field_clinical_metatags.description ? product.field_clinical_metatags.description
                    : product.field_medical_metatags && product.field_medical_metatags.description ? product.field_medical_metatags.description : ""}

                ogTitle={product.field_clinical_metatags && product.field_clinical_metatags.title ? product.field_clinical_metatags.title
                    : product.field_medical_metatags && product.field_medical_metatags.title ? product.field_medical_metatags.title : ""}

                ogDescription={product.field_clinical_metatags && product.field_clinical_metatags.description ? product.field_clinical_metatags.description
                    : product.field_medical_metatags && product.field_medical_metatags.description ? product.field_medical_metatags.description : ""}

                metaImage={(product.relationships && product.relationships.field_clinical_image && product.relationships.field_clinical_image[0] && product.relationships.field_clinical_image[0].localFile) ? product.relationships.field_clinical_image[0].localFile.url
                    : (product.relationships && product.relationships.field_medical_image && product.relationships.field_medical_image[0] && product.relationships.field_medical_image[0].localFile) ? product.relationships.field_medical_image[0].localFile.url : ""}

            />

            <div itemscope="" itemtype="https://schema.org/Product">
                <ProductHero data={data} nodeType={nodeType}  />
                {paragraphs}
                {/*Review widget BV */
            
                data.nodeMedicalProduct?
                data.nodeMedicalProduct.relationships?
                data.nodeMedicalProduct.relationships.field_medical_rx?
                data.nodeMedicalProduct.relationships.field_medical_rx.name === "RX"? ""
                :<div class="container-fluid"><div class="row"><div class="offset-md-1 col-md-10">
                <div data-bv-show="reviews" data-bv-product-id={nodeType === 'clinical' ?
                 data.nodeClinicalProduct.field_clinical_id : data.nodeMedicalProduct.field_medical_id}>

                 </div>
            </div></div></div>
                : <div class="container-fluid"><div class="row"><div class="offset-md-1 col-md-10">
                <div data-bv-show="reviews" data-bv-product-id={nodeType === 'clinical' ?
                 data.nodeClinicalProduct.field_clinical_id : data.nodeMedicalProduct.field_medical_id}>

                 </div>
            </div></div></div>
                :
                <div class="container-fluid"><div class="row"><div class="offset-md-1 col-md-10">
                <div data-bv-show="reviews" data-bv-product-id={nodeType === 'clinical' ?
                 data.nodeClinicalProduct.field_clinical_id : data.nodeMedicalProduct.field_medical_id}>

                 </div>
            </div></div></div>
                :
                <div class="container-fluid"><div class="row"><div class="offset-md-1 col-md-10">
                <div data-bv-show="reviews" data-bv-product-id={nodeType === 'clinical' ?
                 data.nodeClinicalProduct.field_clinical_id : data.nodeMedicalProduct.field_medical_id}>

                 </div>
            </div></div></div>
               
           /*Review widget BV*/}
            </div>
        </Layout>
    )
}

export default ProductPage;

export const productPageQuery = graphql`
    query($slug: String!) {
        nodeClinicalProduct(fields: { slug: { eq: $slug } }) {
            title
            field_clinical_metatags {
                description
                title
                og_title
                og_description
                og_image
              }
            field_clinical_price
            field_clinical_sku
            field_clinical_weight_unit
            field_clinical_upc
            field_clinical_id
            field_clinical_medical_type
            field_clinical_weight
            path {
                alias
              }
            field_clinical_description {
                processed
            }
            
            relationships {
                field_key_benefits_list {
                    relationships {
                      field_key_benefits_lists {
                        field_list_item
                      }
                    }
                  }
                field_clinical_skin_concern {
                    name
                    path {
                        alias
                    }
                }

                field_clinical_image {
                    uri {
                        url
                    }
                    localFile {
                        url
                        childImageSharp {
                        original {
                                src
                           }
                           fluid (quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                        }
                    }
                }
                field_clinical_skin_type {
                    name
                    path {
                        alias
                    }
                }

                paragraphs: field_clinical_components {
                    type: __typename
                    ...detailsSafeParagraph
                    ...ingredientParagraph
                    ...howToUseParagraph
                    ...beforeAfterParagraph
                    
                    ...recommendedParingParagrapgh
                    
                }
            }
            
        },
        nodeMedicalProduct(fields: { slug: { eq: $slug } }) {
            title
            field_medical_metatags {
                description
                title
                og_title
                og_description
                og_image
            }
            field_medical_premier_points
            field_medical_sku
            field_medical_price
            field_medical_upc
            field_medical_info
            field_medical_id
            field_medical_type
            field_medical_weight
            field_medical_weight_unit
            field_medical_key_benefits
            field_medical_premier_points_id
            field_medical_form_list
            field_medical_description_sub
            path {
                alias
              }
            field_medical_description {
                processed
            }
            relationships {
                field_medical_benefits_lists {
                    relationships {
                      field_key_benefits_lists {
                        field_list_item
                      }
                    }
                  }
                field_medical_skin_concern {
                    name
                    path {
                        alias
                    }
                    
                }
                field_medical_rx {
                    name
                  }
                field_medical_image {
                    uri {
                        url
                    }
                    localFile {
                        url
                        childImageSharp {
                        original {
                                src
                           }
                        }
                    }
                }
                field_medical_skin_type {
                    name
                    path {
                        alias
                    }
                }

                paragraphs: field_medical_components {
                    type: __typename
                    ...detailsSafeParagraph
                    ...ingredientParagraph
                    ...howToUseParagraph
                    ...beforeAfterParagraph
                    ...needToKnowParagrapgh
                    ...sysRelatedProduct
                    ...youMightAlsoLikeMedicalParagrapgh
                   
                }
            }
            
        }
    }
`;