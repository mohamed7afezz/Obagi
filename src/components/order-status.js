import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
// import servicesStyles from '../assets/scss/components/services.module.scss'

const OrderStatus = ({ node }) => {
    return (
        <div className="container-fluid">
            <div className="row">
            <div class="col-12 col-md-8 " >
                      <h1>ss</h1>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus

export const fragment = graphql`
    fragment paragraphOrderStatus on paragraph__order_status {
        id
        
    }`