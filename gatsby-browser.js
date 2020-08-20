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

export const wrapRootElement = ({ element }) => (
  <ViewedProductsProvider>
    <CartProvider>
        {element}
    </CartProvider>
  </ViewedProductsProvider>
);