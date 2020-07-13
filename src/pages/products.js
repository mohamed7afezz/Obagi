
import React from "react"

import '../assets/scss/components/product-hero.module.scss'
import ProductHero from "../components/product-hero"
import Details from "../components/thedetails"
import Ingredient from "../components/ingredient"
import Needtoknow from "../components/needtoknow"
import Howtouse from "../components/howtouse"
import ProductSuggestion from "../components/productsuggestion"
import Carouselproducts from "../components/carouselproducts"
import Recommendedparing from "../components/recommendedparing"

import Layout from "../components/layout"
const products = () => (
 
    <Layout>
      <ProductHero/>
      <Details/>
      <Ingredient/>
      <Needtoknow/>
      <Howtouse/>
      <Carouselproducts/>
      <Recommendedparing/>
      
      <ProductSuggestion/>
        </Layout>
        
)



export default products