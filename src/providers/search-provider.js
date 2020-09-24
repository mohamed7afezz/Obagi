import React, { createContext, useState } from 'react';

const SearchContext = createContext();
const baseUrl = process.env.Base_URL;


export const SearchProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);
   
    const [clinicalSearchResults, setClinicalValue] = useState({});
    const [medicalSearchResults, setMedicalValue] =  useState({});
    const [searchWord, setsearchWord] =  useState({});
  async  function  search(key){
    const savekey = key;
    let searchkey= key
  if ( searchkey.length >2) {
    
  setIsLoading(true);
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
setsearchWord(savekey)
console.log(savekey,getMedicalSearch, getClinicalSearch)

setIsLoading(false);
} 
   }

    return (
        <SearchContext.Provider value={{search, isLoading , medicalSearchResults , clinicalSearchResults,searchWord}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;