import React, { createContext, useState, useEffect } from "react";


const cookie = require('cookie')
const CartContext = createContext();

const initialState = {
    cartLoading: false,
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

const baseUrl = process.env.Base_URL;

export const CartProvider = ({children}) => {
    let [cartState, setCartState] = useState(initialState);

    let cartId = undefined;

    if(typeof window !== "undefined") {
        cartId = window.localStorage.getItem('cartId')? JSON.parse(window.localStorage.getItem('cartId')) : undefined;
    }

    // refresh cart
    const refreshCart = response => {
        

        if (response.status === 204 || response.status === 404) {
            setCartState({ ...cartState, cartLoading: false });
        } else {
            const lineItems = response.data.line_items;
            const cartAmount = response.data.cart_amount;
            const currency = response.data.currency;
            
            setCartState({
                ...cartState,
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

    // fn: CreateCart
    async function createCart(productId) {
        //create cart id
        let resrouce_url = `${baseUrl}bigcommerce/v1/cart`;
        if(cartId) {
            resrouce_url = `${baseUrl}bigcommerce/v1/cart/${cartId}`;
        }
        const response = await fetch(resrouce_url, {
            method: 'POST',
            body: JSON.stringify({
                line_items: [
                  {
                    quantity: 1,
                    product_id: parseInt(productId, 10)
                  }
                ]
            })
        });

        const newCart = await response.json();
        
        refreshCart(newCart);

        // save cartId to localStorage
        if(typeof window !== "undefined") {
            cartId = newCart.data.id;
            window.localStorage.setItem('cartId', JSON.stringify(cartId));
        }

    }

    // createCart('339')

    // fn: Add to Cart ---> update Cart
    // check if cart Exisit (Cookies) ---> if no create cart else Add to cart
    function addToCart(productId, retry) {
        if(!cartId) {
            //Create Cart
            createCart(productId);
        }

        // add new product to cart

    }

    // fn: Remove from Cart

    // fn: Get Cart
    async function getCart() {
        let resrouce_url = `${baseUrl}bigcommerce/v1/cart/${cartId}`;

        const response = await fetch(resrouce_url);

        const cartResponse = await response.json();
        
        refreshCart(cartResponse);
        console.log('bahii', cartState);
        
    }

    useEffect(() => {getCart();}, []);

    // fn: Update Cart Item Quantatiy

    return (
        <CartContext.Provider value={{cartId, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;