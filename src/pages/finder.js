import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import { phyFinder } from "../assets/js/phy-finder"
import "../assets/scss/components/physfinder-old.scss"
import "../assets/scss/components/physfinder.scss"
import { CustomSelect } from "../assets/js/custom-select"
import { Scrollbars } from "react-custom-scrollbars"
import Layout from "../components/layout"

const finderURL = process.env.Finder_URL;

export default function Finder() {

  useEffect(() => {
    if (typeof window != "undefined") {
      const google = window.google
      phyFinder(google, finderURL)
    }
    if (
      document.querySelectorAll(".custom-select .select-selected").length < 1
    ) {
      CustomSelect()
    }
  })

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
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="finder-title text-center">
              Locate an Obagi Skin Care Professional
            </h2>
            <p className="finder-subtitle text-center">
              Use this interactive physician finder to request a skin care
              consultation with a professional in your area. A certified skin
              care advisor will consult with you to develop a completely
              personalized Obagi skin care regimen.
            </p>

            <p className="finder-subtitle lastfind text-center">
              Looking for specific product? Try our{" "}
              <Link to="#">Advanced Search</Link> option.*
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col search-filters">
            <div className="row">
              <div className="col-lg-4 d-flex search-con">
                <p className="selctfinder"> search by: </p>
                <label className="checkcon" onClick={searchBy}>
                  <input
                    type="radio"
                    defaultChecked={true}
                    name="search-radio"
                    value="loc"
                  />
                  <span className="checkmarkfinder"></span>by location
                </label>

                <label className="checkcon">
                  <input type="radio" name="search-radio" value="phy"  onClick={searchBy}/>
                  <span className="checkmarkfinder"></span>by physician
                </label>
              </div>
              <div className="col-lg-4 d-flex search-drop">
                <label className="finder-input showlocation">
                  <span>location </span>
                  <input id="input-location" type="text" maxLength="5" />
                </label>
                <label className="finder-input showphysician hide">
                  <span>physician </span>
                  <input id="input-physician" type="text" placeholder="Enter a physician name"/>
                </label>
                <div className="miles ">
                  <span>miles </span>
                  <div className="custom-select">
                    <select id="miles" defaultValue="10">
                      <option value="1">1</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
              </div>
              <p className="covid show-mob">
                COVID-19 UPDATE: Skincare professional partners openings and
                hours may vary based on location. Please contact your skincare
                professional directly to learn more.
              </p>
              <div className="col-lg-4 d-flex f-buttons">
                <button className="btn btn-primary" id="search-btn">
                  Update Search
                </button>
                <button className="rev-search">Revise Product Search</button>
              </div>
              <p className="covid hide-mob">
                COVID-19 UPDATE: Skincare professional partners openings and
                hours may vary based on location. Please contact your skincare
                professional directly to learn more.
              </p>
            </div>
            <div id="loader" className="d-none">
              Loading....
            </div>
            <div>
              <p id="err-msg"></p>
            </div>
          </div>
        </div>

        <div className="row result-con">
          <div className="col results-wrapper hide" id="results-wrapper">
            <p className="results-top"><span id="results-number">8</span> results <span id="results-distance">within <span id="results-distance-number">10</span> miles</span></p>
            <Scrollbars style={{ width: 376, height: 476 }}>
              <ul id="results"></ul>
            </Scrollbars>
          </div>
          <div className="col map" id="map" style={{ height: "500px" }}></div>
        </div>
        <div className="row">
          <p className="finder-foot finder-foot-1">
            {" "}
            *Products containing Hydroquinone are not available in select states
            including MA, MT, NH, NY, and TX, due to state regulations regarding
            the ability of physicians to dispense prescription drug products in
            their offices.
          </p>
          <p className="finder-foot">
            Not all locations carry the full Obagi line of skin care products.
            We recommend contacting the location ahead of time to inquire about
            product availability to confirm they carry the products.
          </p>
          <p className="finder-foot">
            The names and contact information for physicians that can be found
            through our “Find an Obagi” physician locator are provided merely as
            a convenience to you and do not constitute or imply our endorsement
            or recommendation of the physicians or their services. We make no
            representations or warranties of any kind as to services provided by
            any of the physicians listed, and expressly disclaim any and all
            liability for damages, including without limitation, direct,
            incidental, special, consequential, indirect or punitive damages,
            relating to your use of the information provided or the actions of
            any of the physicians listed.
          </p>
          <p className="finder-foot ">
            If you are a physician and would like to request a change to your
            contact information as it appears on this website or be added to
            this list, please email us or contact your sales representative.
          </p>
        </div>
      </div>
    </Layout>
  )
}
