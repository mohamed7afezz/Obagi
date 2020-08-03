import React, {useEffect} from 'react'
import { graphql } from "gatsby"
import ProductCard from "../../components/productcard"
import productsliststyle from "../../assets/scss/components/collection-list.module.scss"





const Collectionproducts = ({ node }) => {
  console.log("Hmotawexx", node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product)
  const clinicalProduct = node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product 

  

  useEffect(() => {
    const isotope = require('isotope-layout');
    const filterValSelect = document.getElementById('product-filter');
    const iso = new isotope('.products-list', {
      itemSelector: '.product-element',
      layoutMode: 'fitRows',
      filter: (item) => {
        const filterVal = filterValSelect.options[filterValSelect.selectedIndex].value;
        console.log('bahi', filterVal);
        if(filterVal === 'All' || filterVal == undefined) {
          return true;
        }
        return item.dataset.ingrediant === filterVal;
      }
    })

    document.querySelector('#product-filter').addEventListener( 'change', function( event ) {
      iso.arrange();
    });
  })
  
  

  return (

    <div className={["container-fluid", productsliststyle.collectionList, "collectionhero"].join(" ")}>
      <div className={["row", productsliststyle.Collectionfiltercontainer,'pb-20'].join(' ')}>
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>
        <p>
        <label className={productsliststyle.filter}>Filtr by:</label>
        <select id="product-filter">
          <option vlaue="all">All</option>
          <option vlaue="vitamin-c-1">vitamin-c-1</option>
          <option vlaue="vitamin-c-2">vitamin-c-2</option>
        </select>
          </p>
        </div>
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>
        <label className={productsliststyle.filter}>sort by:</label>
          <select class="filters-select" name='sort by'>
            <option value="Newest">All</option>
            <option value="low">Price :Low - Heigh</option>
            <option value="high">Price :Heigh - Low</option>
          </select>
     
          </div>
      </div>
      <div className={["row products-list", productsliststyle.CollectionListcontainer].join('')}>
           
        {
          
          clinicalProduct.map((item, index) => {
            let ingrediant=  item.relationships.field_clinical_components.filter(component => {
              return component.__typename === "paragraph__ingredient";
              
            });
             

            return (

              <div className={["col-12 col-lg-3 col-md-4 product-element", `vitamin-c-${index}`, productsliststyle.productview, "productview"].join(' ')} data-ingrediant={`vitamin-c-${index}`}>
   
                 <ProductCard  producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[0]? (item.relationships.field_clinical_image[0].localFile? item.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : ''):''} price={item.field_clinical_price} rate="0" />
            
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