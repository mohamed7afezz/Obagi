import React, { useState, useEffect, useContext } from 'react'
import SearchContext from "../../providers/search-provider"
import ProductCard from '../productcard';
import resulteSkinStyle from "../../assets/scss/components/skin-analyzer.module.scss"
import { Link } from 'gatsby';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import CartContext from '../../providers/cart-provider';
import { MedicalResultType, ClinicalResultType } from './brandJourney';
import { checkStock } from '../../assets/js/stock';
const baseUrl = process.env.Base_URL;
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
var skus= [];

const Resulte = (props) => {
    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
    function GetProductsIds() {
        if (typeof(skus) === undefined) {
            return []
        }
        let ProductsId = [];
        if(props.brandJourney == "Clinical Persona"){
            for (let i = 0; i < clinicalProduct.length; i++) {

                if (skus[clinicalProduct[i].field_clinical_sku]) {
                 ProductsId.push(clinicalProduct[i].field_clinical_id)
                } 
             }
        }
        else{
            for (let i = 0; i < medicalProduct.length; i++) {
               if (skus[medicalProduct[i].field_medical_sku]) {
                ProductsId.push(medicalProduct[i].field_medical_id)
               } 
            }
            
        }
        return ProductsId;
    }
    var totalprice = 0;
    var productsPremierPoints = [];
    const value = useContext(CartContext)
    const addMultiToCart = value && value.addMultiToCart;
    const addingToCart = value && value.state.addingToCart;
    const { searchInIndexById } = useContext(SearchContext)
    const [loading, setLoading] = useState(false);
    const [clinicalProduct, setClinicalProduct] = useState([]);
    const [medicalProduct, setMedicalProduct] = useState([]);
    useEffect(() => {

        const is_medical = props.brandJourney == "Clinical Persona" ? 0 : 1;
        fetch(`${baseUrl}bigcommerce/v1/skin_alnyzer`, {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify({
                is_medical: is_medical,
                q4: props.questionsResult.q4,
                q5: props.questionsResult.q5,
                q7: props.questionsResult.q7
            })
        })
            .then(res => res.json())
            .then(response => {
                let listOfProducts = searchInIndexById(response, is_medical);
                if (is_medical) {
                    setMedicalProduct(listOfProducts);
                } else {
                    setClinicalProduct(listOfProducts);
                }

                setLoading(true);

                if (typeof window != undefined) {
                    checkStock(baseUrl,function(response) {
                        skus=response;                    
                    });
                }
            })
            .catch(error => {
                setLoading(true)
            });
    }, [])
    function startOver(e) {
        props.passChildData('q2', '', 1);
        topFunction();
    }
    function checkDataCondition(condition, data) {
        if (condition) {
            return data;
        } else {
            return '';
        }
    }
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } 
    return (
        <>
     
        
            {checkDataCondition(loading,
                <>
                    {checkDataCondition((props.brandJourney == "Clinical Persona"),
                    <>
                           {
                               <div className="container-fluid clinical-analyzer">
                               <div className={["blue-color  Analyzer-padding breadcramp-con"].join(" ")}>
                <p className="breadcramp">
                    <Link to="/">Home</Link>{" "} / <span>Skin Analyzer</span>
                        </p>
                
                </div> </div> }
                        <div className={["clinical", resulteSkinStyle.clinical].join(" ")}>
                            
                            <div className="container-fluid"><div className="row">
                                <div className={["offset-lg-1 col-12 col-lg-10", resulteSkinStyle.resultmobhead].join(" ")}>
                                    <div className={[resulteSkinStyle.headercon, "col-lg-8", "offset-lg-2"].join(" ")}>
                                        <h1 className={resulteSkinStyle.resPageTitle}>
                                            We found these <Link to="/clinical">Obagi Clinical</Link><sup>®</sup> products for your skin care routine.
                                    </h1>
                                        <div className="show-mob">
                                            <div className={[resulteSkinStyle.collapseContainer,"d-none"].join(" ")}>
                                                <button class="toggle-icon collapsed" data-toggle="collapse" href="#abc" role="button" aria-expanded="false" aria-controls="abc">ABC’s of Skin care</button>

                                                <div class="collapse multi-collapse " id="abc">
                                                <div class="card card-body">
                                                 <p className={resulteSkinStyle.cardDesc}>   These three vitamins offer a foundation for any basic skincare regimen:
                                                 </p><p className={resulteSkinStyle.cardtitle}>Vitamin A:</p>
                                                 <p className={resulteSkinStyle.cardDesc}>  Includes a family of ingredients also known as retinoids. Retinoids can help dimish the appearance of fine lines, wrinkles and photoaging
                                                 </p> <p className={resulteSkinStyle.cardtitle}>Vitamin B:</p>
                                                    <p className={resulteSkinStyle.cardDesc}>Broad-spectrum UV protection. Every patient is a candidate for a sunscreen product.
                                                    </p> <p className={resulteSkinStyle.cardtitle}>Vitamin C:</p>
                                                    <p className={resulteSkinStyle.cardDesc}>   Improves overall photodamaged appearance, bright skin, provides antioxidant defense, evens skin tone, and reduces the appearance of fine lines and wrinkles.
                                                    </p></div>
                                                </div>
                                            </div>
                                            <div className={resulteSkinStyle.collapseContainer}>

                                                <button class="toggle-icon collapsed" type="button" data-toggle="collapse" data-target="#answersmob" aria-expanded="false" aria-controls="answersmob">Your Answers</button>

                                                <div class="collapse multi-collapse " id="answersmob">
                                                    <div class="card card-body">
                                                        <div className="col-12 ">

                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Age:</span> {props.questionsResult.q1} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Willing to see a physician:</span> {props.questionsResult.q2} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Care Type:</span> {props.questionsResult.q3} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Skin Concern</span> {props.questionsResult.q4} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Skin Type:</span> {props.questionsResult.q5} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Skin Tone:</span> {props.questionsResult.q6} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Ingredients:</span> {props.questionsResult.q7} </p>

                                                            <button className={resulteSkinStyle.startovermob} onClick={startOver}>Start Over</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={[resulteSkinStyle.addtobagcon].join(" ")}>
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic skin care regimen:</p>
                                            <button
                                                onClick={() => {
                                                    let quantity = 1;                                                 
                                                    addMultiToCart(GetProductsIds(), false, quantity, totalprice);
                                                }}
                                                disabled={arraysEqual(addingToCart, GetProductsIds())}
                                                className={[resulteSkinStyle.addtobag, resulteSkinStyle.addtobagheadbtn, "hide-mob","col-lg-3"].join(" ")}>
                                                {arraysEqual(addingToCart, GetProductsIds()) ? "Adding all to Bag" : "Add all to Bag"}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className={["offset-lg-1 col-12 col-lg-11", resulteSkinStyle.resultsBody].join(' ')}>
                                    <div className="col-md-2 col-lg-2 d-mob-none">
                                        <p className={resulteSkinStyle.yourAnswer}>Your Answers</p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Age:</span> {props.questionsResult.q1} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Willing to see a physician:</span> {props.questionsResult.q2} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Care Type:</span> {props.questionsResult.q3} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Skin Concern</span> {props.questionsResult.q4} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Skin Type:</span> {props.questionsResult.q5} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Skin Tone:</span> {props.questionsResult.q6} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Ingredients:</span> {props.questionsResult.q7} </p>

                                        <button className={resulteSkinStyle.startover} onClick={startOver}>Start Over</button>

                                    </div>
                                    <div className="col-12 col-md-10 col-lg-7 results-card-container">
                                        {clinicalProduct.length > 0 ? clinicalProduct.map((data, index) => {
                                            totalprice = parseFloat(totalprice) + parseFloat(data.field_clinical_price)
                                            return <ProductCard
                                                key={data.field_clinical_id}
                                                Type={ClinicalResultType[index]}
                                                productLink={data.path.alias}
                                                producttitle={data.title}
                                                productCat="clinical"
                                                productdescription={{ __html: data.field_clinical_description.processed }}
                                                productimage={data.relationships.field_clinical_image && data.relationships.field_clinical_image[0].localFile ? data.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : ''}
                                                price={data.field_clinical_price}
                                                productId={data.field_clinical_id}
                                                Sku={data.field_clinical_sku}
                                                minQuantity={(data.field_min_quantity == 0 || data.field_min_quantity > 0)? data.field_min_quantity : ""}
                                            />
                                        }) : ''}
                                        <div className={[resulteSkinStyle.addtobagcon, resulteSkinStyle.addtobagcondata].join(" ")}>
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic skin care regimen:</p>
                                            <button
                                                onClick={() => {
                                                    let quantity = 1;
                                                    addMultiToCart(GetProductsIds(), false, quantity, totalprice);
                                                }}
                                                disabled={arraysEqual(addingToCart, GetProductsIds())}
                                                className={[resulteSkinStyle.addtobag, resulteSkinStyle.addtobagheadbtn, "col-lg-2"].join(" ")}>
                                                {arraysEqual(addingToCart, GetProductsIds()) ? "Adding all to Bag" : "Add all to Bag"}
                                            </button>                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </>
                    )}
                    {checkDataCondition((props.brandJourney != "Clinical Persona"),
                       <>
                          { <div className="container-fluid medical-analyzer">
                              <div className={["blue-color  Analyzer-padding breadcramp-con"].join(" ")}>
              <p className="breadcramp">
                <Link to="/">Home</Link>{" "}
               / <span>Skin Analyzer</span>
                    </p>
                    </div> 
              </div>}
                       <div className="medical">
                         
                            <div className="container-fluid"><div className="row">
                                <div className={["offset-lg-1 col-12 col-lg-10", resulteSkinStyle.resultmobhead].join(" ")}>
                                    <div className={[resulteSkinStyle.headercon, "col-lg-8", "offset-lg-2"].join(" ")}>
                                        <h1 className={resulteSkinStyle.resPageTitle}>
                                            We found these <Link to="/medical">Obagi Medical</Link><sup>®</sup> products for your skin care routine.
                                    </h1>
                                        <div className="show-mob">
                                            <div className={[resulteSkinStyle.collapseContainer,"d-none"].join(" ")}>
                                                <button class="toggle-icon collapsed" data-toggle="collapse" href="#abc" role="button" aria-expanded="false" aria-controls="abc">ABC’s of Skin care</button>

                                                <div class="collapse multi-collapse " id="abc">
                                                <div class="card card-body">
                                                 <p className={resulteSkinStyle.cardDesc}>   These three vitamins offer a foundation for any basic skincare regimen:
                                                 </p><p className={resulteSkinStyle.cardtitle}>Vitamin A:</p>
                                                 <p className={resulteSkinStyle.cardDesc}>  Includes a family of ingredients also known as retinoids. Retinoids can help dimish the appearance of fine lines, wrinkles and photoaging
                                                 </p> <p className={resulteSkinStyle.cardtitle}>Vitamin B:</p>
                                                    <p className={resulteSkinStyle.cardDesc}>Broad-spectrum UV protection. Every patient is a candidate for a sunscreen product.
                                                    </p> <p className={resulteSkinStyle.cardtitle}>Vitamin C:</p>
                                                    <p className={resulteSkinStyle.cardDesc}>   Improves overall photodamaged appearance, bright skin, provides antioxidant defense, evens skin tone, and reduces the appearance of fine lines and wrinkles.
                                                    </p></div>
                                                </div>
                                            </div>
                                            <div className={resulteSkinStyle.collapseContainer}>

                                                <button class="toggle-icon collapsed" type="button" data-toggle="collapse" data-target="#answersmob" aria-expanded="false" aria-controls="answersmob">Your Answers</button>

                                                <div class="collapse multi-collapse " id="answersmob">
                                                    <div class="card card-body">
                                                        <div className="col-12 ">

                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Age:</span> {props.questionsResult.q1} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Willing to see a physician:</span> {props.questionsResult.q2} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Care Type:</span> {props.questionsResult.q3} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Skin Concern</span> {props.questionsResult.q4} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Skin Type:</span> {props.questionsResult.q5} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Skin Tone:</span> {props.questionsResult.q6} </p>
                                                            <p className={resulteSkinStyle.answersMob}><span className={resulteSkinStyle.qtitle}>Ingredients:</span> {props.questionsResult.q7} </p>

                                                            <button className={resulteSkinStyle.startovermob} onClick={startOver}>Start Over</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={resulteSkinStyle.addtobagcon}>
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic skin care regimen:</p>
                                            <button
                                                onClick={() => {
                                                    let quantity = 1;
                                                    addMultiToCart(GetProductsIds(), false, quantity, totalprice,productsPremierPoints);
                                                }}
                                                disabled={arraysEqual(addingToCart, GetProductsIds())}
                                                className={[resulteSkinStyle.addtobag, resulteSkinStyle.addtobagheadbtn,"hide-mob", "col-lg-2"].join(" ")}>
                                                {arraysEqual(addingToCart,GetProductsIds()) ? "Adding all to Bag" : "Add all to Bag"}
                                            </button>                                        </div>
                                        <p className={[resulteSkinStyle.resPageSubdetail, "show-mob"].join(" ")}>If you have detailed questions about your individual skin care or products needs,
                                        it is best to talk to a physician. <Link to="/medical/hcpfinder" >Click here to find an Obagi physician</Link> near you.</p>
                                    </div>

                                </div>
                                <div className={["offset-lg-1 col-12 col-lg-11", resulteSkinStyle.resultsBody].join(' ')}>
                                    <div className="col-md-2 col-lg-2 d-mob-none">
                                        <p className={resulteSkinStyle.yourAnswer}>Your Answers</p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Age:</span> {props.questionsResult.q1} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Willing to see a physician:</span> {props.questionsResult.q2} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Care Type:</span> {props.questionsResult.q3} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Skin Concern</span> {props.questionsResult.q4} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Skin Type:</span> {props.questionsResult.q5} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Skin Tone:</span> {props.questionsResult.q6} </p>
                                        <p className={resulteSkinStyle.answers}><span className={resulteSkinStyle.qtitle}>Ingredients:</span> {props.questionsResult.q7} </p>

                                        <button className={resulteSkinStyle.startover} onClick={startOver}>Start Over</button>
                                        <div className={resulteSkinStyle.talktophy}>
                                            <p>If you have detailed questions about your individual skin care or products, it is best to talk to a physician. <Link to="/medical/hcpfinder" >Click here to find an Obagi physician</Link> near you.</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-10 col-lg-7 results-card-container">
                                        {medicalProduct.length > 0 ? medicalProduct.map((data, index) => {
                                            totalprice = parseFloat(totalprice) + parseFloat(data.field_medical_price)
                                           
                                            productsPremierPoints.push(
                                                {
                                                    productId: data.field_medical_id,
                                                    premierId: data.field_medical_premier_points_id,
                                                    premierPoints: data.field_medical_premier_points
                                                });
                                            return <ProductCard
                                                key={data.field_medical_id}
                                                productLink={data.path.alias}
                                                producttitle={data.title}
                                                productCat="medical"
                                                productdescription={{ __html: data.field_medical_description.processed }}
                                                productimage={data.relationships.field_medical_image && data.relationships.field_medical_image[0].localFile ? data.relationships.field_medical_image[0].localFile.childImageSharp.fluid : ""}
                                                price={data.field_medical_price}
                                                productId={data.field_medical_id}
                                                Type={MedicalResultType[index]}
                                                Sku={data.field_medical_sku ? data.field_medical_sku : "none"}
                                                minQuantity={(data.field_min_quantity == 0 || data.field_min_quantity > 0)? data.field_min_quantity : ""}
                                                premierid={data.field_medical_premier_points_id ? data.field_medical_premier_points_id : ""}
                                                feild_preimer={data.field_medical_premier_points ? data.field_medical_premier_points : ""}
                                            />
                                        }) : ''}
                                        <div className={[resulteSkinStyle.addtobagcon, resulteSkinStyle.addtobagcondata].join(" ")}>
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic skin care regimen:</p>
                                            <button
                                                onClick={() => {
                                                    let quantity = 1
                                                    addMultiToCart(GetProductsIds(), false, quantity, totalprice,productsPremierPoints);
                                                }}
                                                className={[resulteSkinStyle.addtobag, resulteSkinStyle.addtobagheadbtn, "col-lg-3"].join(" ")}
                                                disabled={arraysEqual(addingToCart, GetProductsIds())}>
                                                {arraysEqual(addingToCart, GetProductsIds()) ? "Adding all to Bag" : "Add all to Bag"}</button>                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                                                </>
                    )}


                </>
            )}
            {checkDataCondition(!loading,
                <div>
                    <ClipLoader
                        css={spinner}
                        size={150}
                        color={"#123abc"}

                    />
                </div>
            )}
        </>
    )
}
export default Resulte