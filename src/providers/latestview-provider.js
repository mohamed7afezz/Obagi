import React, { createContext, useState, useEffect } from 'react';

const ViewedProductsContext = createContext();
 let clinicalProducts= [];
 let medicalProducts =[];
// if (typeof window != undefined) {
//  clinicalProducts = localStorage.getItem('clinicalViewedProducts')? JSON.parse(localStorage.getItem('clinicalViewedProducts')) : [];
//  medicalProducts = localStorage.getItem('medicalViewedProducts')? JSON.parse(localStorage.getItem('medicalViewedProducts')) : [];
// }

export const ViewedProductsProvider = ({children}) => {
    const [clinicalViewedProducts, setClinicalViewedProducts] = useState(clinicalProducts);
    const [medicalViewedProducts, setMedicalViewedProducts] = useState(medicalProducts);

    function updateProductsViewedStorage(storageName, type, product) {
        let viewedProducts = [];
        // 0- get data from localStorage if exisit
        // if(typeof window != undefined && localStorage.getItem(storageName)) {
        //     viewedProducts = JSON.parse(localStorage.getItem(storageName));
        // }

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
        // 3- update localStorage
        // if(typeof window != undefined) {
        //     localStorage.setItem(storageName, JSON.stringify(viewedProducts));
        // }

        // if(type == 'clincial') {
        //     setClinicalViewedProducts(viewedProducts)
        // } else {
        //     setMedicalViewedProducts(viewedProducts)
        // }
    }

    

    return (
        <ViewedProductsContext.Provider value={{clinicalViewedProducts, medicalViewedProducts, updateProductsViewedStorage}}>
            {children}
        </ViewedProductsContext.Provider>
    )
}

export default ViewedProductsContext;