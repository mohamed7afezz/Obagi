/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { ViewedProductsProvider } from './src/providers/latestview-provider';
import { CartProvider } from "./src/providers/cart-provider";
import { UserProvider } from './src/providers/user-provider';

export const wrapRootElement = ({ element }) => (
  <UserProvider>
    <ViewedProductsProvider>
      <CartProvider>
        {element}
      </CartProvider>
    </ViewedProductsProvider>
  </UserProvider>
);