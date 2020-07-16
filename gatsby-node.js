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
        node.internal.type === "node__medical_product") {
        const slug = `${node.path.alias || node.drupal_internal__nid}/`;
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
            }
        }
    `);
    
    result.data.allNodePage.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug === '/homepage/' ? '/' : node.fields.slug,
            component: temp,
            context: {
                slug: node.fields.slug
            }
        });
    });

    result.data.allNodeClinicalProduct.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: productTemp,
            context: {
                slug: node.fields.slug
            }
        });
    });
}