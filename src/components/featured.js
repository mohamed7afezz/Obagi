import React from 'react'
import { graphql, Link } from 'gatsby'
import featuredStyles from '../assets/scss/components/featured.module.scss'


const Featured = ({ node }) => {

  return (
    <div className={["container-fluid", featuredStyles.wrapper].join(" ")}>
      <div className="row">
        {/* <div className="col-12">
            </div> */}
        <div className="col-12">
          <div className={featuredStyles.textWrapper}>
            <div className={["subtitle", featuredStyles.subtitle].join(" ")}>Featured</div>
            <div dangerouslySetInnerHTML={{ __html: node.field_featured_title.processed }} className={featuredStyles.title}></div>
            <div className={featuredStyles.products}>PRODUCTS (<span className={featuredStyles.productsNo}>18</span>)</div>
            <div dangerouslySetInnerHTML={{ __html: node.field_featured_description.processed }} className={featuredStyles.description}></div>
            <div className={featuredStyles.perfect}>PERFECT FOR: <span>{node.relationships.field_issues_categories.taxonomy_term__clinical_categories.name}</span></div>
            <div className={featuredStyles.linkSection}><Link to={node.field_featured_button.uri} className="button-link">{node.field_featured_button.title}</Link></div>
            {/* <div></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured

export const fragment = graphql`
    fragment paragraphFeaturedSection on paragraph__featured_section {
          id
          field_featured_button {
            title
            uri
          }
          field_featured_description {
            processed
          }
          field_featured_title {
            processed
          }
          field_image_right
          
          relationships {
            field_issues_categories {
              ... on taxonomy_term__clinical_categories {
                id
                name
              }
              ... on taxonomy_term__clinical_skin_concern {
                id
                name
              }
              ... on taxonomy_term__medical_categories {
                id
                name
              }
            }
          }
        }
      
      
`;

