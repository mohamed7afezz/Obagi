/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'bootstrap/dist/css/bootstrap.css'
import "slick-carousel/slick/slick-theme.css";

import "slick-carousel/slick/slick.css";
import './src/assets/css/override.css';

import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import React from 'react';
import { ViewedProductsProvider } from './src/providers/latestview-provider';
import { CartProvider } from "./src/providers/cart-provider";
import { UserProvider } from './src/providers/user-provider';
import { SearchProvider } from './src/providers/search-provider';



const scrollTo = (id) => () => {
  const els = document.querySelectorAll(id)
  if (els) {

    for(let i = 0; i < els.length; i++) {
      if(els.item(i).offsetTop > 0) {

        return window.scroll({ top: els.item(i).offsetTop, behavior: 'smooth' });

      }
    }
  }
  return false
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location.hash) {
    window.setTimeout(scrollTo(location.hash), 1000)
  }
}

export const wrapRootElement = ({ element }) => (
  <UserProvider>
    <ViewedProductsProvider>
      <CartProvider>
        <SearchProvider>
         {element}
       </SearchProvider>
      </CartProvider>
    </ViewedProductsProvider>
  </UserProvider>
);