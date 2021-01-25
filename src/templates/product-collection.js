import React from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import CollectionHero from '../components/collection-components/collection-hero'
import CollectionFooter from '../components/collection-components/collection-footer'
import CollectionProducts from '../components/collection-components/collectoin-products-list'

// import { getParagraph } from '../components/paragraphs-helper';

const ClinicalCollectionTemp = (props, data)  => {
    // const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
  
    let medicalTaxMeta = props.data.taxonomyTermMedicalCategories && props.data.taxonomyTermMedicalCategories.field_medical_cat_meta_tags? props.data.taxonomyTermMedicalCategories.field_medical_cat_meta_tags
                    : props.data.taxonomyTermMedicalProductLines && props.data.taxonomyTermMedicalProductLines.field_medical_prod_lines_meta_ta? props.data.taxonomyTermMedicalProductLines.field_medical_prod_lines_meta_ta
                    : props.data.taxonomyTermMedicalSkinConcern && props.data.taxonomyTermMedicalSkinConcern.field_medicla_skin_con_meta_tags? props.data.taxonomyTermMedicalSkinConcern.field_medicla_skin_con_meta_tags
                    : props.data.taxonomyTermMedicalSkinType && props.data.taxonomyTermMedicalSkinType.field_medical_skin_type_meta_tag? props.data.taxonomyTermMedicalSkinType.field_medical_skin_type_meta_tag
                    : props.data.taxonomyTermClinicalGroups && props.data.taxonomyTermClinicalGroups.field_clinical_groups_meta_tags? props.data.taxonomyTermClinicalGroups.field_clinical_groups_meta_tags
                    : props.data.taxonomyTermClinicalIngredients && props.data.taxonomyTermClinicalIngredients.field_meta_tag? props.data.taxonomyTermClinicalIngredients.field_meta_tag
                    : props.data.taxonomyTermMedicalIngredients && props.data.taxonomyTermMedicalIngredients.field_medical_ingr_meta_tags? props.data.taxonomyTermMedicalIngredients.field_medical_ingr_meta_tags
                    : "";

    let metaTagImage = props.data.taxonomyTermMedicalCategories && props.data.taxonomyTermMedicalCategories.relationships && props.data.taxonomyTermMedicalCategories.relationships.field_hero_category_taxonomy && props.data.taxonomyTermMedicalCategories.relationships.field_hero_category_taxonomy.relationships &&  props.data.taxonomyTermMedicalCategories.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermMedicalCategories.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermMedicalCategories.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermMedicalIngredients && props.data.taxonomyTermMedicalIngredients.relationships && props.data.taxonomyTermMedicalIngredients.relationships.field_hero_clinical_ing_taxonomy && props.data.taxonomyTermMedicalIngredients.relationships.field_hero_clinical_ing_taxonomy.relationships &&  props.data.taxonomyTermMedicalIngredients.relationships.field_hero_clinical_ing_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermMedicalIngredients.relationships.field_hero_clinical_ing_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermMedicalIngredients.relationships.field_hero_clinical_ing_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermMedicalProductLines && props.data.taxonomyTermMedicalProductLines.relationships && props.data.taxonomyTermMedicalProductLines.relationships.field_hero_productline_taxonomy && props.data.taxonomyTermMedicalProductLines.relationships.field_hero_productline_taxonomy.relationships &&  props.data.taxonomyTermMedicalProductLines.relationships.field_hero_productline_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermMedicalProductLines.relationships.field_hero_productline_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermMedicalProductLines.relationships.field_hero_productline_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    // :  props.data.taxonomyTermMedicalRxCategory && props.data.taxonomyTermMedicalRxCategory.relationships && props.data.taxonomyTermMedicalRxCategory.relationships.field_hero_category_taxonomy && props.data.taxonomyTermMedicalRxCategory.relationships.field_hero_category_taxonomy.relationships &&  props.data.taxonomyTermMedicalRxCategory.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermMedicalRxCategory.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermMedicalRxCategory.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermMedicalSkinConcern && props.data.taxonomyTermMedicalSkinConcern.relationships && props.data.taxonomyTermMedicalSkinConcern.relationships.field_hero_taxonomy && props.data.taxonomyTermMedicalSkinConcern.relationships.field_hero_taxonomy.relationships &&  props.data.taxonomyTermMedicalSkinConcern.relationships.field_hero_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermMedicalSkinConcern.relationships.field_hero_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermMedicalSkinConcern.relationships.field_hero_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermMedicalSkinType && props.data.taxonomyTermMedicalSkinType.relationships && props.data.taxonomyTermMedicalSkinType.relationships.field_hero_parag_taxonomy && props.data.taxonomyTermMedicalSkinType.relationships.field_hero_parag_taxonomy.relationships &&  props.data.taxonomyTermMedicalSkinType.relationships.field_hero_parag_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermMedicalSkinType.relationships.field_hero_parag_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermMedicalSkinType.relationships.field_hero_parag_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    // :  props.data.taxonomyTermProductSystem && props.data.taxonomyTermProductSystem.relationships && props.data.taxonomyTermProductSystem.relationships.field_hero_category_taxonomy && props.data.taxonomyTermProductSystem.relationships.field_hero_category_taxonomy.relationships &&  props.data.taxonomyTermProductSystem.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermProductSystem.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermProductSystem.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermClinicalCategories && props.data.taxonomyTermClinicalCategories.relationships && props.data.taxonomyTermClinicalCategories.relationships.field_hero_category_taxonomy && props.data.taxonomyTermClinicalCategories.relationships.field_hero_category_taxonomy.relationships &&  props.data.taxonomyTermClinicalCategories.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermClinicalCategories.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermClinicalCategories.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermClinicalGroups && props.data.taxonomyTermClinicalGroups.relationships && props.data.taxonomyTermClinicalGroups.relationships.field_taxonomy_hero && props.data.taxonomyTermClinicalGroups.relationships.field_taxonomy_hero.relationships &&  props.data.taxonomyTermClinicalGroups.relationships.field_taxonomy_hero.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermClinicalGroups.relationships.field_taxonomy_hero.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermClinicalGroups.relationships.field_taxonomy_hero.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermClinicalIngredients && props.data.taxonomyTermClinicalIngredients.relationships && props.data.taxonomyTermClinicalIngredients.relationships.field_hero_ingredients_taxonomy && props.data.taxonomyTermClinicalIngredients.relationships.field_hero_ingredients_taxonomy.relationships &&  props.data.taxonomyTermClinicalIngredients.relationships.field_hero_ingredients_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermClinicalIngredients.relationships.field_hero_ingredients_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermClinicalIngredients.relationships.field_hero_ingredients_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermClinicalSkinConcern && props.data.taxonomyTermClinicalSkinConcern.relationships && props.data.taxonomyTermClinicalSkinConcern.relationships.field_hero_category_taxonomy && props.data.taxonomyTermClinicalSkinConcern.relationships.field_hero_category_taxonomy.relationships &&  props.data.taxonomyTermClinicalSkinConcern.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermClinicalSkinConcern.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermClinicalSkinConcern.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    :  props.data.taxonomyTermClinicalSkinType && props.data.taxonomyTermClinicalSkinType.relationships && props.data.taxonomyTermClinicalSkinType.relationships.field_hero_category_taxonomy && props.data.taxonomyTermClinicalSkinType.relationships.field_hero_category_taxonomy.relationships &&  props.data.taxonomyTermClinicalSkinType.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i && props.data.taxonomyTermClinicalSkinType.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile? props.data.taxonomyTermClinicalSkinType.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
    : "";

    console.log("ashhh props", props.data)

    // let medicalProLi = props.data.tax
    let seo = props.location.href?props.location.href:"";
    let seo1 = seo?seo.split('.com'):""
    return (
      <Layout nodeType={props.pageContext.checktaxonomyType} menuType="absolute">
        <SEO canonical={medicalTaxMeta.canonical_url? 
        medicalTaxMeta.canonical_url : seo1[1]} title={medicalTaxMeta.title? medicalTaxMeta.title : ""} description={medicalTaxMeta.description? medicalTaxMeta.description : ""}
          ogTitle={medicalTaxMeta.title? medicalTaxMeta.title : ""} ogDescription={medicalTaxMeta.description? medicalTaxMeta.description : ""}
          metaImage = {metaTagImage}
        />

        <CollectionHero node={props} collectionUrl={props.pageContext.collectionUrl} collectionName={props.pageContext.collectionName} nodetype={props.pageContext.nodetype} checktaxonomyType={props.pageContext.checktaxonomyType}/>                                   
        <CollectionProducts node={props} nodetype={props.pageContext.nodetype} checktaxonomyType={props.pageContext.checktaxonomyType}/>
        <CollectionFooter node={props.data} nodetype={props.pageContext.nodetype} blockName={props.data} checktaxonomyType={props.pageContext.checktaxonomyType}/>
      </Layout>
    )
}
export default ClinicalCollectionTemp
export const productPageQuery = graphql`
    query($slug: String!) {
    

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
              field_clinical_skin_concern {
                name
              }
              field_clinical_skin_type {
                name
              }
              field_clinical_categories {
                name
              }
              field_clinical_groups {
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
                    field_clinical_sku
                    title
                    relationships {
                      field_clinical_ingredients {
                        name
                      }
                      field_clinical_skin_concern {
                        name
                      }
                      field_clinical_skin_type {
                        name
                      }
                      field_clinical_categories {
                        name
                      }
                      field_clinical_groups {
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
                  field_taxonomy_page_url
                  field_taxonomy_page_title
                field_taxonomy_hero_para_title
                field_taxonomy_hero_para_descrip {
                  processed
                }
                field_taxonomy_hero_paraprapgh_t
                relationships {
                  field_taxonomy_hero_paraprapgh_i {
                    localFile {
                      url
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
          field_meta_tag {
            title
            description
          }
          relationships {
            field_footer_two_section_cli_ing {
    
              id
                 field_featured_paragraph_id {
                   processed
                 }
                 field_featured_button {
                   title
                   uri
                 }
                 field_featured_description {
                   processed
                 }
                 field_featured_title {
                   processed
                 }
                 field_featured_perfect_title {
                   processed
                 }
                 field_featured_products_title {
                   processed
                 }
                 field_featured_subtitle {
                   processed
                 }
                 field_image_right
                 
                 relationships {
                   field_issues_categories {
                     path {
                       alias
                     }
                     ... on taxonomy_term__clinical_skin_concern {
                       id
                       name
                     }
                   }
                   field_featured_video {
                     field_video_link
                     relationships {
                       field_video_poster {
                         localFile {
                           childImageSharp {
                             fluid (quality: 100) {
                              src
                             }
                             original{
                               src
                             }
                           }
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
                  field_clinical_sku
                  title
                  relationships {
                    field_clinical_ingredients {
                      name
                    }
                    field_clinical_skin_concern {
                      name
                    }
                    field_clinical_skin_type {
                      name
                    }
                    field_clinical_categories {
                      name
                    }
                    field_clinical_groups {
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
              field_taxonomy_page_url
              field_taxonomy_page_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              field_taxonomy_hero_paraprapgh_t
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    url
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
            field_need_to_know_second_descri {
              processed
            }
            field_need_know_title {
              processed
            }
            field_need__know_description {
              processed
            }
            field_medicla_skin_con_meta_tags {
              description
              title
              canonical_url
            }
            relationships {
              field_footer_two_section_med_ski {
                relationships {
                  field_service_card {
                    field_service_name {
                      processed
                    }
                    field_service_description {
                      processed
                    }
                    field_se {
                      title
                      uri
                    }
                    field_service_title {
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
                  }
                }
              }
                node__medical_product {
                  field_medical_premier_points
                  field_medical_sku
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
                        id
                        name
                      }
                      field_medical_skin_concern {
                        name
                      }
                      field_medical_skin_type {
                        name
                      }
                      field_medical_categories {
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
                  field_taxonomy_page_url
                  field_taxonomy_page_title
                  field_taxonomy_hero_para_descrip {
                    processed
                  }
                  field_taxonomy_hero_paraprapgh_t
                  relationships {
                    field_taxonomy_hero_paraprapgh_i {
                      localFile {
                        url
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
        field_need__to_know__title {
          processed
        }
        field_need_to__know__description {
          processed
        }
        field_need_sec__know_description {
          processed
        }
        field_medical_ingr_meta_tags {
          canonical_url
          title
          description
        }
       
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
              field_medical_sku
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
                    id
                    name
                  }
                  field_medical_skin_concern {
                    name
                  }
                  field_medical_skin_type {
                    name
                  }
                  field_medical_categories {
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
              field_taxonomy_page_url
              field_taxonomy_page_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              field_taxonomy_hero_paraprapgh_t
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    url
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
        field_medical_skin_type_meta_tag {
          description
          title
        }
        id
        path {
          alias
        }
        relationships {
          field_taxonomy_footer_two {
            relationships {
              field_service_card {
                field_service_title {
                  processed
                }
                field_service_name {
                  processed
                }
                field_service_description {
                  processed
                }
                field_se {
                  uri
                  title
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
              }
            }
          }
              field_hero_parag_taxonomy {
                field_taxonomy_hero_para_title
                field_taxonomy_page_url
                field_taxonomy_page_title
                field_taxonomy_hero_paraprapgh_t
                field_taxonomy_hero_para_descrip {
                  processed
                }
                relationships {
                  field_taxonomy_hero_paraprapgh_i {
                    localFile {
                      url
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
            field_medical_sku
            field_medical_premier_points_id
            title
            path {
              alias
            }
            relationships {
              field_medical_ingredients {
                id
                name
              }
              field_medical_skin_concern {
                name
              }
              field_medical_skin_type {
                name
              }
              field_medical_categories {
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
            field_need_to_know_title {
              processed
            }
            field_need_to_know_description {
              processed
            }
          
            field_medical_cat_meta_tags {
              description
              title
              canonical_url
            }
           
            relationships {
              field_footer_two_section_med_cat {
                relationships {
                  field_service_card {
                    field_service_title {
                      processed
                    }
                    field_service_name {
                      processed
                    }
                    field_service_description {
                      processed
                    }
                    field_se {
                      uri
                      title
                    }
                    relationships {
                      field_service_image {
                        localFile {
                          childImageSharp {
                            fluid(quality: 100) {
                              ...GatsbyImageSharpFluid
                            }
                            original {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
                node__medical_product {
                  field_medical_premier_points
                  field_medical_sku
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
                        id
                        name
                      }
                      field_medical_skin_concern {
                        name
                      }
                      field_medical_skin_type {
                        name
                      }
                      field_medical_categories {
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
                  field_taxonomy_page_url
                  field_taxonomy_page_title
                  field_taxonomy_hero_para_title
                  field_taxonomy_hero_para_descrip {
                    processed
                  }
                  field_taxonomy_hero_paraprapgh_t
                  relationships {
                    field_taxonomy_hero_paraprapgh_i {
                      localFile {
                        url
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
              field_taxonomy_page_url
              field_taxonomy_page_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    url
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
              field_clinical_sku
              title
              relationships {
                field_clinical_ingredients {
                  name
                }
                field_clinical_skin_concern {
                  name
                }
                field_clinical_skin_type {
                  name
                }
                field_clinical_categories {
                  name
                }
                field_clinical_groups {
                  name
                }
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
          field_medical_prod_lines_meta_ta {
            description
            title
          }
          field_tax_description_second_par {
            processed
          }
          field_tax_need_to_know_descripti {
            processed
          }
          field_tax_needtoknow {
            processed
          }
          relationships {
            field_footer_two_section_title {
              relationships {
                field_service_card {
                  field_service_title {
                    processed
                  }
                  field_service_name {
                    processed
                  }
                  field_se {
                    uri
                    title
                  }
                  field_service_description {
                    processed
                  }
                  relationships {
                    field_service_image {
                      localFile {
                        childImageSharp {
                          fluid {
                            ...GatsbyImageSharpFluid
                          }
                          original {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            field_hero_productline_taxonomy {
              field_taxonomy_hero_paraprapgh_t
              field_taxonomy_hero_para_title
              field_taxonomy_page_url
              field_taxonomy_page_title
              field_taxonomy_hero_para_descrip {
                processed
              }
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    url
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
              field_medical_sku
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
                field_medical_ingredients {
                  id
                  name
                }
                field_medical_skin_concern {
                  name
                }
                field_medical_skin_type {
                  name
                }
                field_medical_categories {
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
          field_clinical_groups_meta_tags {
            title
            description
            canonical_url
          }
          path {
            alias
          }
          relationships {
            field_footer_two_sections {
              id
                 field_featured_paragraph_id {
                   processed
                 }
                 field_featured_button {
                   title
                   uri
                 }
                 field_featured_description {
                   processed
                 }
                 field_featured_title {
                   processed
                 }
                 field_featured_perfect_title {
                   processed
                 }
                 field_featured_products_title {
                   processed
                 }
                 field_featured_subtitle {
                   processed
                 }
                 field_image_right
                 
                 relationships {
                   field_issues_categories {
                     path {
                       alias
                     }
                     ... on taxonomy_term__clinical_skin_concern {
                       id
                       name
                     }
                   }
                   field_featured_video {
                     field_video_link
                     relationships {
                       field_video_poster {
                         localFile {
                           childImageSharp {
                             fluid (quality: 100) {
                              src
                             }
                             original{
                               src
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
            field_taxonomy_hero {
              field_taxonomy_hero_para_descrip {
                processed
              }
              field_taxonomy_hero_para_title
              field_taxonomy_page_url
              field_taxonomy_page_title
              field_taxonomy_hero_paraprapgh_t
              relationships {
                field_taxonomy_hero_paraprapgh_i {
                  localFile {
                    url
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
      

            node__clinical_product {
              field_clinical_id
              field_clinical_description {
                processed
              }
              path {
                alias
              }
              field_clinical_price
              field_clinical_sku
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
                field_clinical_skin_concern {
                  name
                }
                field_clinical_skin_type {
                  name
                }
                field_clinical_categories {
                  name
                }
                field_clinical_groups {
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