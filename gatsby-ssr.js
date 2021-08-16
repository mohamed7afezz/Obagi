/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  headComponents.sort((a, b) => {
    if (a.type === b.type || (a.type !== 'style' && b.type !== 'style')) {
      return 0;
    }

    if (a.type === 'style') {
      return 1;
    } else if (b.type === 'style') {
      return -1;
    }

    return 0;
  });

  replaceHeadComponents(headComponents);
};
import React from 'react';
import { ViewedProductsProvider } from './src/providers/latestview-provider';
import { CartProvider } from "./src/providers/cart-provider";
import { UserProvider } from './src/providers/user-provider';
import { SearchProvider } from './src/providers/search-provider';

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