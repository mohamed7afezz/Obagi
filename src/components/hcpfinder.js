import React, { useEffect, useState } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { phyFinder } from "../assets/js/phy-finder"
import "../assets/scss/components/physfinder-old.scss"
import "../assets/scss/components/physfinder.scss"
import { CustomSelect } from "../assets/js/custom-select"
import { Scrollbars } from "react-custom-scrollbars"
import Layout from "./layout"
import SEO from './seo';
import badgeImg from '../assets/images/product-images/PremierPartnership_Badge-01.png'

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const spinner = css`
  display: block;
  left:35%;
  margin: 0 auto;
  border-width: 4px;
  position: absolute;
  top: 10%;
`;
const finderURL = process.env.Finder_URL;
const baseUrl = process.env.Base_URL;

function removevaild(e) {
  let item = e.target

  item.closest('.appointment-elemnt').classList.remove('error')

  item.classList.add('hide')
}
let savechecked = [];
const sendFormValues = (updatedItemData) => {

  fetch(
    `${baseUrl}webform_rest/submit`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(updatedItemData.obj)
    }
  )
    .then(res => res.json())
    .then(response => {

    })
    .catch(error => {

    });
};

const createFullPostMarkup = (data) => {
  return { __html: `${data}` }
}
const createFullPostMarkup2 = (data, data2) => {
  return { __html: `${data} + ${data2}` }
}
function changeselect(e) {

  document.querySelector('#miles').value = document.querySelector('#prodDistance').value;
  document.querySelector('.miles .select-selected').innerText = e.target.innerText;

}
function submitforming(e) {
  var obj = { webform_id: "request_appointment" };
  var forms = document.getElementsByClassName('needs-validations');
  var list = document.querySelectorAll('.needs-validations .appointment-elemnt input:invalid');
  if (list.length > 0) {
    for (var item of list) {
      item.parentElement.classList.add('error')
      item.nextSibling.classList.remove('hide')
    }
  } else {
    let list2 = document.querySelectorAll('.needs-validations .appointment-elemnt input');
    for (let item of list2) {
      item.parentElement.classList.remove('error')
      item.nextSibling.classList.add('hide')
      obj[item.getAttribute("name")] = item.value;
    }

    obj[document.querySelector('.needs-validations select').getAttribute("name")] = `${document.querySelector('.needs-validations select').value}`

    sendFormValues({ obj })
    document.querySelector("#formsubmition").classList.remove('hidden')
    var container = document.querySelector("#formsubmition .container");

    document.querySelector('body').classList.remove('modal-open')
    document.querySelector('#appointment').classList.remove('in');
    document.querySelector('#appointment').classList.remove('showmodal')
    document.querySelector("#appointment").setAttribute('aria-modal', "")
    document.querySelector("#appointment").setAttribute("aria-hidden", "true")
    document.getElementById("appointment").style.display = "none"
    document.getElementById("appointment").className += document.getElementById("appointment").className.replace("show", "")
    document.querySelector("#formsubmition").addEventListener("click", function (e) {
      if (e.target !== document.querySelector("#formsubmition") && e.target !== container) return;
      document.querySelector("#formsubmition").classList.add("hidden");
    });
    document.querySelector(".modal-backdrop.fade.show").remove();


  }

}
export const ProductLineComp = ({ line }) => {

  //form validation
  // Fetch all the forms we want to apply custom Bootstrap validation styles to



  return (
    <>

      <div dangerouslySetInnerHTML={createFullPostMarkup(line.name)} class="result-tax"></div>
      <div class="d-flex d-col results-input-list">
        {(line.relationships && line.relationships.products) ? line.relationships.products.map(product => {
          return (
            <label class="terms">
              <input className="product-check-box" type="checkbox" value={product.field_medical_sku? product.field_medical_sku : product.field_custom_sku} />
              <span dangerouslySetInnerHTML={{ __html: product.title }}></span>
              <div class="checkmark"></div>
            </label>
          )
        }) : ''}

      </div>

    </>
  )
};

