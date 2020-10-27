import React from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import CollectionHero from '../components/collection-components/collection-hero'
import CollectionFooter from '../components/collection-components/collection-footer'
import CollectionProducts from '../components/collection-components/collectoin-products-list'

// import { getParagraph } from '../components/paragraphs-helper';

const ClinicalCollectionTemp = props  => {
    // const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
  
    
    return (
      <Layout nodeType={props.pageContext.checktaxonomyType} menuType="absolute">
        {/* <SEO title={props.nodePage.field_meta_tags && props.nodePage.field_meta_tags.title? props.nodePage.field_meta_tags.title : ""} description={props.nodePage.field_meta_tags && props.nodePage.field_meta_tags.description? props.nodePage.field_meta_tags.description : ""}/> */}

        <CollectionHero node={props} collectionUrl={props.pageContext.collectionUrl} collectionName={props.pageContext.collectionName} nodetype={props.pageContext.nodetype} checktaxonomyType={props.pageContext.checktaxonomyType}/>                                   
        <CollectionProducts node={props} nodetype={props.pageContext.nodetype} checktaxonomyType={props.pageContext.checktaxonomyType}/>
        <CollectionFooter node={props.data} nodetype={props.pageContext.nodetype} blockName={props.data} checktaxonomyType={props.pageContext.checktaxonomyType}/>
      </Layout>
    )
}
export default ClinicalCollectionTemp
export const productPageQuery = graphql`
    query($slug: String!) {
      nodePage(fields: { slug: { eq: $slug } }) {
        id
        field_meta_tags {
            description
            keywords
            title
        }
      }
    

        taxonomyTermClinicalSkinConcern(fields: { slug: { eq: $slug } }) {
            name
            ...collectionhero
            ...collectionproducts
            relationships {
              field_footer_two_section{
                relationships {
                  field_service_card {
                    field_service_name {
                      processed
                    }
                    relationships {
                      field_service_image {
                        localFile {
                          childImageSharp {
                            fluid (quality: 100) {
                              ...GatsbyImageSharpFluid
                            } original{
                              src
                            }
                          }
                        }
                      }
                    }
                    field_service_title {
                      processed
                    }
                    field_service_description {
                      processed
                    }
                    field_se {
                      title
                      uri
                    }
                  }
                }
              }
              node__clinical_product {
            relationships {
              field_clinical_ingredients {
                name
              }
            }
          }
        }
            field_taxonomy_footer {
                settings {
                  label
                }
            }
        },
        taxonomyTermClinicalCategories(path: {alias: {eq: $slug}}) {
            name
            id
            relationships {
              field_footer_two_section_cat {
        relationships {
          field_service_card {
            field_service_name {
              processed
            }
            relationships {
              field_service_image {
                localFile {
                  childImageSharp {
                    fluid (quality: 100) {
                      ...GatsbyImageSharpFluid
                    } original{
                      src
                    }
                  }
                }
              }
            }
            field_service_title {
              processed
            }
            field_service_description {
              processed
            }
            field_se {
              title
              uri
            }
          }
        }
      }
                node__clinical_product {     
                    field_clinical_id   
                    field_clinical_description {
                      processed
                    }
                    path {
                      alias
                    } 
                    field_clinical_price
                    title
                    relationships {
                      field_clinical_ingredients {
                        name
                      }
                        field_clinical_components {
                          ... on paragraph__ingredient {
                            
                           relationships {
                            field_read_more {
                              field_read_more_content {
                                processed
                              }
                            }
                          }
                         }
                       }
                      
                      field_clinical_image {
                        localFile {
                          childImageSharp {
                            fluid (quality: 100){
                              ...GatsbyImageSharpFluid
                            } original{
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                field_hero_categories_taxonomy {
                field_taxonomy_hero_para_title
                field_taxonomy_hero_para_descrip {
                  processed
                }
                field_taxonomy_hero_paraprapgh_t
                relationships {
                  field_taxonomy_hero_paraprapgh_i {
                    localFile {
                      childImageSharp {
                        fluid (quality: 100){
                            ...GatsbyImageSharpFluid
                        } original{
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
            field_taxonomy_footer_category {
                settings {
                  label
                }
            }
        },   
           taxonomyTermClinicalIngredients(path: {alias: {eq: $slug}}) {
          name
          id
          relationships {
      

              node__clinical_product {     
                  field_clinical_id   
                  field_clinical_description {
                    processed
                  }
                  path {
                    alias
                  } 
                  field_clinical_price
                  title
                  relationships {
                    field_clinical_ingredients {
                      name
                    }
                      field_clinical_components {
                        ... on paragraph__ingredient {
                          
                         relationships {
                          field_read_more {
                            field_read_more_content {
                              processed
                            }
                          }
                        }
                       }
                     }
                    
                    field_clinical_image {
                      localFile {
                        childImageSharp {
                          fluid (quality: 100){
                            ...GatsbyImageSharpFluid
                          } original{
                            src
                          }
                        }
                      }
                    }
                  }
                }
               field_hero_ingredients_taxonomy {
              field_taxonomy_hero_para_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              field_taxonomy_hero_paraprapgh_t
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100){
                          ...GatsbyImageSharpFluid
                      } original{
                        src
                      }
                    }
                  }
                }
              }
            }
          }
          field_taxonomy_ingredient_footer {
              settings {
                label
              }
          }
      },
        taxonomyTermMedicalSkinConcern(path: {alias: {eq: $slug}}) {
            name
          
            relationships {
              
                node__medical_product {
                  field_medical_premier_points
                  field_medical_premier_points_id
                  field_medical_is_system
                  field_medical_id
                    field_medical_description {
                      processed
                    }
                    path {
                      alias
                    } 
                    
                    field_medical_price
                    title
                    relationships {
                      field_medical_ingredients {
                        name
                      }
                      field_medical_components {
                        ... on paragraph__ingredient {
                          id
                          relationships {
                            field_read_more {
                              field_read_more_content {
                                processed
                              }
                            }
                          }
                        }
                      }
                      field_medical_rx {
                        name
                      }
                      field_medical_image {
                        localFile {
                          childImageSharp {
                            fluid (quality: 100){
                                ...GatsbyImageSharpFluid
                            } original{
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                field_hero_taxonomy {
                  field_taxonomy_hero_para_title
                  field_taxonomy_hero_para_descrip {
                    processed
                  }
                  field_taxonomy_hero_paraprapgh_t
                  relationships {
                    field_taxonomy_hero_paraprapgh_i {
                      localFile {
                        childImageSharp {
                          fluid (quality: 100){
                              ...GatsbyImageSharpFluid
                          } original{
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            field_taxonomy_footer_medical {
                settings {
                  label
                }
            }
      },
      
      taxonomyTermMedicalIngredients(path: {alias: {eq: $slug}}) {
        name
       
        relationships {
          field_footer_two_section_med_ing{
            relationships {
              field_service_card {
                field_service_name {
                  processed
                }
                relationships {
                  field_service_image {
                    localFile {
                      childImageSharp {
                        fluid (quality: 100) {
                          ...GatsbyImageSharpFluid
                        } original{
                          src
                        }
                      }
                    }
                  }
                }
                field_service_title {
                  processed
                }
                field_service_description {
                  processed
                }
                field_se {
                  title
                  uri
                }
              }
            }
          }
            node__medical_product {
              field_medical_premier_points
              field_medical_premier_points_id
              field_medical_is_system
              field_medical_id
                field_medical_description {
                  processed
                }
                path {
                  alias
                } 
                field_medical_price
                title
                relationships {
                  field_medical_ingredients {
                    name
                  }
                  field_medical_components {
                    ... on paragraph__ingredient {
                      id
                      relationships {
                        field_read_more {
                          field_read_more_content {
                            processed
                          }
                        }
                      }
                    }
                  }
                  field_medical_rx {
                    name
                  }
                  field_medical_image {
                    localFile {
                      childImageSharp {
                        fluid (quality: 100){
                            ...GatsbyImageSharpFluid
                        } original{
                          src
                        }
                      }
                    }
                  }
                }
              }
              field_hero_clinical_ing_taxonomy {
              field_taxonomy_hero_para_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              field_taxonomy_hero_paraprapgh_t
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100){
                          ...GatsbyImageSharpFluid
                      } original{
                        src
                      }
                    }
                  }
                }
              }
            }
          }
          field_taxonomy_ing_footer {
            settings {
              label
            }
        }
  },
      taxonomyTermMedicalSkinType(path: {alias: {eq: $slug}}) {
        name
      
        id
        path {
          alias
        }
        relationships {
          
              field_hero_parag_taxonomy {
                field_taxonomy_hero_para_title
                field_taxonomy_hero_paraprapgh_t
                field_taxonomy_hero_para_descrip {
                  processed
                }
                relationships {
                  field_taxonomy_hero_paraprapgh_i {
                    localFile {
                      childImageSharp {
                        fluid (quality: 100) {
                          ...GatsbyImageSharpFluid
                        } original{
                          src
                        }
                      }
                    }
                  }
                }
              }
          node__medical_product {
            field_medical_premier_points
            field_medical_premier_points_id
            title
            path {
              alias
            }
            relationships {
              field_medical_ingredients {
                name
              }
              field_medical_components {
                ... on paragraph__ingredient {
                  relationships {
                    field_read_more {
                      field_read_more_content {
                        processed
                      }
                    }
                  }
                }
              }
              field_medical_rx {
                name
              }
              field_medical_image {
                localFile {
                  childImageSharp {
                    fluid (quality: 100) {
                      ...GatsbyImageSharpFluid
                    } original{
                      src
                    }
                  }
                }
              }
            }
            field_medical_price
            field_medical_id
            field_medical_description {
              processed
            }
          }
        }
      },
         taxonomyTermMedicalCategories(path: {alias: {eq: $slug}}) {
            name
           
            relationships {
              
                node__medical_product {
                  field_medical_premier_points
                  field_medical_premier_points_id
                    field_medical_is_system
                    field_medical_id
                    field_medical_description {
                      processed
                    }
                    field_medical_price
                    title
                    path {
                      alias
                    }
                    relationships {
                      field_medical_ingredients {
                        name
                      }
                      field_medical_components {
                        ... on paragraph__ingredient {
                          id
                          relationships {
                            field_read_more {
                              field_read_more_content {
                                processed
                              }
                            }
                          }
                        }
                      }
                      field_medical_rx {
                        name
                      }
                      field_medical_image {
                        localFile {
                          childImageSharp {
                            fluid (quality: 100) {
                              ...GatsbyImageSharpFluid
                            } original{
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                field_hero_category_taxonomy {
                  field_taxonomy_hero_para_title
                  field_taxonomy_hero_para_descrip {
                    processed
                  }
                  field_taxonomy_hero_paraprapgh_t
                  relationships {
                    field_taxonomy_hero_paraprapgh_i {
                      localFile {
                        childImageSharp {
                          fluid (quality: 100) {
                            ...GatsbyImageSharpFluid
                          } original{
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            field_taxonomy_medical_footer {
                settings {
                  label
                }
            }
         },
         taxonomyTermClinicalSkinType(path: {alias: {eq: $slug}}) {
          name
          path {
            alias
          }
          field_taxonomy_footer_skin_type {
            settings {
              label
            }
          }
          relationships {
            field_footer_two_section_sk_type{

              relationships {
                field_service_card {
                  field_service_name {
                    processed
                  }
                  relationships {
                    field_service_image {
                      localFile {
                        childImageSharp {
                          fluid (quality: 100) {
                            ...GatsbyImageSharpFluid
                          } original{
                            src
                          }
                        }
                      }
                    }
                  }
                  field_service_title {
                    processed
                  }
                  field_service_description {
                    processed
                  }
                  field_se {
                    title
                    uri
                  }
                }
              }
            }
            field_hero_taxonomy_skintype {
              field_taxonomy_hero_paraprapgh_t
              field_taxonomy_hero_para_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                      original{
                        src
                      }
                    }
                  }
                }
              }
            }
            node__clinical_product {
              field_clinical_id
              field_clinical_description {
                processed
              }
              path {
                alias
              }
              field_clinical_price
              title
              relationships {
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      } original{
                        src
                      }
                    }
                  }
                }
                field_clinical_ingredients {
                  name
                }
                field_clinical_components {
                  
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
         taxonomyTermMedicalProductLines(path: {alias: {eq: $slug}}) {
          field_medical_pro_col_footer_mod {
            processed
          }
          relationships {
            
            field_hero_productline_taxonomy {
              field_taxonomy_hero_paraprapgh_t
              field_taxonomy_hero_para_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      } original{
                        src
                      }
                    }
                  }
                }
              }
            }
            node__medical_product {
              field_medical_premier_points
              field_medical_premier_points_id
              id
              field_medical_is_system
              field_medical_id
              field_medical_description {
                processed
              }
              field_medical_price
              title
              path {
                alias
              }
              relationships {
                field_medical_ingredients {
                  name
                }
                field_medical_components {
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
                field_medical_rx {
                  name
                }
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100){
                        ...GatsbyImageSharpFluid
                      } original{
                        src
                      }
                    }
                  }
                }
              }
            }
          }
          path {
            alias
          }
          name
          field_taxonomy_line_footer {
            settings {
              label
            }
          }
        },
        taxonomyTermClinicalGroups(path: {alias: {eq: $slug}}) {
          id
          name
          path {
            alias
          }
          relationships {

      

            node__clinical_product {
              field_clinical_id
              field_clinical_description {
                processed
              }
              path {
                alias
              }
              field_clinical_price
              title
              relationships {
                field_clinical_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100){
                        ...GatsbyImageSharpFluid
                      } original{
                        src
                      }
                    }
                  }
                }
                field_clinical_ingredients {
                  name
                }
                field_clinical_components {
                  ... on paragraph__ingredient {
                    id
                    relationships {
                      field_read_more {
                        field_read_more_content {
                          processed
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
    }
`;