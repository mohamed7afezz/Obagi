
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
import Beforeafter from "../components/beforeafter"
import Layout from "../components/layout"
import AsNavFor from "../components/slick-slider"
const products = () => (
 
    <Layout>
      <ProductHero/>
      <Details/>
      <Ingredient/>
      <Howtouse/>
      <Beforeafter/>

    <AsNavFor/>
        </Layout>
        
)



export default products