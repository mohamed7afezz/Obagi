import React from 'react'
import { graphql } from "gatsby"
import ProductCard from "../../components/productcard"
import productsliststyle from "../../assets/scss/components/collection-list.module.scss"
const Collectionproducts = ({ node }) => {
  console.log("Hmotawexx", node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product)
  const clinicalProduct = node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product 
 
  return (

    <div className={["container-fluid", productsliststyle.collectionList, "collectionhero"].join(" ")}>
      <div className={["row", productsliststyle.Collectionfiltercontainer].join('')}>
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>
        <div id="filters">
              <div class="ui-group">  

                <div class="button-group js-radio-button-group" data-filter-group="color">
                <button class="button is-checked" data-filter="">any</button>
                <button class="button" data-filter=".red">red</button>
                <button class="button" data-filter=".blue">blue</button>
                <button class="button" data-filter=".yellow">yellow</button>
              </div>
            </div>
        </div>
        </div>
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>
        <label className={productsliststyle.filter}>Filtr by:</label>
          <select name='sort by'>
            <option value="Newest">All</option>
            <option value="low">Price :Low - Heigh</option>
            <option value="high">Price :Heigh - Low</option>
          </select>
        </div>
      </div>
      <div className={["row", productsliststyle.CollectionListcontainer].join('')}>
           
        {
          
          clinicalProduct.map((item, index) => {
            let ingrediant=  item.relationships.field_clinical_components.filter(component => {
              return component.__typename === "paragraph__ingredient";
            });
        
            
             
       
             
         
            return (
              <div  id='grid' className={["col-12", "col-lg-3", {ingrediant}, productsliststyle.productview, "productview"].join(' ')}>
              {
                
               
                  index > 1 ? <ProductCard  producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[0]?item.relationships.field_clinical_image[0].localFile.childImageSharp.fluid:''} price={item.field_clinical_price} rate="5" />
                   :
                   <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[0]?item.relationships.field_clinical_image[0].localFile.childImageSharp.fluid:''} price={item.field_clinical_price} rate="5" />
              }
         
              </div>
            
            )
          }
          
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
  }
}
`;