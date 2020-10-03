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

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  
  if (page.path.match(/^\/my-account/)) {
    page.matchPath = "/my-account/*"

    // Update the page.
    createPage(page)
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

}