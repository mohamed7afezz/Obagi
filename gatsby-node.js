/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Create Slug for each node of Basic Page type we have on Drupal
const path = require('path');

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    
    // create slug for each node
    if (node.internal.type === "node__page" || 
        node.internal.type === "node__clinical_product" || 
        node.internal.type === "node__medical_product"  ||
        node.internal.type === "taxonomy_term__clinical_skin_concern"
        ) {
        const slug = `${node.path.alias}`;
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    // 1- get path to template
    const temp = path.resolve('./src/templates/basic-page.js');
    const productTemp = path.resolve('./src/templates/product-page.js');
    const productCollectionTemp = path.resolve('./src/templates/product-collection.js');
    // 2- get data from node
    const result = await graphql(`
        {
            allNodePage {
                edges {
                    node {
                        fields {
                            slug
                        }
                        drupal_internal__nid
                    }
                }
            },
            allNodeClinicalProduct {
                edges {
                    node {
                        fields {
                            slug
                        }
                        drupal_internal__nid
                    }
                }
            },
            allNodeMedicalProduct {
                edges {
                    node {
                        fields {
                            slug
                        }
                        drupal_internal__nid
                    }
                }
            },
            allTaxonomyTermClinicalSkinConcern {
                edges {
                  node {
                    fields {
                      slug
                    }
                  }
                }
            },
            allTaxonomyTermClinicalCategories {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
            },
            allTaxonomyTermMedicalCategories {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
              },
            allTaxonomyTermMedicalSkinConcern {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
              },
            allTaxonomyTermClinicalGroups {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
             },
            allTaxonomyTermMedicalProductLines {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
              },
            allTaxonomyTermClinicalSkinType {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
            },
            allTaxonomyTermMedicalSkinType {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
              },
              allTaxonomyTermClinicalIngredients {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
              },
              allTaxonomyTermMedicalIngredients {
                edges {
                  node {
                    path {
                      alias
                    }
                  }
                }
              },
        }
    `);
    
    result.data.allNodePage.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug === '/homepage' ? '/' : node.fields.slug,
            component: temp,
            context: {
                slug: node.fields.slug,
                nodetype: 'basic'
            }
        });
    });

    result.data.allNodeClinicalProduct.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: productTemp,
            context: {
                slug: node.fields.slug,
                nodetype: 'clinical'
            }
        });
    });

    result.data.allNodeMedicalProduct.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: productTemp,
            context: {
                slug: node.fields.slug,
                nodetype: 'medical'
            }
        });
    });

    result.data.allTaxonomyTermClinicalSkinConcern.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug ,
            component: productCollectionTemp,
            context: {
                slug: node.fields.slug,
                nodetype: 'clinicalConcern',
                checktaxonomyType: 'clinical'
            }
        });
    });
    result.data.allTaxonomyTermClinicalCategories.edges.forEach(({ node }) => {
        createPage({
            path:   node.path.alias ,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'clinicalCategories',
                checktaxonomyType: 'clinical'
            }
        });
    });
    result.data.allTaxonomyTermMedicalSkinConcern.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'medicalConcern',
                checktaxonomyType: 'medical'
            }
        });
    });
    result.data.allTaxonomyTermMedicalCategories.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'medicalCategories',
                checktaxonomyType: 'medical'

            }
        });
    });
    result.data.allTaxonomyTermClinicalGroups.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'clinicalGroups',
                checktaxonomyType: 'clinical'

            }
        });
    });
    result.data.allTaxonomyTermMedicalProductLines.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'medicalLine',
                checktaxonomyType: 'medical'
            }
        });
    });
    result.data.allTaxonomyTermClinicalSkinType.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'skinClinicalType',
                checktaxonomyType: 'clinical'
            }
        });
    });
    result.data.allTaxonomyTermMedicalSkinType.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'skinMedicalType',
                checktaxonomyType: 'medical'

            }
        });
    });
    result.data.allTaxonomyTermClinicalIngredients.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'ClinicalIngredients',
                checktaxonomyType: 'clinical'

            }
        });
    });
    result.data.allTaxonomyTermMedicalIngredients.edges.forEach(({ node }) => {
        createPage({
            path: node.path.alias,
            component: productCollectionTemp,
            context: {
                slug: node.path.alias,
                nodetype: 'MedicalIngredients',
                checktaxonomyType: 'medical'

            }
        });
    });
}