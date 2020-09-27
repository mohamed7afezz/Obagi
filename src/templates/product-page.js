import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import { getProductParagraph } from "../components/paragraphs-helper";

import ProductHero from '../components/product-components/product-hero';
import ViewedProductsContext from '../providers/latestview-provider';

const ProductPage = props => {
    let data = props.data;
    const nodeType = props.pageContext.nodetype;
    const product = nodeType === 'clinical'? data.nodeClinicalProduct : data.nodeMedicalProduct;
    const storageName = nodeType === 'clinical'? 'clinicalViewedProducts' : 'medicalViewedProducts';

    const paragraphs = nodeType === 'clinical'?
    data.nodeClinicalProduct.relationships.paragraphs.map(getProductParagraph) : data.nodeMedicalProduct.relationships.paragraphs.map(getProductParagraph);
    
    const { updateProductsViewedStorage } = useContext(ViewedProductsContext);
    updateProductsViewedStorage(storageName, nodeType, product);

    return (
        <Layout nodeType={nodeType} menuType="relative">
          <ProductHero data={data} nodeType={nodeType} />
          {paragraphs}
        </Layout>
    )
}

export default ProductPage;

export const productPageQuery = graphql`
    query($slug: String!) {
        nodeClinicalProduct(fields: { slug: { eq: $slug } }) {
            title
            field_clinical_price
            
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
                    localFile {
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
            field_medical_premier_points
            field_medical_price
            field_medical_upc
            field_medical_info
            field_medical_id
            field_medical_type
            field_medical_weight
            field_medical_key_benefits
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
                    localFile {
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
                    ...reviewsParagraph
  
                }
            }
            
        }
    }
`;