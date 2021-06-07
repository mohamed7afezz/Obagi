import React, { createContext, useState } from 'react';

const SearchContext = createContext();
const baseUrl = process.env.Base_URL;
const ProductsIndex = {};
export const SearchProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [clinicalSearchResults, setClinicalValue] = useState({});
    const [medicalSearchResults, setMedicalValue] = useState({});
    const [searchWord, setsearchWord] = useState({});
    const search = async (key) => {
        const savekey = key;
        let searchkey = key
        if (searchkey.length > 2) {

            setIsLoading(true);
            const getClinicalSearch = await (await fetch(`${baseUrl}jsonapi/node/clinical_product?filter[title][condition][value]=${searchkey}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',

            })).json();
            setClinicalValue(getClinicalSearch);
            const getMedicalSearch = await (await fetch(`${baseUrl}jsonapi/node/medical_product?filter[title][condition][value]=${searchkey}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',

            })).json();
            setMedicalValue(getMedicalSearch);
            setsearchWord(savekey)

            setIsLoading(false);

        }
    }
    const setSearchIndex = (ClinicalProduct, MedicalProduct) => {
        ProductsIndex.ClinicalProduct = ClinicalProduct;
        ProductsIndex.MedicalProduct = MedicalProduct;

    }
    const searchInIndex = (searchkey) => {
        setIsLoading(true);
        setsearchWord(searchkey);
        let filterdClinicalProduct = ProductsIndex.ClinicalProduct.nodes.filter(function (itm) {
            if (itm.field_clinical_free_sample != true) {
                let item = itm.title.replace("<sup>®</sup>", "");
                item = item.replace("<sup>®</sup>", "");
                item = item.replace("<sup>™</sup>", "")
                item = item.replace("<sup>TM</sup>", "");
                item = item.replace("-", " ");
                let itemkey = searchkey.replace("®", "");
                itemkey = itemkey.replace("™", "");
                itemkey = itemkey.replace("TM", "");
                itemkey = itemkey.replace("-", " ");
                return item.toLowerCase().includes(itemkey) && itemkey != "";
            }
        });
        let filterdMedicalProduct = ProductsIndex.MedicalProduct.nodes.filter(function (itm) {
            if (itm.field_medical_free_sample != true) {
                let item = itm.title.replace("<sup>®</sup>", "");
                item = item.replace("<sup>®</sup>", "");
                item = item.replace("<sup>™</sup>", "")
                item = item.replace("<sup>TM</sup>", "");
                item = item.replace("-", " ");
                let itemkey = searchkey.replace("®", "");
                itemkey = itemkey.replace("™", "");
                itemkey = itemkey.replace("TM", "");
                itemkey = itemkey.replace("-", " ");
                return item.toLowerCase().includes(itemkey) && itemkey != " ";
            }

        });
        setClinicalValue(filterdClinicalProduct);
        setMedicalValue(filterdMedicalProduct);
        setIsLoading(false);
    }
    const searchInIndexById = (searchkey, is_medical) => {
        let result = [];

        if (is_medical == undefined || is_medical == null) {

            for (let i = 0; i < searchkey.length; i++) {
                let productID = searchkey[i];
                let productType = ProductsIndex.MedicalProduct.nodes.findIndex(item => item.field_medical_id == productID) > -1 ? 'medical'
                    :
                    ProductsIndex.ClinicalProduct.nodes.findIndex(item => item.field_clinical_id == productID) > -1 ? 'clinical'
                        : "";
                if (productType == "") {
                    return
                }
                else if (productType == 'medical') {
                    let prodIndex = ProductsIndex.MedicalProduct.nodes.findIndex(item => item.field_medical_id == productID);

                    let prod = ProductsIndex.MedicalProduct.nodes[prodIndex];
                    prod.type = "medical";
                    result.push(prod);

                } else {
                    let prodIndex = ProductsIndex.ClinicalProduct.nodes.findIndex(item => item.field_clinical_id == productID);
                    let prod = ProductsIndex.ClinicalProduct.nodes[prodIndex];
                    prod.type = 'clinical';
                    result.push(prod)

                }
            }

            return result;
        }
        if (is_medical == 0) {
            searchkey.forEach(element => {
                let findedItems = ProductsIndex.ClinicalProduct.nodes.filter(function (itm) {
                    return itm.field_clinical_id == element && element != "";
                });
                if (findedItems.length > 0) {
                    result.push(findedItems[0]);
                }
            });
        }
        if (is_medical > 0) {


            searchkey.forEach(element => {
                let findedItems = ProductsIndex.MedicalProduct.nodes.filter(function (itm) {
                    return itm.field_medical_id == element && element != "";
                });
                if (findedItems.length > 0) {
                    result.push(findedItems[0]);
                }
            });


        }
        return result;

    }

    return (
        <SearchContext.Provider value={{ search, setSearchIndex, searchInIndex, searchInIndexById, isLoading, medicalSearchResults, clinicalSearchResults, searchWord }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;