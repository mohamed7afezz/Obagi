import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import CustomListStyle from '../assets/scss/components/custom-list.module.scss'
// import servicesStyles from '../assets/scss/components/services.module.scss'

const CustomList = ({ node }) => {
    return (
    <> <div className="container-fluid took">
        <div className="row">
         <div className={CustomListStyle.ListCon}>
            
               
        <h3 className={CustomListStyle.ListTitle}  dangerouslySetInnerHTML={{ __html: node.field_list_title.processed }}></h3>
        <div className="col-12 col-lg-10 offset-lg-2">
        <div dangerouslySetInnerHTML={{ __html: node.field_your_lia.processed }} className={CustomListStyle.Listpara}>
 
        </div>
        </div>
        </div>
        </div>
        </div></>
    )
}

export default CustomList
export const fragment = graphql`
    fragment paragraphCustomList on paragraph__list {
        field_list_title {
          processed
        }
        field_your_lia {
          processed
        }
      }`