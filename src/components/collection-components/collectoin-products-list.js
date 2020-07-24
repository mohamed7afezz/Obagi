import React from 'react'
import { graphql } from "gatsby"
import ProductCard from "../../components/productcard"
import productsliststyle from "../../assets/scss/components/collection-list.module.scss"
const Collectionproducts = ({ node }) => {
  console.log("Hmotawe", node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product)
  return (

    <div className={["container-fluid", productsliststyle.collectionList, "collectionhero"].join(" ")}>
      <div className={["row", productsliststyle.Collectionfiltercontainer].join('')}>
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>

        </div>
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>

        </div>
      </div>
      <div className={["row", productsliststyle.CollectionListcontainer].join('')}>
        {
          node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product.map((item, index) => (

            <div className={["col-12", "col-lg-3", productsliststyle.productview, "productview"].join(' ')}>
              <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[index].localFile.childImageSharp.fluid} price={item.field_clinical_price} rate="5" />

            </div>

          )
          )
        }
        {
          node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product.map((item, index) => (

            <div className={["col-12", "col-lg-3", productsliststyle.productview, "productview"].join(' ')}>
              <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[index].localFile.childImageSharp.fluid} price={item.field_clinical_price} rate="5" />

            </div>

          )
          )
        }
        {
          node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product.map((item, index) => (

            <div className={["col-12", "col-lg-3", productsliststyle.productview, "productview"].join(' ')}>
              <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[index].localFile.childImageSharp.fluid} price={item.field_clinical_price} rate="5" />

            </div>

          )
          )
        }
        {
          node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product.map((item, index) => (

            <div className={["col-12", "col-lg-3", productsliststyle.productview, "productview"].join(' ')}>
              <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[index].localFile.childImageSharp.fluid} price={item.field_clinical_price} rate="5" />

            </div>

          )
          )
        }
      </div>
    </div>
  )
}

export default Collectionproducts;
export const fragment = graphql`
  fragment collectionproducts on  taxonomy_term__clinical_skin_concern {
    relationships {
      node__clinical_product {
        field_clinical_description {
          processed
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
        }
      }
    }
  }
`;