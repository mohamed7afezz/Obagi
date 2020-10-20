import React, { useState, useEffect, useContext } from 'react'
import SearchContext from "../../providers/search-provider"
import ProductCard from '../productcard';
import resulteSkinStyle from "../../assets/scss/components/skin-analyzer.module.scss"
import { Link } from 'gatsby';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const baseUrl = process.env.Base_URL;
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
const Resulte = (props) => {
    console.log(props)
    const { searchInIndexById } = useContext(SearchContext)
    const [loading, setLoading] = useState(false);
    const [clinicalProduct, setClinicalProduct] = useState([]);
    const [medicalProduct, setMedicalProduct] = useState([]);
    useEffect(() => {

        const is_medical = props.brandJourney == "Clinical Persona" ? 0 : 1;
        fetch(`${baseUrl}bigcommerce/v1/skin_alnyzer?is_medical=${is_medical}&q4=${props.questionsResult.q4}&q5=${props.questionsResult.q5}&q7=${props.questionsResult.q7}`, {
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(response => {
                let listOfProducts = searchInIndexById(response, is_medical);
                if (is_medical) {
                    setMedicalProduct(listOfProducts);
                } else {
                    setClinicalProduct(listOfProducts);
                }

                setLoading(true)
            })
            .catch(error => {
                setLoading(true)
            });
    }, [])
    function startOver(e) {
        props.passChildData('q2', '', 1);
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
                    {checkDataCondition((props.brandJourney == "Clinical Persona"),
                        <div className={["clinical", resulteSkinStyle.clinical].join(" ")}>
                            <div className="container-fluid"><div className="row">
                                <div className={["offset-lg-1 col-12 col-lg-10", resulteSkinStyle.resultmobhead].join(" ")}>
                                    <div className={[resulteSkinStyle.headercon, "col-lg-8", "offset-lg-2"].join(" ")}>
                                        <h1 className={resulteSkinStyle.resPageTitle}>
                                            We found these Obagi <Link to="/clinical"> Clinical products</Link> for your Skin care routine.
                                    </h1>
                                        <div className="show-mob">
                                            <div className={resulteSkinStyle.collapseContainer}>
                                                <button class="toggle-icon" data-toggle="collapse" href="#abc" role="button" aria-expanded="false" aria-controls="abc">ABC’s of Skin care</button>

                                                <div class="collapse multi-collapse show" id="abc">
                                                    <div class="card card-body">
                                                        loaram  loaram  loaram  loaram  loaram  loaram  loaram  loaram
                                        </div>
                                                </div>
                                            </div>
                                            <div className={resulteSkinStyle.collapseContainer}>

                                                <button class="toggle-icon" type="button" data-toggle="collapse" data-target="#answersmob" aria-expanded="false" aria-controls="answersmob">Your Answers</button>

                                                <div class="collapse multi-collapse show" id="answersmob">
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
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic Skin care regimen:</p>
                                            <button className={[resulteSkinStyle.addtobag, resulteSkinStyle.addtobagheadbtn, "col-lg-3"].join(" ")}>Add all to Bag</button>
                                        </div>
                                    </div>

                                </div>
                                <div className={["offset-lg-1 col-12 col-lg-11", resulteSkinStyle.resultsBody].join(' ')}>
                                    <div className="col-lg-2 d-mob-none">
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
                                    <div className="col-12 col-lg-7 results-card-container">
                                        {clinicalProduct.length > 0 ? clinicalProduct.map(data => (
                                            <ProductCard
                                                key={data.field_clinical_id}
                                                productLink={data.path.alias}
                                                producttitle={data.title}
                                                productdescription={{ __html: data.field_clinical_description.processed }}
                                                productimage={data.relationships.field_clinical_image && data.relationships.field_clinical_image[0].localFile ? data.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : ''}
                                                price={data.field_clinical_price}
                                                productId={data.field_clinical_id}
                                            />
                                        )) : ''}
                                        <div className={[resulteSkinStyle.addtobagcon, resulteSkinStyle.addtobagcondata].join(" ")}>
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic Skin care regimen:</p>
                                            <button className={[resulteSkinStyle.addtobag, "col-lg-3"].join(" ")}>Add all to Bag</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
                    {checkDataCondition((props.brandJourney != "Clinical Persona"),
                        <div className="medical">
                            <div className="container-fluid"><div className="row">
                                <div className={["offset-lg-1 col-12 col-lg-10",resulteSkinStyle.resultmobhead].join(" ")}>
                                    <div className={[resulteSkinStyle.headercon, "col-lg-8", "offset-lg-2"].join(" ")}>
                                        <h1 className={resulteSkinStyle.resPageTitle}>
                                            We found these Obagi <Link to="/medical"> Medical products</Link> for your Skin care routine.
                                    </h1>
                                    <div className="show-mob">
                                            <div className={resulteSkinStyle.collapseContainer}>
                                                <button class="toggle-icon" data-toggle="collapse" href="#abc" role="button" aria-expanded="true" aria-controls="abc">ABC’s of Skin care</button>

                                                <div class="collapse multi-collapse show " id="abc">
                                                    <div class="card card-body">
                                                        loaram  loaram  loaram  loaram  loaram  loaram  loaram  loaram
                                        </div>
                                                </div>
                                            </div>
                                            <div className={resulteSkinStyle.collapseContainer}>

                                                <button class="toggle-icon" type="button" data-toggle="collapse" data-target="#answersmob" aria-expanded="true" aria-controls="answersmob">Your Answers</button>

                                                <div class="collapse multi-collapse show " id="answersmob">
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
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic Skin care regimen:</p>
                                           
                                            <button className={[resulteSkinStyle.addtobag,  resulteSkinStyle.addtobagheadbtn,"col-lg-2"].join(" ")}>Add all to Bag</button>
                                        </div>
                                        <p className={[resulteSkinStyle.resPageSubdetail,"show-mob"].join(" ")}>If you have detailed questions about your individual Skin care or products, 
                                            it is best to talk to a Skin care specialist. <Link   to="/medical/phcfinder" >Find a Physician</Link></p>
                                    </div>

                                </div>
                                <div className={["offset-lg-1 col-12 col-lg-11", resulteSkinStyle.resultsBody].join(' ')}>
                                    <div className="col-lg-2 d-mob-none">
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
                                            <p>If you have detailed questions about your individual Skin care or products, it is best to talk to a Skin care specialist. Find a Physician</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-7 results-card-container">
                                        {medicalProduct.length > 0 ? medicalProduct.map(data => (
                                            <ProductCard
                                                key={data.field_medical_id}
                                                productLink={data.path.alias}
                                                producttitle={data.title}
                                                productdescription={{ __html: data.field_medical_description.processed }}
                                                productimage={data.relationships.field_medical_image && data.relationships.field_medical_image[0].localFile ? data.relationships.field_medical_image[0].localFile.childImageSharp.fluid : ""}
                                                price={data.field_medical_price}
                                                productId={data.field_medical_id}
                                            />
                                        )) : ''}
                                        <div className={[resulteSkinStyle.addtobagcon, resulteSkinStyle.addtobagcondata].join(" ")}>
                                            <p className={resulteSkinStyle.resPageSubTitle}>These products offer a foundation for any basic Skin care regimen:</p>
                                           

                                            <button className={[resulteSkinStyle.addtobag, "col-lg-3"].join(" ")}>Add all to Bag</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
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