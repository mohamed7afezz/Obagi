import React, { useContext } from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/layout';
// import SEO from '../components/seo';
import CollectionHero from '../components/collection-components/collection-hero'
import CollectionFooter from '../components/collection-components/collection-footer'
import CollectionProducts from '../components/collection-components/collectoin-products-list'

// import { getParagraph } from '../components/paragraphs-helper';

const ClinicalCollectionTemp = props  => {
    // const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);

   
    return (
      <Layout nodeType={props.pageContext.nodetype} menuType="absolute">            
        <CollectionHero node={props} nodetype={props.pageContext.nodetype}/>                                   
        <CollectionProducts node={props} nodetype={props.pageContext.nodetype}/>
        <CollectionFooter node={props.data} blockName={props.data}/>
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
                node__clinical_product {        
                    field_clinical_description {
                      processed
                    }
                    path {
                      alias
                    } 
                    field_clinical_price
                    title
                    relationships {
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
                            fluid {
                              ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                    }
                  }
                field_hero_categories_taxonomy {
                field_taxonomy_hero_para_title
                field_taxonomy_hero_para_desc
                field_taxonomy_hero_paraprapgh_t
                relationships {
                  field_taxonomy_hero_paraprapgh_i {
                    localFile {
                      childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
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
        taxonomyTermMedicalSkinConcern(path: {alias: {eq: $slug}}) {
            name
            relationships {
                node__medical_product {
                  field_medical_is_system
                    field_medical_description {
                      processed
                    }
                    path {
                      alias
                    } 
                    field_medical_price
                    title
                    relationships {
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
                      field_medical_image {
                        localFile {
                          childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                    }
                  }
                field_hero_taxonomy {
                  field_taxonomy_hero_para_title
                  field_taxonomy_hero_para_desc
                  field_taxonomy_hero_paraprapgh_t
                  relationships {
                    field_taxonomy_hero_paraprapgh_i {
                      localFile {
                        childImageSharp {
                          fluid {
                              ...GatsbyImageSharpFluid
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
         taxonomyTermMedicalCategories(path: {alias: {eq: $slug}}) {
            name
            relationships {
                node__medical_product {
                    field_medical_is_system
                    field_medical_description {
                      processed
                    }
                    field_medical_price
                    title
                    path {
                      alias
                    }
                    relationships {
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
                      field_medical_image {
                        localFile {
                          childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                    }
                  }
                field_hero_category_taxonomy {
                  field_taxonomy_hero_para_title
                  field_taxonomy_hero_para_desc
                  field_taxonomy_hero_paraprapgh_t
                  relationships {
                    field_taxonomy_hero_paraprapgh_i {
                      localFile {
                        childImageSharp {
                          fluid {
                              ...GatsbyImageSharpFluid
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
          relationships {
            node__clinical_product {
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
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
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
          relationships {
            node__medical_product {
              id
              field_medical_is_system
              field_medical_description {
                processed
              }
              field_medical_price
              title
              path {
                alias
              }
              relationships {
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
                field_medical_product_lines {
                  relationships {
                    node__medical_product {
                      relationships {
                        field_medical_categories {
                          relationships {
                            field_hero_category_taxonomy {
                              field_taxonomy_hero_para_desc
                              field_taxonomy_hero_para_title
                              field_taxonomy_hero_paraprapgh_t
                              relationships {
                                field_taxonomy_hero_paraprapgh_i {
                                  localFile {
                                    childImageSharp {
                                      fluid {
                                        ...GatsbyImageSharpFluid
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                field_medical_image {
                  localFile {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid
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
        },
        taxonomyTermClinicalGroups(path: {alias: {eq: $slug}}) {
          id
          name
          path {
            alias
          }
          relationships {
            node__clinical_product {
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
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
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