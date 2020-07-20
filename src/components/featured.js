import React from 'react'
import { graphql, Link } from 'gatsby'
import featuredStyles from '../assets/scss/components/featured.module.scss'


const Featured = ({ node }) => {

    return(
        <div className="container-fluid">
          <div className="row">
            <div className={["col-lg-10", featuredStyles.wrapper].join(" ")}>
              <div className="col-lg-3">
                <div dangerouslySetInnerHTML={{__html: node.field_featured_title.processed}}></div>
                <div dangerouslySetInnerHTML={{__html: node.field_featured_description.processed}}></div>
                <div><Link to={node.field_featured_button.uri}>{node.field_featured_button.title}</Link></div>
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
              name
            }
          }
        }
      
`;

