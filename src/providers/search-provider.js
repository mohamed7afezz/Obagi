import React, { createContext, useState, useEffect } from 'react';
import { navigate } from 'gatsby';


const SearchContext = createContext();
const baseUrl = process.env.Base_URL;


export const SearchProvider = ({children}) => {

    
    const [clinicalSearchResults, setClinicalValue] = useState({});
     const [medicalSearchResults, setMedicalValue] =  useState({});
  async  function  search(key){

    let searchkey= key
  if ( searchkey.length >3) {
    
  
  const getClinicalSearch =  await (await fetch(`${baseUrl}jsonapi/node/clinical_product?filter[title][condition][value]=${searchkey}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
   
  })).json();
  setClinicalValue(getClinicalSearch);
  const getMedicalSearch =  await (await fetch(`${baseUrl}jsonapi/node/medical_product?filter[title][condition][value]=${searchkey}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
 
})).json();
setMedicalValue(getMedicalSearch); 
console.log(getMedicalSearch, getClinicalSearch)
} 
   }

    return (
        <SearchContext.Provider value={{search , medicalSearchResults , clinicalSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;