export default function Finder() {
  const [prodLines, setProductLines] = useState([]);
  const [lines, setLines] = useState([]);
  const [productResultsNumber, setProductResultsNumber] = useState(0);

  const data = useStaticQuery(graphql`
      query{
        productLines: allTaxonomyTermMedicalProductLines {
          edges {
            node {
              id
              name
              relationships {
                products: node__medical_product {
                  field_medical_sku
                  field_min_quantity
                  title
                  path {
                    alias
                  }
                }
              }
            }
          }
        }

        customProducts: allTaxonomyTermPhysicianCustomProductLines {
          edges {
            node {
              id
              name
              relationships {
                products: node__physician_custom_product {
                  id
                  title
                  field_custom_upc
                  field_custom_sku
                }
              }
            }
          }
        }
}
`)

  function updateProductLines(e) {
    document.querySelector('.product-lines').classList.add('d-none')
    if (e.target.checked) {


      let newProdLines = [...prodLines];
      newProdLines.push(e.target.value);

      setProductLines(newProdLines);
      savechecked.push(e.target.value);
      document.querySelector("#prod-search-btn").classList.remove("disable")
      document.querySelector("#submit-search-physician").classList.remove("disable");


    } else {
      setProductLines(prodLines.filter(item => item !== e.target.value));

      for (let i = 0; i < savechecked.length; i++) {
        if (savechecked[i] === e.target.value) {
          savechecked.splice(i, 1);
          i--
        }
        if (savechecked.length === 0) {
          document.querySelector("#prod-search-btn").classList.add("disable")
          document.querySelector("#submit-search-physician").classList.add("disable")

        }

      }
    }
    //TODO: add masonry style

  }

  function searchProducts(e) {

    if (document.getElementById('prodLoc').value.length < 5) {
      document.getElementById('prod-err-msg').classList.remove('d-none');
      document.getElementById('prod-err-msg').innerHTML = 'Invalid Zip Code';

      return;
    }
    if (prodLines.length < 1) {
      document.getElementById('prod-err-msg').classList.remove('d-none');
      document.getElementById('prod-err-msg').innerHTML = 'No Product Line selected';
      return;
    }
    document.getElementById('prod-err-msg').classList.add('d-none');
    e.target.disabled = true;
    let searchLines = data.productLines.edges.filter(({ node }) => prodLines.includes(node.name));
    let customLines = data.customProducts.edges.filter(({ node }) => prodLines.includes(node.name))
    let resultsNumber = searchLines.map(({ node }) => node && node.relationships && node.relationships.products ? node.relationships.products.length : 0).reduce((acc, sum) => acc + sum, 0);
    let customResultsNumber = customLines.map(({ node }) => node && node.relationships && node.relationships.products ? node.relationships.products.length : 0).reduce((acc, sum) => acc + sum, 0);
    setProductResultsNumber(resultsNumber + customResultsNumber);
    setLines([...searchLines, ...customLines]);
    document.querySelector('#prodLines').classList.add('d-none');
    e.target.disabled = false
  }

  function clearSelected(e) {
    document.querySelectorAll('.product-check-box').forEach(item => {
      item.checked = false;
    })
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      const google = window.google
      const productsData = data.productLines.edges.map(({ node }) => {
        let newNode = node.relationships.products ? node.relationships.products.map(product => {
          return {
            path: (product.path && product.path.alias) ? product.path.alias : '#',
            sku: product.field_medical_sku ? product.field_medical_sku : '',
            minQuantity: (product.field_min_quantity == 0 || product.field_min_quantity > 0) ? product.field_min_quantity : ''
          }
        }) : undefined;

        return newNode;
      }).filter(item => item != undefined).flat();

      const customProductsData = data.customProducts.edges.map(({ node }) => {
        let newNode = node.relationships.products ? node.relationships.products.map(product => {
          return {
            path: (product.path && product.path.alias) ? product.path.alias : '#',
            sku: product.field_custom_sku ? product.field_custom_sku : '',
            minQuantity: product.field_min_quantity && (product.field_min_quantity == 0 || product.field_min_quantity > 0) ? product.field_min_quantity : ''
          }
        }) : undefined;

        return newNode;
      }).filter(item => item != undefined).flat();

      const allProductsData = productsData.concat(customProductsData)
      phyFinder(google, finderURL, allProductsData);
    }
    if (
      document.querySelectorAll(".custom-select .select-selected").length < 1
    ) {
      CustomSelect()
    }
  }, [])

  function searchBy(e) {
    if (e.target.value === "loc") {
      document.querySelector(".showphysician").classList.add("hide")
      document.querySelector(".showlocation").classList.remove("hide")
    } else {
      document.querySelector(".showlocation").classList.add("hide")
      document.querySelector(".showphysician").classList.remove("hide")
    }
  }

  return (
    <>
      {<div className={["blue-color give-padding breadcramp-con", "col-12"].join(" ")}>
        <p className="breadcramp">
          <Link to="/">Home</Link>{" "} /
                <Link to={'/medical'}> medical</Link>
               / <span>Physician Finder</span>
        </p>

      </div>}
      <div className="container phy-container">
        <div className="row">
          <div className="col">
            <h1 class="finder-title phy-title text-center">
              Locate an Obagi<sup>®</sup> Skin Care Professional
            </h1>
            <p class="finder-subtitle text-center">
              Use this interactive physician finder to request a skin care
              consultation with a professional in your area. A skincare physician will consult with you to develop a completely
              personalized Obagi skin care regimen.
            </p>

            <p class="finder-subtitle lastfind text-center">
              Looking for specific product? Try our{" "}
              <a href="#" data-toggle="modal"
                data-target="#advancedSearch" to="#">Advanced Search</a> option.*
            </p>
          </div>
        </div>
        <div class="row">
          <div className="col search-filters">
            <div class="row">
              <div class="col-lg-4 d-flex search-con">
                <p class="selctfinder"> Search by: </p>
                <label class="checkcon" onClick={searchBy}>
                  <input
                    type="radio"
                    defaultChecked={true}
                    name="search-radio"
                    value="loc"
                  />
                  <span class="checkmarkfinder"></span>By Location
                </label>

                <label class="checkcon" onClick={searchBy}>
                  <input type="radio" name="search-radio" value="phy" />
                  <span class="checkmarkfinder"></span>By Practice
                </label>
              </div>
              <div class="col-lg-4 d-flex search-drop">
                <label class="finder-input showlocation">
                  <span>location </span>
                  <input id="input-location" type="text" />
                </label>
                <label class="finder-input showphysician hide">
                  <span>Practice </span>
                  <input id="input-physician" type="text" />
                </label>
                <div class="miles ">
                  <span>DISTANCE </span>
                  <div class="custom-select f-select">
                    <select id="miles">
                      <option value="1">1 miles</option>
                      <option value="5">5 miles</option>
                      <option value="10" selected>
                        10 miles
                      </option>
                      <option value="25">25 miles</option>
                      <option value="50">50 miles</option>
                      <option value="100">100 miles</option>
                    </select>
                  </div>
                </div>
              </div>
              <p class="covid show-mob">
                COVID-19 UPDATE: Skin care professional partners' openings and
                hours may vary based on location. Please contact your skin care
                professional directly to learn more.
              </p>
              <div class="col-lg-4 d-flex f-buttons">
                <button className="btn btn-primary" id="search-btn" onClick={searchProducts}>
                  Update Search
                </button>
                <button
                  class="rev-search"
                  data-toggle="modal"
                  data-target="#advancedSearch"
                >
                  Search By Product
                </button>
              </div>
          
              {data.customProducts.edges.map(({ node }) => {
                  if (node.relationships.products) {
                    return (
                      <div className="col-12">
                  <p className="proServices">Obagi is proud to offer premium professional services in a select number of physician locations.</p>

                      <div className="customProducts">
                        <p>Sort by {node.name}:</p>
                       {node.relationships.products.map(product => {
                         return (
                           <label class="terms">
                             <input className="product-check-box" type="checkbox" value={product.field_medical_sku ? product.field_medical_sku : product.field_custom_sku} />
                             <span dangerouslySetInnerHTML={{ __html: product.title }}></span>
                             <div class="checkmark"></div>
                           </label>
                         )
                       })
                        }
                      </div>
                  </div>
                    )
                  }
                })}
          
              <p class="covid hide-mob">
                COVID-19 UPDATE: Skin care professional partners' openings and
                hours may vary based on location. Please contact your skin care
                professional directly to learn more.
              </p>
 
                
        
            </div>
            <div id="loader" className="d-none">
              <div class="d-mob-none">
                <ClipLoader
                  css={spinner}
                  size={400}
                  color={"#123abc"}
                />
              </div>
            </div>
            <div>
              <p id="err-msg"></p>
            </div>
          </div>
        </div>

        <div className="row result-con pb-0">
          <div className="col results-wrapper hide" id="results-wrapper">
            <div id="results-info">
              <p>
                <span id="results-number"></span> results{" "}
                <span id="results-distance">
                  {" "}
                  within <span id="results-distance-number"></span> miles
                </span>
              </p>
            </div>
            <Scrollbars style={{ width: 376, height: 476 }} id="scroll-wrapper">
              <ul id="results"></ul>
            </Scrollbars>
          </div>
          <div className="col map" id="map" style={{ height: "500px" }}></div>
        </div>
        <div class="row">
          <div className="col-12 col-lg-2">
            <img className="badgeImg" src={badgeImg} />
          </div>
          <div className="col-12 col-lg-10 tab-padding">
            <p class="finder-foot finder-foot-1">
            Obagi Premier Partners are some of the most experienced with the transformative skincare solutions that Obagi provides. They are also experts in the art of the Obagi patient consultation, a comfortable, guided, consultative approach during which practitioner and patient work together to develop a comprehensive skin health plan.
        </p>
            <p class="finder-foot">Additionally, Premier Partners have access to unique, curated Obagi offerings and product sets, get exclusive first looks at new Obagi products, and are among the first to carry new Obagi innovations that may benefit their patients
        </p>
            <p class="finder-foot">Utilize the interactive Physician Finder and look for the Obagi Premier Partner badge to find a top Obagi provider near you!
        </p>
          </div>
          <p class="finder-foot">
            *Products containing hydroquinone are not available in select states including MA, MT, NH, NY, and TX, due to state regulations regarding the ability of physicians to dispense prescription drug products in their offices.
          </p>
           <p class="finder-foot">
            Not all locations carry the full Obagi line of skin care products. We recommend contacting the location ahead of time to inquire about product availability to confirm they carry the products.
          </p>
          <p class="finder-foot">
            The names and contact information for physicians that can be found through our “Find an Obagi” physician locator are provided merely as a convenience to you and do not constitute or imply our endorsement or recommendation of the physicians or their services. We make no representations or warranties of any kind as to services provided by any of the physicians listed, and expressly disclaim any and all liability for damages, including without limitation, direct, incidental, special, consequential, indirect, or punitive damages relating to your use of the information provided or the actions of any of the physicians listed.
          </p>
          <p class="finder-foot">
            {" "}
            If you are a physician and would like to request a change to your contact information as it appears on this website or be added to this list, please email us or contact your sales representative.
          </p>
          {/* <p class="finder-foot">
            Not all locations carry the full Obagi line of skin care products.
            We recommend contacting the location ahead of time to inquire about
            product availability to confirm they carry the products.
          </p>
          <p class="finder-foot">
            The names and contact information for physicians that can be found
            through our “Find an Obagi” physician locator are provided merely as
            a convenience to you and do not constitute or imply our endorsement
            or recommendation of the physicians or their services. We make no
            representations or warranties of any kind as to services provided by
            any of the physicians listed, and expressly disclaim any and all
            liability for damages, including without limitation, direct,
            incidental, special, consequential, indirect, or punitive damages
            relating to your use of the information provided or the actions of
            any of the physicians listed.
          </p>
          <p class="finder-foot ">
            If you are a physician and would like to request a change to your
            contact information as it appears on this website or be added to
            this list, please email us or contact your sales representative.
          </p> */}
        </div>
      </div>
      {/* Request Appointment Modal */}
      <div
        class="modal fade"
        id="appointment"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <span class="reqmodal">*All fields are required</span>
              {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div class="modal-body appointment-body">
              <div class="body-desc">
                <h2 class="body-title">
                  Request an appointment below for a skin care consultation
                  with:
                </h2>
                <div id="req-app-clinic-info"></div>
                <form className="needs-validations" onSubmit={(e) => { e.preventDefault(); }}>
                  <div class="d-flex inputs-con">
                    <div class="appointment-elemnt mt-0">
                      <p class="input-name" >First name</p>
                      <input class="appointmentInput" name="first_name" required />
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your First Name</p>
                    </div>
                    <div class="appointment-elemnt mt-0 mob-mt-24">
                      <p class="input-name">Last name</p>
                      <input class="appointmentInput" name="last_name" required />
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your Last Name</p>

                    </div>
                    <div class="appointment-elemnt">
                      <p class="input-name">Email Address</p>
                      <input class="appointmentInput" name="email_address" required />
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your Email Address</p>

                    </div>
                    <div class="appointment-elemnt">
                      <p class="input-name">Phone Number</p>
                      <input class="appointmentInput" name="phone_number" required />
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your Phone Number</p>

                    </div>
                    <div class="appointment-elemnt">
                      <p class="input-name">Address</p>
                      <input class="appointmentInput" name="address" required />
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your Address</p>

                    </div>
                    <div class="appointment-elemnt">
                      <p class="input-name">City</p>
                      <input class="appointmentInput" name="city" required />
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your City</p>

                    </div>
                    <div class="appointment-elemnt pb-10">
                      <p class="input-name">State/Province</p>
                      <div class="custom-select">
                        <select id="state" name="state_province">
                          <option value="" selected="selected">- None -</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AS">American Samoa</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                          <option value="AA">Armed Forces Americas</option>
                          <option value="AP">Armed Forces Pacific</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="DC">District of Columbia</option>
                          <option value="FM">Federated States of Micronesia</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="GU">Guam</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PW">Palau</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VI">Virgin Islands</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                          <option value="AB">Alberta</option>
                          <option value="BC">British Columbia</option>
                          <option value="MB">Manitoba</option>
                          <option value="NB">New Brunswick</option>
                          <option value="NL">Newfoundland and Labrador</option>
                          <option value="NS">Nova Scotia</option>
                          <option value="NT">Northwest Territories</option>
                          <option value="NU">Nunavut</option>
                          <option value="ON">Ontario</option>
                          <option value="PE">Prince Edward Island</option>
                          <option value="QC">Quebec</option>
                          <option value="SK">Saskatchewan</option>
                          <option value="YT">Yukon</option>
                        </select>
                      </div>
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your State/Province</p>

                    </div>
                    <div class="appointment-elemnt">
                      <p class="input-name">Postal Code</p>
                      <input class="appointmentInput" name="postal_code" required />
                      <p onClick={removevaild} className="error-msg hide">Please Enter Your Postal Code</p>

                    </div>
                    <div id="hidden-fields"></div>
                  </div>
                  <div class="d-flex Submit-btns">
                    <button class="appointment-cancel">Cancel</button>
                    <button class="appointment-Submit" onClick={(e) => { submitforming(e); }} type="submit">Submit request</button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
          </div>
        </div>
      </div>
      {/* Product filtration */}
      <div
        class="modal fade"
        id="advancedSearch"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <span class="reqmodal"></span>
              {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div class="modal-body appointment-body">
              <div class="body-desc">
                <h2 class="body-title">Looking for a specific product?</h2>
                <div class="doc-name">
                  <p class="doctitle">
                    Find skin care professionals that carry specific Obagi
                    products. Choose products under the Product Line you’d like
                    to find a physician for, enter city or ZIP code, and search.
                  </p>
                </div>
                <div id="prod-err-msg" className="d-none"></div>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div class="d-flex inputs-con">
                    <div class="appointment-elemnt advanced-search">
                      <p class="input-name">LOCATION</p>
                      <input
                        class="appointmentInput"
                        id="prodLoc"
                      />
                    </div>
                    <div class="appointment-elemnt advanced-search">
                      <p class="input-name">DISTANCE</p>
                      <div class="custom-select f-select"
                        onClick={changeselect}>
                        <select
                          id="prodDistance"
                          className="state"
                          defaultValue="10"

                        >
                          <option value="5">5 miles</option>
                          <option value="10">10 miles</option>
                          <option value="25">25 miles</option>
                          <option value="50">50 miles</option>
                          <option value="100">100 miles</option>
                        </select>
                      </div>
                    </div>
                    <div class="appointment-elemnt advanced-search">
                      <p class="input-name">PRODUCT LINES</p>


                      {prodLines.length > 1 ?
                        <div dangerouslySetInnerHTML={createFullPostMarkup2(prodLines[0], (prodLines.length - 1))} id="prodLinesSelected" className="ProdprodLinesSelected " onClick={(e) => { document.querySelector('#prodLines').classList.contains('d-none') ? document.querySelector('#prodLines').classList.remove('d-none') : document.querySelector('#prodLines').classList.add('d-none') }}>
                        </div>
                        : prodLines.length > 0 ?
                          <div dangerouslySetInnerHTML={createFullPostMarkup(prodLines[0])} id="prodLinesSelected" className="ProdprodLinesSelected " onClick={(e) => { document.querySelector('#prodLines').classList.contains('d-none') ? document.querySelector('#prodLines').classList.remove('d-none') : document.querySelector('#prodLines').classList.add('d-none') }}>
                          </div>
                          :
                          <div id="prodLinesSelected" className="ProdprodLinesSelected changetogray" onClick={(e) => { document.querySelector('#prodLines').classList.contains('d-none') ? document.querySelector('#prodLines').classList.remove('d-none') : document.querySelector('#prodLines').classList.add('d-none') }}>
                            Select
                        </div>

                      }



                      <div class="product-lines d-none" id="prodLines">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl">
                            {data.productLines.edges.map(({ node }) => {
                              if (node.relationships.products) {
                                return (
                                  <li key={node.id}>
                                    <label class="terms">
                                      <input class="popupVideoInput" name="product" type="checkbox" value={node.name} onClick={updateProductLines} />
                                      <span dangerouslySetInnerHTML={{ __html: node.name }}></span>
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                )
                              }
                            })}
                            {/* {data.customProducts.edges.map(({ node }) => {
                                 if (node.relationships.products) {
                                  return (
                                    <li key={node.id}>
                                      <label class="terms">
                                        <input class="popupVideoInput" name="product" type="checkbox" value={node.name} onClick={updateProductLines} />
                                        <span dangerouslySetInnerHTML={{ __html: node.name }}></span>
                                        <span className="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                                }
                            })} */}
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                    <div class="advanced-search">
                      <button
                        class="appointment-Submit disable"
                        id="prod-search-btn"
                        type="button"

                        onClick={searchProducts}
                      >
                        APPLY
                      </button>
                    </div>
                  </div>
                  <hr class="seprator" />
                  <div class="d-flex space-between">
                    <p class="result-count"> {productResultsNumber} Results</p>
                    <button class="clear-selection" type="button" onClick={clearSelected}>
                      Clear All Selections
                    </button>
                  </div>
                  <p class="select-prod">
                    Select the products below you are interested in
                  </p>
                </form>

                <div className={[lines.length > 0 ? '' : 'd-none', "product-search-masonry"].join(" ")}>
                  <Scrollbars style={{ height: 400 }}>
                    <div>
                      <div class="products-masonry" id="products-search-result">

                        {
                          lines.length > 0 ? lines.map(({ node }) => (
                            <div class="product-line-masonry" key={node.id + '1'}>
                              <ProductLineComp line={node} />
                            </div>
                          )) : '<div class="search-res left-res product-line-masonry"></div>'
                        }
                      </div>
                    </div>
                  </Scrollbars>
                </div>
                <div class="">
                  <button class="submit-search-physician disable" type="button" id="submit-search-physician" data-dismiss="modal" >
                    Search for a physician
                  </button>
                </div>
              </div>
            </div>
            {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
          </div>
        </div>
      </div>
      {/* releated products */}
      <div class="modal fade" id="related-products" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">

              </button>
            </div>
            <div class="modal-body">
              <h5 class="modal-title">Products available through:</h5>

              <div id="related-phy-info"></div>
              <Scrollbars style={{ height: 300 }}>
                <div id="related-products-list"></div>
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



// export const productsLine = graphql`

// `
