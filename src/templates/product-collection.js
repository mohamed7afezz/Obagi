import React, { useContext } from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/layout';
// import SEO from '../components/seo';
import CollectionHero from '../components/collection-components/collection-hero'
import CollectionFooter from '../components/collection-components/collection-footer'
import CollectionProducts from '../components/collection-components/collectoin-products-list'
import TempContext from '../providers/latestview-provider';
// import { getParagraph } from '../components/paragraphs-helper';

const ClinicalCollectionTemp = props  => {
    // const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
    console.log('propsing',props)

   
    return (
        <TempContext.Consumer>
            {(value) => {
                console.log('bahi', value);
                
                return (
                    <Layout nodeType={props.pageContext.nodetype} menuType="absolute">
                        {
                            props.data.taxonomyTermClinicalSkinConcern.relationships.field_hero_paraprapgh_taxonomy?   
                                <CollectionHero node={props.data}/>
                                :
                                ""
                        }
                        {
                            props.data.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product?  
                                <CollectionProducts node={props.data}/>
                                :
                                ""
                        }
                        <CollectionFooter node={props.data} blockName={props.data.taxonomyTermClinicalSkinConcern.name}/>
                    </Layout>
                )
            }}
            
        </TempContext.Consumer>
    )
}
export default ClinicalCollectionTemp
export const productPageQuery = graphql`
    query($slug: String!) {
        taxonomyTermClinicalSkinConcern(fields: { slug: { eq: $slug } }) {
            name
            ...collectionhero
            ...collectionproducts
            field_taxonomy_footer {
                settings {
                  label
                }
            }
        },
        
    }
`;