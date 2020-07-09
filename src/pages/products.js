
import React from "react"


import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import "../assets/scss/typography/typography.scss"
import '../assets/scss/components/product-hero.module.scss'
import ProductHero from "../components/product-hero"
import Details from "../components/thedetails"
import Ingredient from "../components/ingredient"
import Needtoknow from "../components/needtoknow"
import Howtouse from "../components/howtouse"
import Layout from "../components/layout"
const products = () => (
 
    <Layout>
      <ProductHero/>
      <Details/>
      <Ingredient/>
      <Needtoknow/>
      <Howtouse/>
        </Layout>
        
)



export default products