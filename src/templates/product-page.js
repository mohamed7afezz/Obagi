import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

import { getProductParagraph } from "../components/paragraphs-helper";

import ProductHero from '../components/product-components/product-hero';
import TempContext from '../providers/latestview-provider';

const ProductPage = props => {
    let data = props.data;
    console.log("hafezz",props)
    const paragraphs = props.pageContext.nodetype== "clinical"?
    data.nodeClinicalProduct.relationships.paragraphs.map(getProductParagraph) : data.nodeMedicalProduct.relationships.paragraphs.map(getProductParagraph);
  //  localStorage.setItem(JSON.stringify(props.data.nodeClinicalProduct.title), JSON.stringify(props.path));
  
  if (localStorage.getItem("hassan1") === null){
let i =[{title:props.data.nodeClinicalProduct.title,
                describe:props.data.nodeClinicalProduct.field_clinical_description.processed,
                Image:props.data.nodeClinicalProduct.relationships.field_clinical_image[0].localFile.childImageSharp.fluid,
                price:props.data.nodeClinicalProduct.field_clinical_price,  
        }]
    localStorage.setItem("hassan1", JSON.stringify(i));
  }
  else{
    let x =JSON.parse( localStorage.getItem("hassan1"));
    
  
        if (x.some(item => item.title !== props.data.nodeClinicalProduct.title)) {             
        
           x.push({title:props.data.nodeClinicalProduct.title,
                describe:props.data.nodeClinicalProduct.field_clinical_description.processed,
                Image:props.data.nodeClinicalProduct.relationships.field_clinical_image[0].localFile.childImageSharp.fluid,
                price:props.data.nodeClinicalProduct.field_clinical_price,  
                
        })
        localStorage.setItem("hassan1", JSON.stringify(x));
        
    }
}
   return (
     <TempContext.Consumer>
       {(value) => {
         console.log("bahi", value)
         console.log("localData", data)
         return (
           <Layout nodeType={props.pageContext.nodetype} menuType="relative">
             <ProductHero data={data} nodeType={props.pageContext.nodetype} />
             {paragraphs}
           </Layout>
         )
       }}
     </TempContext.Consumer>
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
                    ...recommendedParingParagrapgh
                    ...youMightAlsoLikeParagrapgh
                }
            }
            
        }
    }
`;