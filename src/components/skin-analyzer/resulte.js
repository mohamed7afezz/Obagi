import React, { useState,useEffect,useContext } from 'react'
import SearchContext from "../../providers/search-provider"
import ProductCard from '../productcard';
const baseUrl = process.env.Base_URL;

const Resulte = (props) => {
    const {searchInIndexById} = useContext(SearchContext)
    const [loading, setLoading] = useState(false);
    const [clinicalProduct, setClinicalProduct] = useState([]);
    const [medicalProduct, setMedicalProduct] = useState([]);
    useEffect(() => {
        
        const is_medical = props.brandJourney == "Clinical Persona"? 0:1;
        fetch(`${baseUrl}bigcommerce/v1/skin_alnyzer?is_medical=${is_medical}&q4=${props.questionsResult.q4}&q5=${props.questionsResult.q5}&q7=${props.questionsResult.q7}`, {
            credentials: 'same-origin',
          })
        .then(res => res.json())
        .then(response => {
            let listOfProducts = searchInIndexById(response,is_medical);
            if(is_medical){
                setMedicalProduct(listOfProducts);
            }else{ 
                setClinicalProduct(listOfProducts);
            }
            
            setLoading(true)
        })
        .catch(error => {
            setLoading(true)
        });
    },[])
    function startOver(e) {
        props.passChildData('q2','',1);
    }
    function checkDataCondition(condition, data) {
        if (condition) {
          return data;
        } else {
          return '';
        }
    }
    return (
        <>
            {checkDataCondition(loading,
                <>
                    {checkDataCondition((props.brandJourney=="Clinical Persona"),
                        <div className="clinical">
                            <p>We found these Obagi Clinical products for your skincare routine.</p>
                            {clinicalProduct.length>0? clinicalProduct.map(data=>(
                                <ProductCard
                                key={data.field_clinical_id}
                                productLink={data.path.alias}
                               producttitle={data.title}
                               productdescription={{__html:data.field_clinical_description.processed}}
                               productimage={data.relationships.field_clinical_image && data.relationships.field_clinical_image[0].localFile?data.relationships.field_clinical_image[0].localFile.childImageSharp.fluid:''}
                               price={data.field_clinical_price}
                               productId={data.field_clinical_id}
                             />
                            )):''}
                            
                        </div>
                    )}
                    {checkDataCondition((props.brandJourney!="Clinical Persona"),
                        <div className="medical">
                            <p>We found these Obagi Medical products for your skincare routine.</p>
                            {medicalProduct.length>0? medicalProduct.map(data=>(
                                <ProductCard
                                key={data.field_medical_id}
                                productLink={data.path.alias}
                              producttitle={data.title}
                              productdescription={{__html:data.field_medical_description.processed}}
                              productimage={ data.relationships.field_medical_image &&  data.relationships.field_medical_image[0].localFile? data.relationships.field_medical_image[0].localFile.childImageSharp.fluid : ""}
                              price={data.field_medical_price}
                              productId={data.field_medical_id}
                            />
                            )):''}
                        </div>
                    )}
                    
                    <button onClick={startOver}>Start Over</button>
                </>
            )}
            {checkDataCondition(!loading,
                <>
                    <p>Loading...</p>
                </>
            )}
        </>
    )
}
export default Resulte