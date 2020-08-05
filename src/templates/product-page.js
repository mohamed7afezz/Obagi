import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

import { getProductParagraph } from "../components/paragraphs-helper";

import ProductHero from '../components/product-components/product-hero';
import ViewedProductsContext from '../providers/latestview-provider';

const ProductPage = props => {
    let data = props.data;
    console.log("hafezz",props)
    const nodeType = props.pageContext.nodetype;
    const product = nodeType === 'clinical'? data.nodeClinicalProduct : data.nodeMedicalProduct;
    const storageName = nodeType === 'clinical'? 'clinicalViewedProducts' : 'medicalViewedProducts';

    const paragraphs = nodeType === 'clinical'?
    data.nodeClinicalProduct.relationships.paragraphs.map(getProductParagraph) : data.nodeMedicalProduct.relationships.paragraphs.map(getProductParagraph);
    
    const viewedProducts = useContext(ViewedProductsContext);
    viewedProducts.updateProductsViewedStorage(storageName, nodeType, product);

   return (
     <ViewedProductsContext.Consumer>
       {(value) => {
         return (
           <Layout nodeType={nodeType} menuType="relative">
             <ProductHero data={data} nodeType={nodeType} />
             {paragraphs}
           </Layout>
         )
       }}
     </ViewedProductsContext.Consumer>
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
                           fluid {
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
                    ...needToKnowParagrapgh
                    ...recommendedParingParagrapgh
                    ...youMightAlsoLikeParagrapgh
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
            field_medical_form_list
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
                    ...recommendedMedicalParingParagrapgh
                    ...youMightAlsoLikeMedicalParagrapgh
                }
            }
            
        }
    }
`;