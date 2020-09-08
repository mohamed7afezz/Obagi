
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
import SearchResults from '../components/search-results'

import Search from "../components/search"
import Reviews from "../components/reviews"
import ShowAccount from "../components/show-account"
import MyAccount from "../components/user-account"
import OrderDetails from '../components/order-details'
import AddressBox from "../components/address-box"

const products = () => (
 
    <Layout>
      <ShowAccount/>
        {/* <ProductHero/>
      <Details/>
      <Ingredient/>
      <Needtoknow/> */}
        {/* <Showbag/> */}
      {/* <Beforeafter/>

      <Carouselproducts/>
      <Recommendedparing/>
      <ProductSuggestion/> */}
 

      {/* <ProductLine /> */}
      {/* <SearchResults /> */}
      <Reviews /> 
      {/* <MyAccount /> */}
      {/* <OrderDetails /> */}
      {/* <AddressBox /> */}
      {/* <OrderDetails /> */}
        </Layout>
        
)



export default products