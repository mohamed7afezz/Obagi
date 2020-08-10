
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

import YourBag from "../components/bag"
import Showbag from "../components/showbag"
const products = () => (
 
    <Layout>
        {/* <ProductHero/>
      <Details/>
      <Ingredient/>
      <Needtoknow/> */}
        <Showbag/>
      {/* <Beforeafter/>

      <Carouselproducts/>
      <Recommendedparing/>
      <ProductSuggestion/> */}
 
      <YourBag/>

      {/* <ProductLine /> */}
      
        </Layout>
        
)



export default products