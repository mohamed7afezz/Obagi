
import React , { useState, useEffect, useContext } from "react"

import '../assets/scss/components/product-hero.module.scss'

import Layout from "../components/layout"
import SearchResults from '../components/search-results'

import Search from "../components/search"
import NewSearchProductsResult from "../components/new-search"
import { Helmet } from "react-helmet"

const products = () => (
 
    <Layout>
 <div class="container">
    <div id="phys-finder">
        <Helmet>
            <script type="text/javascript" src= "../src/assets/js/masonry.min.js"></script>
              <script type="text/javascript" src= "../src/assets/js/phy.js"></script>
              <script type="text/javascript" src= "../src/assets/js/template.js"></script>
              <script type="text/javascript" src= "../src/assets/js/validate.js"></script>
        <script type="text/javascript" src=" https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.0.0/polyfill.js"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
        </script>
       
        </Helmet>
        <form id="phys-finder-form">
            <div id="phys-finder-search-form">
                <h1 class="finder-title text-center">Find ELASTIderm<sup>&reg;</sup> Facial Serum near you</h1>
<p class="finder-subtitle text-center">Use this interactive physician finder to request a skin care consultation with a professional in your area. A certified skin care advisor will consult with you to develop a completely personalized Obagi skin care regimen. </p>

<p class="finder-subtitle text-center" >When you contact a physician, a free deluxe sample of ELASTIderm Facial Serum will be shipped to you.</p>

                <div class="header">
                    <div class="controls">
                        <div class="i-b searchby-wrapper">
                            <label for="searchByLocation"><input id="searchByLocation" type="radio" name="searchby"
                                    value="location" checked="true"/> By Location </label>
                            <label for="searchByPhysician"><input id="searchByPhysician" type="radio" name="searchby"
                                    value="physician"/> By Physician</label>
                            <div class="searchtext-wrapper">
                                <input type="text" id="finder-location-input" name="finder-location-input"
                                    placeholder="Enter a location or Zip Code" maxlength="5"/>
                                <input type="text" id="finder-physician-input" name="finder-physician-input"
                                    placeholder="Enter a physician name" maxlength="40"/>
                            </div>

                        </div>
                        <div class="i-b radius-wrapper">
                            <label for="radius" id="lblRadius">Radius</label>
                            <div class="ie9-wrapper"><select name="radius" id="pf-radius">
                                    <option value="1">1 mile</option>
                                    <option value="5">5 miles</option>
                                    <option value="10" selected>10 miles</option>
                                    <option value="25">25 miles</option>
                                    <option value="50">50 miles</option>
                                    <option value="100">100 miles</option>
                                </select></div>
                        </div>
                        <div class="i-b submit-wrapper"><input id="pf-submit" type="submit" value="Update Search"/></div>
                    </div>
                </div>
            </div>
            <div id="error-wrapper">
                <label class="error remove" for="finder-location-input" id="pf-location-error" generated="true"></label>
                <label class="error remove" for="finder-physician-input" id="pf-physician-error"
                    generated="true"></label>
            </div>
             <p>Make sure it&rsquo;s genuine Obagi by purchasing products through an
                authorized medical practice or appointed international partner.</p>
            <p >The <strong><a href="https://www.obagiclinical.com/" target="_blank"><u>Obagi
                            Clinical</u></a></strong> line is available on <strong><a
                        href="https://www.sephora.com/brand/obagi-clinical/all"
                        target="_blank"><u>Sephora.com</u></a></strong>.</p> 
                <div id="adv-search">
      <header>
        <div class="adv-search-toggle js-toggle button">
          <span class="text2">Looking For A Specific Product? Try Our Advanced Search</span>
          <span class="text1">Advanced Product Search</span> 
          <span class="glyphs glyphicon-arrow-down"></span><span class="glyphs glyphicon-arrow-up"></span>
          <div id="clear-all-prods" class="hide"><span>Clear Advanced Search Selections</span></div>
        </div>
      </header>
    
    </div>
              
        </form>
        <div id="phys-finder-search-results">
            <div class="count map-header">
                <div class="clearfix">
                    <div id="pf-count-results"></div>
                    <div id="pf-email-print" class="hide"><a href="#" target="_top" id="email-link"><img
                                src="/modules/custom/obagi_finder/images/email.png"  /> Email</a><a
                            href="javascript:window.print();" id="print-link"><img
                                src="/modules/custom/obagi_finder/images/printer.png" /> Print</a>
                    </div>
                </div>
            </div>
            
            <div id="phys-finder-tabs">
                <div class="visible-xs-block" id="mobileTabs">
                    <ul>
                        <li class="active" id="mapTab"><span>Map</span></li>
                        <li id="listTab"><span>List</span></li>
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


            <div id="in-progress" intent in-mobile-append="#phys-finder-form" intent
                in-desktop-append="#phys-finder-search-results"></div>
        </div>
        <section id="phys-finder-footer">
            <p class="hide">Not in the U.S.? <a href="/International">Find a certified Obagi distributor internationally</a></p>
            <p>Offer only valid in the US and while supplies last.</p>
            <p>Obagi does not endorse purchasing products from the Internet without a physician's prescription and
                guidance. We recommend contacting the
                location ahead of time to inquire about product availability to confirm they carry the products.</p>
            <p>The names and contact information for physicians that can be found through our &ldquo;Find an
                Obagi&rdquo; physician locator are provided merely as a convenience to you and do not constitute or
                imply our endorsement or recommendation of the physicians or their services. We make no representations
                or warranties of any kind as to services provided by any of the physicians listed, and expressly
                disclaim any and all liability for damages, including without limitation, direct, incidental, special,
                consequential, indirect or punitive damages, relating to your use of the information provided or the
                actions of any of the physicians listed.</p>
            <p>If you are a physician and would like to request a change to your contact information as it appears on
                this website or be added to this list, please email us or contact your sales representative.</p>
        </section>
        <div class="gray-overlay"></div>
    </div>
</div>

<div aria-labelledby="MakeAppointmentModalLabel" class="modal fade" id="MakeAppointmentModal" role="dialog" tabindex="-1">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header clearfix" >
                          <button aria-label="Close" class="close" data-dismiss="modal" type="button"
                            ><span aria-hidden="true"
                                  class="glyphicon glyphicon-remove"></span></button>
                         <h2 class="modal-title">Product List</h2> 
                      </div>

                      <div class="modal-body">
                          
                      </div>
                  </div>
              </div>
          </div>
     </Layout>
        
)



export default products