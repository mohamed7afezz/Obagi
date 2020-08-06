import React, { createContext, useState, useEffect } from 'react';

const ViewedProductsContext = createContext();

let clinicalProducts= [];
let medicalProducts =[];
if (typeof window !== "undefined") {
 clinicalProducts = window.localStorage.getItem('clinicalViewedProducts')? JSON.parse(window.localStorage.getItem('clinicalViewedProducts')) : [];
 medicalProducts = window.localStorage.getItem('medicalViewedProducts')? JSON.parse(window.localStorage.getItem('medicalViewedProducts')) : [];
}

export const ViewedProductsProvider = ({children}) => {

    function getViewedProducts(storageName) {
        if(typeof window !== "undefined") {
            return window.localStorage.getItem(storageName)? JSON.parse(window.localStorage.getItem(storageName)) : [];
        }
    }

    function updateProductsViewedStorage(storageName, type, product) {
        let viewedProducts = [];
        // 0- get data from window.localStorage if exisit
        if(typeof window !== "undefined" && window.localStorage.getItem(storageName)) {
            viewedProducts = JSON.parse(window.localStorage.getItem(storageName));
        }

        // 1- check if it is in array
        let isExisit = viewedProducts.some(item => {
            return item.title === product.title;
        });
        
        // 2- remove from array and it to first index if exisit else add to first index
        if(isExisit) {
            // remove and update position
            // a. get position
            let positionIndex = viewedProducts.findIndex(item => {
                return item.title === product.title;
            }) 
            // b. update position
            viewedProducts.splice(positionIndex, 1);
            viewedProducts.splice(0, 0, product);
        } else {
            // push to array at firsit position
            viewedProducts.splice(0,0, product);
            if(viewedProducts.length > 4) {
                viewedProducts.pop();
            }
        }
        // 3- update window.localStorage
        if(typeof window !== "undefined") {
            window.localStorage.setItem(storageName, JSON.stringify(viewedProducts));
        }
    }

    

    return (
        <ViewedProductsContext.Provider value={{getViewedProducts, updateProductsViewedStorage}}>
            {children}
        </ViewedProductsContext.Provider>
    )
}

export default ViewedProductsContext;