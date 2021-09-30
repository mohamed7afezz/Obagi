import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from '../assets/scss/components/blog-product.module.scss'
import ProductCard from './productcard'

const BlogProduct = ({ node }) => {

    let item = node.relationships.field_product ? node.relationships.field_product : "";
    return <>
        <div class={`row ${styles.wrapper}`}>
            <div className={`col-12 col-lg-8 ${styles.textCol}`}>
                {node.relationships
                    && node.relationships.field_full_html_content
                    && node.relationships.field_full_html_content.field_full_html ?
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: node.relationships.field_full_html_content.field_full_html.processed }}></div> : ""}
            </div>
            <div className={`col-12 col-lg-4`}>
                {node.relationships.field_product ?
                    <div className={`blog-product-card`}>
                        <ProductCard
                            producttitle={item.title}
                            productId={item.field_medical_id ? item.field_medical_id : item.field_clinical_id}
                            price={item.field_clinical_price ? item.field_clinical_price : item.field_medical_price ? item.field_medical_price : ""}
                            Sku={item.field_medical_sku ? item.field_medical_sku : item.field_clinical_sku ? item.field_clinical_sku : ""}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                            premierid={item.field_medical_premier_points_id ? item.field_medical_premier_points_id : ""}
                            productCat={item.field_medical_id ? "medical" : "clinical"}
                            feild_preimer={item.field_medical_premier_points ? item.field_medical_premier_points : ""}
                            productdescription={item.field_medical_description ? { __html: item.field_medical_description.processed } : item.field_clinical_description ? { __html: item.field_clinical_description.processed } : ""}
                            productLink={item.path ? item.path.alias : ""}
                            productimage={item.relationships &&
                                item.relationships.field_medical_image &&
                                item.relationships.field_medical_image[0] &&
                                item.relationships.field_medical_image[0].localFile &&
                                item.relationships.field_medical_image[0].localFile.childImageSharp ? item.relationships.field_medical_image[0].localFile.childImageSharp.gatsbyImageData
                                :
                                item.relationships &&
                                    item.relationships.field_clinical_image &&
                                    item.relationships.field_clinical_image[0] &&
                                    item.relationships.field_clinical_image[0].localFile &&
                                    item.relationships.field_clinical_image[0].localFile.childImageSharp ? item.relationships.field_clinical_image[0].localFile.childImageSharp.gatsbyImageData
                                    : ""}
                            rate="0"
                        />
                    </div>

                    : ""}
            </div>
        </div>
    </>;
}

export default BlogProduct

export const fragment = graphql`fragment allParagraphBlogProductParagraph on paragraph__blog_product_paragraph {
  id
  relationships {
    field_full_html_content {
      field_full_html {
        processed
      }
    }
    field_product {
      ... on node__clinical_product {
        id
        field_clinical_id
        field_clinical_description {
          processed
        }
        field_clinical_price
        field_clinical_sku
        field_min_quantity
        path {
          alias
          pid
          langcode
        }
        title
        relationships {
          field_clinical_image {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
      ... on node__medical_product {
        id
        field_medical_id
        field_medical_price
        field_medical_premier_points_id
        field_medical_premier_points
        field_medical_description {
          processed
        }
        field_medical_sku
        field_min_quantity
        title
        path {
          alias
        }
        relationships {
          field_medical_image {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
}
`