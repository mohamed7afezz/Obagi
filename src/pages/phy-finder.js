import { Link } from "gatsby"
import React, { useEffect } from "react"
import Layout from "../components/layout"
import { CustomSelect } from '../assets/js/custom-select'
import { Scrollbars } from 'react-custom-scrollbars';
export default function PhyFinder() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src =
      "https://dev-obagi.azurewebsites.net/api/modules/custom/obagi_finder/js/physfinder.js"
    script.async = true
    document.body.appendChild(script);
    if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
        CustomSelect();
    }
  }, [])
  return (
    <Layout>
      <div class="container">
          <div class="row">
              <div>
        <div id="phys-finder">
          <form id="phys-finder-form">
            <div id="phys-finder-search-form">
              <h1 class="finder-title text-center">
                Locate an Obagi Skin Care Professional
              </h1>
              <p class="finder-subtitle text-center">
                Use this interactive physician finder to request a skin care
                consultation with a professional in your area. A certified skin
                care advisor will consult with you to develop a completely
                personalized Obagi skin care regimen.
              </p>

              <p class="finder-subtitle lastfind text-center">
                Looking for specific product? Try our{" "}
                <Link to="#">Advanced Search</Link> option.*
              </p>

             <div class="header">
              <div class="controls">
                <div class="i-b searchby-wrapper col-lg-6">
                    <p class ="selctfinder">Search by:</p>
                  <label for="searchByLocation"  class="checkcon">
                    <input
                      id="searchByLocation"
                      type="radio"
                      name="searchby"
                      value="location"
                      checked="true"
                    />
                    By Location
                    <span class="checkmarkfinder"></span>
                    </label>

                  <label for="searchByPhysician"
                    ><input
                      id="searchByPhysician"
                      type="radio"
                      name="searchby"
                      value="physician"
                    />
                    By Physician</label
                  >
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
                  <label for="radius" id="lblRadius">Radius</label>
                  <div class="ie9-wrapper">
                    <select name="radius" id="pf-radius">
                      <option value="1">1 mile</option>
                      <option value="5">5 miles</option>
                      <option value="10" selected>10 miles</option>
                      <option value="25">25 miles</option>
                      <option value="50">50 miles</option>
                      <option value="100">100 miles</option>
                    </select>
                  </div>
                </div>
                <div class="i-b submit-wrapper">
                  <input id="pf-submit" type="submit" value="Update Search" />
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
                <div class="count map-header">
              <div class="clearfix">
                <div id="pf-count-results"></div>
                <div id="pf-email-print" class="hide">
                  <a href="#" target="_top" id="email-link">
                    <img src="https://dev-obagi.azurewebsites.net/api/modules/custom/obagi_finder/images/email.png" />
                    Email
                  </a>
                  <a href="javascript:window.print();" id="print-link">
                    <img src="https://dev-obagi.azurewebsites.net/api/modules/custom/obagi_finder/images/printer.png" />
                    Print
                  </a>
                </div>
              </div>
            </div>
        
                <Scrollbars style={{ width: 376, height: 520 }}>
                  <div class="inner"></div>
                  </Scrollbars>
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
          <section id="phys-finder-footer">
            <p class="hide">
              Not in the U.S.?
              <a href="/International">
                Find a certified Obagi distributor internationally
              </a>
            </p>
    <p class="finder-foot finder-foot-1">  *Products containing Hydroquinone are not available in select states including MA, MT, NH, NY, and TX, due to state regulations regarding the ability of physicians to dispense prescription drug products in their offices.
</p>
            <p  class="finder-foot">
            Not all locations carry the full Obagi line of skin care products. We recommend contacting the location ahead of time to inquire about product availability to confirm they carry the products.

            </p>
            <p  class="finder-foot">
            The names and contact information for physicians that can be found through our “Find an Obagi” physician locator are provided merely as a convenience to you and do not constitute or imply our endorsement or recommendation of the physicians or their services. We make no representations or warranties of any kind as to services provided by any of the physicians listed, and expressly disclaim any and all liability for damages, including without limitation, direct, incidental, special, consequential, indirect or punitive damages, relating to your use of the information provided or the actions of any of the physicians listed.

            </p>
            <p  class="finder-foot ">

            If you are a physician and would like to request a change to your contact information as it appears on this website or be added to this list, please email us or contact your sales representative.
        
            </p>
          </section>
          <div class="gray-overlay"></div>
        </div>
      </div>

      <div
        aria-labelledby="MakeAppointmentModalLabel"
        class="modal fade"
        id="MakeAppointmentModal"
        role="dialog"
        tabindex="-1"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header clearfix">
              <button
                aria-label="Close"
                class="close"
                data-dismiss="modal"
                type="button"
              >
                <span
                  aria-hidden="true"
                  class="glyphicon glyphicon-remove"
                ></span>
              </button>
            </div>

            <div class="modal-body"></div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </Layout>
  )
}
