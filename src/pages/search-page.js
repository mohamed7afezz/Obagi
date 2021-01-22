
import React  from "react"
import '../assets/scss/components/product-hero.module.scss'
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SearchResult from "../components/search-results"
import SEO from '../components/seo';


const products = ({ data, nodeType }) => (
 
    <Layout menuType = "relative" nodeType={nodeType}> 
      <SEO title="Search Results" description="Search Results" />
      <SearchResult/>
    </Layout>
        
)

export default products
