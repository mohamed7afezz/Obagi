import React, { createContext, useState, useEffect } from 'react';


const baseUrl = process.env.Base_URL;
let cartId = undefined;

if (typeof window !== "undefined") {
    cartId = window.localStorage.getItem('cartId')? JSON.parse(window.localStorage.getItem('cartId')) : undefined;
}

const CartContext = createContext();

const initialState = {
  cartLoading: true,
  cartError: false,
  cart: {
    currency: {
      code: 'USD'
    },
    cartAmount: 0,
    lineItems: {},
    numberItems: 0,
    redirectUrls: {}
  }
};

export const CartProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [notifications, updateNotifications] = useState([]);

  const addNotification = (text, type = 'notify') => {
    updateNotifications([...notifications, { text, type, id: Date.now() }]);
  };

  const removeNotification = id => {
    updateNotifications([]);
  };

  const fetchCart = () => {
    if(!cartId) {
      setState({ ...state, cartLoading: false})
      return;
    }

    fetch(`${baseUrl}bigcommerce/v1/cart/${cartId}`, {
      credentials: 'same-origin',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(response => {
        refreshCart(response);
      })
      .catch(error => {
        setState({ ...state, cartLoading: false, cartError: error });
      });
  };

  // eslint-disable-next-line
  useEffect(() => fetchCart(), []);

  const refreshCart = response => {
    
    if (response.status === 204 || response.status === 404) {
      setState({ ...state, cartLoading: false });
    } else {
      const lineItems = response.data.line_items;
      const cartAmount = response.data.cart_amount;
      const currency = response.data.currency;
      
      setState({
        ...state,
        cartLoading: false,
        updatingItem: false,
        cart: {
          currency,
          cartAmount,
          lineItems,
          numberItems:
            lineItems.physical_items.length +
            lineItems.digital_items.length +
            lineItems.custom_items.length +
            lineItems.gift_certificates.length,
          redirectUrls: response.data.redirect_urls
        }
      });
    }
    
  };

  const addToCart = async (productId ,retry, quantity) => {
    

    setState({ ...state, addingToCart: productId });
    let resrouce_url = `${baseUrl}bigcommerce/v1/cart`;
    if(cartId) {
        resrouce_url = `${baseUrl}bigcommerce/v1/cart/${cartId}`;
    }
    await fetch(resrouce_url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      body: JSON.stringify({
        line_items: [
          {
            quantity: (typeof(quantity)==='undefined')? 1 : quantity,
            product_id: parseInt(productId, 10)
          }
        ]
      })
    })
      .then(async res => ({ response: await res.json(), status: res.status }))
      .then(async ({ response, status }) => {
        console.log('bahi', 'in add to cart')
        if (status === 404 && !retry) {
          // re create a cart if cart was destroyed
          cartId = undefined;
          if (typeof window !== "undefined") {
            window.localStorage.removeItem('cartId')
          }
          await addToCart(productId, true, quantity);
        }
        status < 300 && addNotification('Item added successfully');

        const lineItems = response.data.line_items;
        const cartAmount = response.data.cart_amount;
        const currency = response.data.currency;
        cartId = response.data.id;
        if (typeof window !== "undefined") {
          window.localStorage.setItem('cartId', JSON.stringify(cartId));
        }
        setState({
          ...state,
          addingToCart: false,
          addedToCart: productId,
          cart: {
            currency,
            cartAmount,
            lineItems,
            numberItems:
              lineItems.physical_items.length +
              lineItems.digital_items.length +
              lineItems.custom_items.length +
              lineItems.gift_certificates.length,
            redirectUrls: response.data.redirect_urls
          }
        });
      })
      .catch(error => {
        setState({ ...state, addingToCart: false, addToCartError: error });
      });
  };

  const updateItemInCart = (itemId, updatedItemData) => {
    fetch(
      `${baseUrl}bigcommerce/v1/cart/${cartId}/${itemId}`,
      {
        credentials: 'same-origin',
        mode: 'cors',
        method: 'post',
        body: JSON.stringify(updatedItemData)
      }
    )
      .then(res => res.json())
      .then(response => {
        refreshCart(response);
      })
      .catch(error => {
        setState({ ...state, cartLoading: false, cartError: error });
      });
  };

  const removeItemFromCart = itemId => {
    fetch(
      `${baseUrl}bigcommerce/v1/delete_item/${cartId}/${itemId}`,
      {
        credentials: 'same-origin',
        mode: 'cors',
        method: 'post'
      }
    )
      .then(res => {
        // addNotification('Item removed successfully');
        if (res.status === 204) {
          cartId = undefined;
          if (typeof window !== "undefined") {
            window.localStorage.removeItem('cartId')
          }
          setState({ ...initialState, cartLoading: false });
          return;
        }
        // addNotification('Item removed successfully');
        return res.json();
      })
      .then(response => {
        response && refreshCart(response);
      })
      .catch(error => {
        setState({ ...state, cartLoading: false, cartError: error });
      });
  };

  const updateCartItemQuantity = (item, action) => {
    const newQuantity = item.quantity + (action === 'minus' ? -1 : 1);
    setState({ ...state, updatingItem: item.id });
    if (newQuantity < 1) {
      return removeItemFromCart(item.id);
    }
    let productVariantReferences = null;

    if (typeof item.product_id !== 'undefined') {
      productVariantReferences = {
        product_id: item.product_id,
        variant_id: item.variant_id
      };
    }

    updateItemInCart(item.id, {
      line_item: {
        quantity: newQuantity,
        ...productVariantReferences
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeItemFromCart,
        updateCartItemQuantity,
        notifications,
        addNotification,
        removeNotification
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
