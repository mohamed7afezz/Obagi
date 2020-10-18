
import React  from "react"
import '../assets/scss/components/product-hero.module.scss'
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SearchResult from "../components/search-results"
import SEO from '../components/seo';


const products = ({ data }) => (
 
    <Layout menuType = "relative" nodeType="clinical"> 
      <SEO title="Search" description="Search Page Description" />
      <SearchResult/>
    </Layout>
        
)

export default products
