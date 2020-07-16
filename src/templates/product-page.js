import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import { getParagraph } from "../components/paragraphs-helper";

const ProductPage = () => {

    // const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);

    return (
        <Layout>
            {/* {paragraphs} */}
            <h1>Detailed Product page</h1>
        </Layout>
    )
}

export default ProductPage;

// export const productPageQuery = graphql`
//     query($slug: String!) {
//         nodeProducts(fields: { slug: { eq: $slug } }) {
            
//             relationships {
//                 paragraphs: field_paragraphs {
//                     type: __typename
//                     ...paragraphHomeHero
//                     ...paragraphFullHtmlContent
//                     ...paragraphSectionWithColoredBoxes
//                     ...paragraphSectionWithImageAndText
//                     ...paragraphImageLeftTextRight
//                     ...paragraphBigParagraph
//                     ...paragraphImagesBoxes
//                 }
//             }
            
//         }
//     }
// `;