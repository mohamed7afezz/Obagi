import React, { createContext, useState } from 'react';

const SearchContext = createContext();
const baseUrl = process.env.Base_URL;
const ProductsIndex= {};
export const SearchProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);
   
    const [clinicalSearchResults, setClinicalValue] = useState({});
    const [medicalSearchResults, setMedicalValue] =  useState({});
    const [searchWord, setsearchWord] =  useState({});
    const search = async (key) =>{
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

            setIsLoading(false);
        } 
    }
    const setSearchIndex = (ClinicalProduct,MedicalProduct) =>{
        ProductsIndex.ClinicalProduct = ClinicalProduct;
        ProductsIndex.MedicalProduct = MedicalProduct;
        
    }
    const searchInIndex = (searchkey) =>{
        setIsLoading(true);
        setsearchWord(searchkey);
        let filterdClinicalProduct = ProductsIndex.ClinicalProduct.nodes.filter(function(itm){
            return itm.title.toLowerCase().includes(searchkey) && searchkey != "";
          });
        let filterdMedicalProduct = ProductsIndex.MedicalProduct.nodes.filter(function(itm){
        return itm.title.toLowerCase().includes(searchkey) && searchkey != "";
        });
        setClinicalValue(filterdClinicalProduct);
        setMedicalValue(filterdMedicalProduct); 
        setIsLoading(false);
    }
    const searchInIndexById = (searchkey,is_medical) =>{
        let result ={}
        
        if(is_medical == 0){
            result = ProductsIndex.ClinicalProduct.nodes.filter(function(itm){
                let filterBool = false;
                searchkey.forEach(element => {
                    if(itm.field_clinical_id == element && element != ""){
                        filterBool =true;
                        return;
                    }
                });
                return filterBool;
            });
        }
        if(is_medical != 0){
            result = ProductsIndex.MedicalProduct.nodes.filter(function(itm){
                let filterBool = false;
                searchkey.forEach(element => {
                    if(itm.field_medical_id == element && element != ""){
                        filterBool =true;
                        return;
                    }
                });
                return filterBool;
            });
        }
        return result;
        
    }
    
    return (
        <SearchContext.Provider value={{search,setSearchIndex,searchInIndex,searchInIndexById, isLoading , medicalSearchResults , clinicalSearchResults,searchWord}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;