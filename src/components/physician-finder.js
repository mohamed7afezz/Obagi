import React from "react"
import { graphql } from 'gatsby';
import Finder from "./hcpfinder";


const PhysicianFinder = () => (
    <> 
        <Finder/>
    </>  
)

export default PhysicianFinder

export const fragment = graphql`
  fragment paragraphPhysicianFinder on paragraph__physician_finder {
      id
  }`
        