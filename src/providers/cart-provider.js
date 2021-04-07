import React, { createContext, useState, useEffect } from 'react';


const baseUrl = process.env.Base_URL;
let cartId = undefined;
let savedatalayer=[];

function checkproduct(dlproduct,cartprod) {
  return parseFloat( dlproduct) === parseFloat(cartprod);
}
if (typeof window !== "undefined") {
  cartId = window.localStorage.getItem('cartId') ? JSON.parse(window.localStorage.getItem('cartId')) : undefined;
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
  },
  shippingLoading: true,
  showShippingMethods: false,
  estShipping: 0,
  selectedShippingMethodsId: 0,
  shippingMethods: []
};
let addld = {};
let maxprice = () => {

  document.querySelector("#moremaxprice").classList.remove('hidden')

  var container = document.querySelector("#moremaxprice .container");
  document.querySelector("#moremaxprice").addEventListener("click", function (e) {
    if (e.target !== document.querySelector("#moremaxprice") && e.target !== container) return;
    document.querySelector("#moremaxprice").classList.add("hidden");

  });
}
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
    if (!cartId) {
      setState({ ...state, cartLoading: false })
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

  const addToCart = async (productId, retry, quantity, price, premierid, feild_preimer, productName ,productCat) => {
    
    let findedProduct;
    if (state.cart.lineItems.physical_items) {
      findedProduct = state.cart.lineItems.physical_items.filter(function (itm) {
        return itm.product_id == productId;
      })[0];
    }
    if (findedProduct != undefined && findedProduct.quantity == 3) {
      return;
    }
   
    if (parseFloat(state.cart.cartAmount) + (parseFloat(price) * quantity) > 750) {
      maxprice();
      return
    }
    setState({ ...state, addingToCart: productId });
  
    let resrouce_url = `${baseUrl}bigcommerce/v1/cart`;
    if (cartId) {
      resrouce_url = `${baseUrl}bigcommerce/v1/cart/${cartId}`;
    }
    if (premierid && feild_preimer) {


      await fetch(resrouce_url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        body: JSON.stringify({

          line_items: [
            {
              quantity: (typeof (quantity) === 'undefined') ? 1 : quantity,
              product_id: parseInt(productId, 10),
              option_selections: [{
                option_id: parseFloat(premierid),
                option_value: parseFloat(feild_preimer),
              }]
            }
          ]
        })
      })
        .then(async res => ({ response: await res.json(), status: res.status }))
        .then(async ({ response, status }) => {
          if (status === 404 && !retry) {
            // re create a cart if cart was destroyed
            cartId = undefined;
            if (typeof window !== "undefined") {
              window.localStorage.removeItem('cartId')
            }

            await addToCart(productId, true, quantity, price, premierid, feild_preimer, productName,productCat);

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

          response.data.line_items.physical_items.forEach(item =>{
            
            if (checkproduct(productId,item.product_id)) {
              savedatalayer.push(response.data.line_items.physical_items);
                  window.dataLayer.push({
                  'event': 'addToCart',
                  'ecommerce': {
                    'currencyCode': 'USD',
                    'add': {                                // 'add' actionFieldObject measures.
                      'products': [{                        //  adding a product to a shopping cart.
                        'name': item.name,
                        'id': item.id,
                        'price': item.list_price,
                        'brand': 'Obagi',
                        'category': item.url.includes('medical')? 'medical' : 'clinical',
                        'variant': '',
                        'quantity': item.quantity,
                       }]
                    }
                  }
                });
            
              
                    window.fbq('track', 'AddToCart',
                  // begin parameter object data
                  {
                    content_ids : item.id,
                    content_name : item.name, 
                    content_type : " ",
                    contents : [ {id: item.id, quantity: item.quantity}],
                    currency : "USD", 
                    value : item.list_price
                  }
                 
                  // end parameter object data
                );
           
            
            
              }
              })
        })
        .catch(error => {
          setState({ ...state, addingToCart: false, addToCartError: error });
        });
    } else {
      await fetch(resrouce_url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        body: JSON.stringify({

          line_items: [
            {
              quantity: (typeof (quantity) === 'undefined') ? 1 : quantity,
              product_id: parseInt(productId, 10),
            }
          ]
        })
      })
        .then(async res => ({ response: await res.json(), status: res.status }))
        .then(async ({ response, status }) => {
          if (status === 404 && !retry) {
            // re create a cart if cart was destroyed
            cartId = undefined;
            if (typeof window !== "undefined") {
              window.localStorage.removeItem('cartId')
            }
            await addToCart(productId, true, quantity, price, premierid, feild_preimer, productName,productCat);
          }

          status < 300 && addNotification('Item added successfully');

          const lineItems = response.data.line_items;
          const cartAmount = response.data.cart_amount;
          const currency = response.data.currency;
          cartId = response.data.id;
          if (typeof window !== "undefined") {
            window.localStorage.setItem('cartId', JSON.stringify(cartId));
          }
          window.dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
              'currencyCode': 'USD',
              'add': {                                // 'add' actionFieldObject measures.
                'products': [{                        //  adding a product to a shopping cart.
                  'name': productName,
                  'id': productId,
                  'price': price,
                  'brand': 'Obagi',
                  'category': productCat,
                  'variant': '',
                  'quantity': quantity,
                 }]
              }
            }
          });
    
          window.fbq('track', 'AddToCart',
          // begin parameter object data
       
          
          {
            content_ids : productId,
            content_name : productName, 
            content_type : " ",
            contents : [ {id: productId, quantity: quantity}],
            currency : "USD", 
            value : price
          }
         
          // end parameter object data
        );
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

    }

  };

  const addMultiToCart = async (productsId, retry, quantity, price, productsPremierPoints) => {
    let findedProduct = productsId;
    if (state.cart.lineItems.physical_items) {
      findedProduct = productsId.filter(function (element) {
        let quantity = 0;
        state.cart.lineItems.physical_items.forEach(itm => {
          if (itm.product_id == element) {
            quantity = itm.quantity;
            return;
          }
        });
        if (quantity != 3) {
          return true;
        }
        else {
          return false;
        }
      })
    }
    if (parseFloat(state.cart.cartAmount) + parseFloat(price) > 750) {
      maxprice();
      return
    }

    if (!findedProduct.length > 0) {
      return;
    }

    setState({ ...state, addingToCart: productsId });

    productsId = findedProduct;
    let body = [];
    if (productsId.length > 0) {
      productsId.forEach(element => {
        if (productsPremierPoints) {

          let productPremierPoint = productsPremierPoints.find(x => x.productId === element);
          if (productPremierPoint && productPremierPoint.premierId && productPremierPoint.premierPoints) {
            body.push({
              quantity: (typeof (quantity) === 'undefined') ? 1 : quantity,
              product_id: parseInt(element, 10),
              option_selections: [{
                option_id: parseFloat(productPremierPoint.premierId),
                option_value: parseFloat(productPremierPoint.premierPoints),
              }]
            })
          } else {
            body.push({
              quantity: (typeof (quantity) === 'undefined') ? 1 : quantity,
              product_id: parseInt(element, 10),


            })
          }
        } else {
          body.push({
            quantity: (typeof (quantity) === 'undefined') ? 1 : quantity,
            product_id: parseInt(element, 10),


          })
        }


      });
    }



    let resrouce_url = `${baseUrl}bigcommerce/v1/cart`;
    if (cartId) {
      resrouce_url = `${baseUrl}bigcommerce/v1/cart/${cartId}`;
    }
    await fetch(resrouce_url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      body: JSON.stringify({
        line_items: body
      })
    })
      .then(async res => ({ response: await res.json(), status: res.status }))
      .then(async ({ response, status }) => {
        if (status === 404 && !retry) {
          // re create a cart if cart was destroyed
          cartId = undefined;
          if (typeof window !== "undefined") {
            window.localStorage.removeItem('cartId')
          }
          await addMultiToCart(productsId, true, quantity, price, productsPremierPoints);
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
          addedToCart: productsId,
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

  const removeItemFromCart = (itemId, product) => {
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
        for (let i = 0; i < state.cart.lineItems.physical_items.length; i++) {
          if (state.cart.lineItems.physical_items[i].id === itemId) {
            window.dataLayer.push({
              'event': 'remove_from_cart',
              'ecommerce': {
                'items': [{
                  'item_name': state.cart.lineItems.physical_items[i].name, // Name or ID is required.
                  'item_id': state.cart.lineItems.physical_items[i].productId,
                  'price': state.cart.lineItems.physical_items[i].list_price,
                  'item_brand': 'Obagi',
                  'item_category': state.cart.lineItems.physical_items[i].url.includes('medical')? 'medical' : 'clinical',
                  'item_variant': '',
                  'item_list_name': '',  // If associated with a list selection.
                  'item_list_id': '',  // If associated with a list selection.
                  'index': 1,  // If associated with a list selection.
                  'quantity': state.cart.lineItems.physical_items[i].quantity
                }]
              }
            });
            
          }
          
        }
        response && refreshCart(response);
      })
      .catch(error => {
        setState({ ...state, cartLoading: false, cartError: error });
      });
  };

  const updateCartItemQuantity = (item, action) => {
    const newQuantity = item.quantity + (action === 'minus' ? -1 : 1);
    const saveprice = item.list_price + (action === 'minus' ? -1 : 1)
    if(newQuantity > 0 && newQuantity < 4){
      for (let i = 0; i < state.cart.lineItems.physical_items.length; i++) {
        if (state.cart.lineItems.physical_items[i].id === item.id && action === 'minus') {
          window.dataLayer.push({
            'event': 'remove_from_cart',
            'ecommerce': {
              'items': [{
                'item_name': state.cart.lineItems.physical_items[i].name, // Name or ID is required.
                'item_id': state.cart.lineItems.physical_items[i].productId,
                'price': state.cart.lineItems.physical_items[i].list_price,
                'item_brand': 'Obagi',
                'item_category': state.cart.lineItems.physical_items[i].url.includes('medical')? 'medical' : 'clinical',
                'item_variant': '',
                'item_list_name': '',  // If associated with a list selection.
                'item_list_id': '',  // If associated with a list selection.
                'index': 1,  // If associated with a list selection.
                'quantity': state.cart.lineItems.physical_items[i].quantity
              }]
            }
          });
          
        }
        
      }
      for (let i = 0; i < state.cart.lineItems.physical_items.length; i++) {
        if (state.cart.lineItems.physical_items[i].id === item.id && action !== 'minus') {
  
      window.dataLayer.push({
      'event': 'addToCart',
      'ecommerce': {
        'currencyCode': 'USD',
        'add': {                                // 'add' actionFieldObject measures.
          'products': [{                        //  adding a product to a shopping cart.
            'name': state.cart.lineItems.physical_items[i].name,
            'id': state.cart.lineItems.physical_items[i].id,
            'price': state.cart.lineItems.physical_items[i].list_price,
            'brand': 'Obagi',
            'category': state.cart.lineItems.physical_items[i].url.includes('medical')? 'medical' : 'clinical',
            'variant': '',
            'quantity': state.cart.lineItems.physical_items[i].quantity,
           }]
        }
      }
    });
    window.fbq('track', 'AddToCart',
    // begin parameter object data
    {
      content_ids : state.cart.lineItems.physical_items[i].id,
      content_name : state.cart.lineItems.physical_items[i].name, 
      content_type : " ",
      contents : [ {id: state.cart.lineItems.physical_items[i].id, quantity: state.cart.lineItems.physical_items[i].quantity}],
      currency : "USD", 
      value : state.cart.lineItems.physical_items[i].list_price
    }
   
    // end parameter object data
  );
  }
  
}
    }
    setState({ ...state, updatingItem: item.id });
    if (newQuantity < 1) {
      return removeItemFromCart(item.id, item);
    }
    if (newQuantity > 3) {
    
      return updateItemInCart(item.id, {
        line_item: {
          quantity: 3,
          ...productVariantReferences
        }
      });
    }
    if (parseFloat(saveprice) + parseFloat(state.cart.cartAmount) > 750 && action != 'minus') {
      maxprice();
      setState({ ...state, updatingItem: false });
      return;
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

  //Shipping
  const fetchShippingMethods = () => {
    fetch(`${baseUrl}bigcommerce/v1/shipping/zones/1/methods`, {
      credentials: 'same-origin',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(response => {
        addShippingMethods(response);
      })
      .catch(error => {
      
      });
  };
  const addShippingMethods = response => {

    if (response.status === 204 || response.status === 404) {
 
    } else {

      let defulteShippingMethodsId = 0;
      let enabledShippingMethods = [];
      if (response.length > 0) {
        response.forEach(element => {
          //show only enabled methods
          if (element.enabled) {
            enabledShippingMethods.push(element);
          }
        });
      }

      if (enabledShippingMethods.length > 0) {
        //sort Shipping Methods by rate
        enabledShippingMethods.sort(function (a, b) {
          let aRate = a.settings.rate ? a.settings.rate : 0;
          let bRate = b.settings.rate ? b.settings.rate : 0;
          return parseFloat(aRate) - parseFloat(bRate);
        });

        //set defulte Shipping Methods to first one after sorting
        //defulteShippingMethodsId = enabledShippingMethods[0].id;
      }

      //update state with methods
      setState({
        ...state,
        shippingLoading: false,
        showShippingMethods: true,
        selectedShippingMethodsId: defulteShippingMethodsId,
        shippingMethods: enabledShippingMethods
      });
    }

  };
  const changeShippingMethods = (e) => {
    //update state with methods
    let id = e.target.id;
    let rate = e.target.value;
    setState({
      ...state,
      selectedShippingMethodsId: id,
      estShipping: rate
    });
  };
  const showShippingMethods = (value) => {
    //update state with methods
    setState({
      ...state,
      selectedShippingMethodsId: 0,
      estShipping: 0,
      showShippingMethods: value
    });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        addMultiToCart,
        fetchShippingMethods,
        changeShippingMethods,
        showShippingMethods,
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
