import React, { useState ,useReact,useEffect}  from 'react'
import { graphql } from "gatsby"
import ProductCard from "../../components/productcard"
import productsliststyle from "../../assets/scss/components/collection-list.module.scss"
const Collectionproducts = ({ node }) => {
  console.log("Hmotawe", node)
  
  const allPosts = node.taxonomyTermClinicalSkinConcern.relationships
  const emptyQuery = ""
  const [state, setState] = useState({

    filteredData: [],

    query: emptyQuery,

  })
  const handleInputChange = (event) => {
    const query = event.target.value

    const posts = node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product
    const filteredData = posts.filter(post => {

      // destructure data from post frontmatter

      const $title = post.title

      return (

        $title.toLowerCase().includes(query.toLowerCase())



      )

    })
    setState({

      query, // with current query string from the `Input` event

      filteredData, // with filtered data from posts.filter(post => (//filteredData)) above

    })
   
    console.log(posts1)
  }
 
  const { filteredData, query } = state

  const hasSearchResults = filteredData && query !== emptyQuery
  const posts1 = hasSearchResults ? filteredData : node.taxonomyTermClinicalSkinConcern.relationships.node__clinical_product


  return (

    <div className={["container-fluid", productsliststyle.collectionList, "collectionlist"].join(" ")}>
      <div class="row Collectionfiltercontainer">
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>

          <label className={productsliststyle.filter}>Filter by:</label>
          {/* <select name='filter by'>
            <option>All</option>
          </select> */}
    
          <input
            type="text"
            aria-label="Search"
            placeholder="Type to filter posts..."
            onChange={handleInputChange} />
        </div>
        <div className={["col-12", "col-lg-2", productsliststyle.Collectionfilter, "Collectionfilter"].join(' ')}>
          <label className={productsliststyle.filter}>Sort by:</label>
          <select name='sort by'>
            <option value="Newest">Newest</option>
            <option value="low">Price :Low - Heigh</option>
            <option value="high">Price :Heigh - Low</option>
          </select>
        </div>
      </div>
      <div class="ListContainer ">
        <div class=" CollectionListcontainer">
          <div class="row">
            {posts1.map((item, index) => {

              const $title  = item.title

              return (
                <div key={$title} className={["col-12", "col-lg-3", productsliststyle.productview, "productview"].join(' ')}>

                  {index > 1 ? <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[index].localFile.childImageSharp.fluid} price={item.field_clinical_price} rate="5" />
                    :

                    <ProductCard producttitle={item.title} productdescription={{ __html: item.field_clinical_description.processed }} productimage={item.relationships.field_clinical_image[0].localFile.childImageSharp.fluid} price={item.field_clinical_price} rate="5" />

                  }

                </div>

              )

            })}

          </div>
        </div>
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