import React from 'react'
import { graphql, Link } from 'gatsby'
import articleStyles from '../assets/scss/components/products-article.module.scss'
import Img from 'gatsby-image'
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"
import Player from '@vimeo/player';
import ProductCard from './productcard'

const ProductsArticle = ({ node }) => {


  return (
    <div className={`container-fluid productsArticle ${articleStyles.container}`}>
      <div className={`row`}>
        <div className={`col-12 col-lg-4 offset-lg-1 ${articleStyles.colPadding} ${articleStyles.rightPadding}`}>
          {node.relationships
            && node.relationships.field_article_image
            && node.relationships.field_article_image.localFile
            && node.relationships.field_article_image.localFile.childImageSharp ?
            <div className={`${articleStyles.image}`}><Img fluid={node.relationships.field_article_image.localFile.childImageSharp.fluid} /></div> : ""}
        </div>

        
        <div className={`col-12 col-lg-6 ${articleStyles.colPadding} ${articleStyles.leftPadding}`}>
            {node.relationships
            && node.relationships.field_article_product_image
            && node.relationships.field_article_product_image.localFile
            && node.relationships.field_article_product_image.localFile.childImageSharp ?
              <div className={`${articleStyles.productImg}`}><Img fluid={node.relationships.field_article_product_image.localFile.childImageSharp.fluid} /></div> : ""}
        </div>

        <div className={`col-12 col-lg-9 offset-lg-2 ${articleStyles.textCol}`}>
          <div className={`${articleStyles.deskText}`}>
            {node.field_article_subtitle ? <div className={`subtitle ${articleStyles.subtitle}`} dangerouslySetInnerHTML={{ __html: node.field_article_subtitle.processed }}></div> : ""}
            {node.field_article_title ? <div className={`${articleStyles.title}`} dangerouslySetInnerHTML={{ __html: node.field_article_title.processed }}></div> : ""}
            {node.field_article_description ? <div className={`${articleStyles.description}`} dangerouslySetInnerHTML={{ __html: node.field_article_description.processed }}></div> : ""}
            {node.field_article_link? node.field_article_link.title ? <Link className={`button-link ${articleStyles.link}`} to={node.field_article_link.uri.replace('internal:', '')}>{node.field_article_link.title}</Link> : "":""}
          </div>
        </div>


        {/* {node.relationships
          && node.relationships.field_croduct_card ?

          node.relationships.field_croduct_card.map((item, index) => {
            { console.log('ash item', item) }
            return(
            
              item.field_medical_id ?

                <div className={`col-12 col-lg-3`}>
                  <ProductCard
                    productLink={item.path.alias}
                    producttitle={item.title}
                    productCat={"medical"}
                    productdescription={{ __html: item.field_medical_description ? item.field_medical_description.processed : "" }}
                    productimage={item.relationships.field_medical_image && item.relationships.field_medical_image[0] && item.relationships.field_medical_image[0].localFile ? item.relationships.field_medical_image[0].localFile.childImageSharp.fluid : ""}
                    price={item.field_medical_price}
                    productId={item.field_medical_id}
                    isrx={item.relationships.field_medical_rx ? item.relationships.field_medical_rx.name : ""}
                    premierid={item.field_medical_premier_points_id ? item.field_medical_premier_points_id : ""}
                    feild_preimer={item.field_medical_premier_points ? item.field_medical_premier_points : ""}
                    Sku={item.field_medical_sku ? item.field_medical_sku : ""}
                    minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                  />
                </div>


                :

                item.field_clinical_id ?

                  <div className={`col-12 col-lg-3`}>
                    <ProductCard
                      productLink={item.path.alias}
                      producttitle={item.title}
                      productCat={"clinical"}
                      productdescription={{ __html: item.field_clinical_description ? item.field_clinical_description.processed : "" }}
                      productimage={item.relationships.field_clinical_image && item.relationships.field_clinical_image[0] && item.relationships.field_clinical_image[0].localFile ? item.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : ""}
                      price={item.field_clinical_price}
                      productId={item.field_clinical_id}
                      Sku={item.field_clinical_sku ? item.field_clinical_sku : ""}
                      minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                    />
                  </div>


                  : ""
            

          )})

          : ""} */}
      </div>
    </div>
  )
}

export default ProductsArticle

export const fragment = graphql`
    fragment paragraphProductsArticle on paragraph__products_article {
        id
        field_article_subtitle {
            processed
          }
          field_article_title {
            processed
          }
          field_article_description {
            processed
          }
          field_article_link {
            title
            uri
          }
          relationships {
            field_article_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            field_article_product_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }

          }
        
        
    }`