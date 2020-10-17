import React from "react"
import Layout from "../components/layout"
import YourBag from "../components/Cart/your-bag"
import SEO from '../components/seo';
import { graphql } from 'gatsby';

const cart = ({ data }) => (
    <Layout> 
      <SEO title="Cart" description="Cart Page Description" />

      <YourBag/>
    </Layout>  
)

export default cart
