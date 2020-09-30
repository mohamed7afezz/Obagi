import React, { useEffect } from "react"

import "../assets/scss/components/physfinder-old.scss"
import "../assets/scss/components/physfinder.scss"
import Layout from "../components/layout"
// import {phyfinder} from '../assets/js/phy'

const PhysFinder = () => {
    useEffect(() => {
        
        if(typeof window !== 'undefined') {
            let google = window.google;
            // let Handlebars = window.Handlebars;
            let regeneratorRuntime = window.regeneratorRuntime;
            let _ = window._;

            // phyfinder(google, regeneratorRuntime, _); 
            
        }
        
      }, [])
 
  //   var s = document.createElement("script");
  //   s.type = "text/javascript";
  //   s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWMDERmCDcoEBOALnRcwjdf02Cfsk1r7Q&amp;libraries=places";
  //   $("head").append(s);
  return (
    <Layout>
      <div class="container">
        <div id="phys-finder">
          <form id="phys-finder-form">
            <div id="phys-finder-search-form">
              <h1 class="finder-title text-center">
                Find ELASTIderm<sup>&reg;</sup> Facial Serum near you
              </h1>
              <p class="finder-subtitle text-center">
                Use this interactive physician finder to request a skin care
                consultation with a professional in your area. A certified skin
                care advisor will consult with you to develop a completely
                personalized Obagi skin care regimen.{" "}
              </p>

              <p
                class="finder-subtitle text-center"
                style={{ lineHeight: "normal;" }}
              >
                When you contact a physician, a free deluxe sample of ELASTIderm
                Facial Serum will be shipped to you.
              </p>

              <div class="header">
                <div class="controls">
                  <div class="i-b searchby-wrapper">
                    <label for="searchByLocation">
                      <input
                        id="searchByLocation"
                        type="radio"
                        name="searchby"
                        value="location"
                        checked="true"
                      />{" "}
                      By Location
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label for="searchByPhysician">
                      <input
                        id="searchByPhysician"
                        type="radio"
                        name="searchby"
                        value="physician"
                      />{" "}
                      By Physician
                    </label>
                    <div class="searchtext-wrapper">
                      <input
                        type="text"
                        id="finder-location-input"
                        name="finder-location-input"
                        placeholder="Enter a location or Zip Code"
                        maxlength="5"
                      />
                      <input
                        type="text"
                        id="finder-physician-input"
                        name="finder-physician-input"
                        placeholder="Enter a physician name"
                        maxlength="40"
                      />
                    </div>
                  </div>
                  <div class="i-b radius-wrapper">
                    <label for="radius" id="lblRadius">
                      Radius
                    </label>
                    <div class="ie9-wrapper">
                      <select name="radius" id="pf-radius">
                        <option value="1">1 mile</option>
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
                  <div class="i-b submit-wrapper">
                    <input
                      id="pf-submit"
                      type="submit"
                      value="Update Search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="error-wrapper">
              <label
                class="error remove"
                for="finder-location-input"
                id="pf-location-error"
                generated="true"
              ></label>
              <label
                class="error remove"
                for="finder-physician-input"
                id="pf-physician-error"
                generated="true"
              ></label>
            </div>
          </form>
          <div id="phys-finder-search-results">
            <div class="count map-header">
              <div class="clearfix">
                <div id="pf-count-results"></div>
                <div id="pf-email-print" class="hide">
                  <a href="#" target="_top" id="email-link">
                    <img
                      src="/modules/custom/obagi_finder/images/email.png"
                      style={{ width: "20px;" }}
                    />{" "}
                    Email
                  </a>
                  <a href="javascript:window.print();" id="print-link">
                    <img
                      src="/modules/custom/obagi_finder/images/printer.png"
                      style={{ width: "20px;" }}
                    />{" "}
                    Print
                  </a>
                </div>
              </div>
            </div>

            <div id="phys-finder-tabs">
              <div class="visible-xs-block" id="mobileTabs">
                <ul>
                  <li class="active" id="mapTab">
                    <span>Map</span>
                  </li>
                  <li id="listTab">
                    <span>List</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="result d-flex">
              <div class="left-side">
                <div id="physician-results-list">
                  <div class="inner"></div>
                </div>
              </div>
              <div class="right-side">
                <div id="map">
                  <div id="map-canvas"></div>
                  <div id="map-info"></div>
                </div>
              </div>
            </div>

            <div
              id="in-progress"
              intent
              in-mobile-append="#phys-finder-form"
              intent
              in-desktop-append="#phys-finder-search-results"
            ></div>
          </div>
          <div class="gray-overlay"></div>
        </div>
      </div>
    </Layout>
  )
}

export default PhysFinder;
