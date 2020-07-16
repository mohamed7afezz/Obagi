import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import { getProductParagraph } from "../components/paragraphs-helper";

import ProductHero from '../components/product-components/product-hero';

const ProductPage = ({data}) => {

    const paragraphs = data.nodeClinicalProduct.relationships.paragraphs.map(getProductParagraph);

    return (
        <Layout>
            <ProductHero node={data.nodeClinicalProduct} />
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
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                            fixed(width: 587) {
                                ...GatsbyImageSharpFixed
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
                }
            }
            
        }
    }
`;