import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import { getProductParagraph } from "../components/paragraphs-helper";

import ProductHero from '../components/product-components/product-hero';

const ProductPage = props => {
    let data = props.data;
    const paragraphs = props.pageContext.nodetype== "clinical"?
    data.nodeClinicalProduct.relationships.paragraphs.map(getProductParagraph) : data.nodeMedicalProduct.relationships.paragraphs.map(getProductParagraph);

   return (
       <Layout customClass={props.pageContext.nodetype}>
           <ProductHero data={data} nodeType={props.pageContext.nodetype} />
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
            field_clinical_description {
                processed
            }
            relationships {
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
                }
            }
            
        },
        nodeMedicalProduct(fields: { slug: { eq: $slug } }) {
            title
            field_medical_price
            field_medical_upc
            field_medical_id
            field_medical_type
            field_medical_weight
            field_medical_description {
                processed
            }
            relationships {
                field_medical_skin_concern {
                    name
                    path {
                        alias
                    }
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
                    ...recommendedParingParagrapgh
                    ...youMightAlsoLikeParagrapgh
                }
            }
            
        }
    }
`;