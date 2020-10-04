import React, { useEffect } from 'react';
import { Link } from "gatsby";
import { phyFinder } from '../assets/js/phy-finder';
import "../assets/scss/components/physfinder-old.scss";
import "../assets/scss/components/physfinder.scss";
import {CustomSelect} from '../assets/js/custom-select';
import { Scrollbars } from 'react-custom-scrollbars';
import Layout from '../components/layout';

const finderURL = process.env.Finder_URL;

export default function Finder() {
    useEffect(() => {
        if(typeof window != 'undefined') {
            const google = window.google;
            phyFinder(google, finderURL);
        }
        if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
            CustomSelect();
        } 
    });
    
    function searchBy(e) {
        if(e.target.value === 'loc') {
            document.querySelector('.showphysician').classList.add('hide');
            document.querySelector('.showlocation').classList.remove('hide');
        } else {
            document.querySelector('.showlocation').classList.add('hide');
            document.querySelector('.showphysician').classList.remove('hide');
        }
    }
    

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col">
                    <h2 class="finder-title text-center">
                Locate an Obagi Skin Care Professional
              </h2>
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

                    </div>
                </div>
                <div class="row">
                    <div className="col search-filters">
                        <div class="row">
                        <div class="col-lg-4 d-flex search-con">
                     <p class="selctfinder">   search by: </p>
                       <label class="checkcon" onClick={searchBy}>
                           <input type="radio" defaultChecked={true} name='search-radio' value="loc"/><span class="checkmarkfinder"></span>by location
                    
                       </label>

                        <label class="checkcon"    ><input type="radio" name='search-radio' value="phy"/><span class="checkmarkfinder"></span>by physician</label>
                        </div>
                        <div class="col-lg-4 d-flex search-drop">
                            <label class="finder-input showlocation" ><span>
                        location </span><input id="input-location" type="text" maxlength="5" />
                        </label>
                        <label class="finder-input showphysician hide"><span>
                        physician </span><input id="input-physician" type="text" />
                        </label>
                        <div class="miles ">
                            <span>miles </span>
                        <div class="custom-select">
                        <select  id="miles">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10" selected>10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        </div>
                        </div>
                        </div>
                        <p class="covid show-mob">
                  COVID-19 UPDATE:  Skincare professional partners openings and hours may vary based on location. Please contact your skincare professional directly to learn more.
                  </p>
                      <div class="col-lg-4 d-flex f-buttons">
                        <button className="btn btn-primary" id="search-btn">Update Search</button>
                        <button  class="rev-search" data-toggle="modal" data-target="#advancedSearch">Revise Product Search</button>
                   
                     </div> 
                     <p class="covid hide-mob">
                  COVID-19 UPDATE:  Skincare professional partners openings and hours may vary based on location. Please contact your skincare professional directly to learn more.
                  </p>
                     </div>
                        <div id="loader" className="d-none">Loading....</div>
                        <div><p id="err-msg"></p></div>
                    </div>
                </div>

                <div className="row result-con">
                    <div className="col results-wrapper hide" id="results-wrapper">
                        <div id="results-info"><p><span id="results-number"></span> results <span id="results-distance"> within <span id="results-distance-number"></span> miles</span></p></div>
                    <Scrollbars style={{ width: 376, height: 476 }} id="scroll-wrapper">
                        <ul id="results" ></ul>
                        </Scrollbars>
                    </div>
                    <div className="col map" id="map" style={{height: '500px'}}></div>
                </div>
                <div class="row">
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
                </div>
          
  
            </div>
                  <div class="modal fade" id="appointment" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
              <span class="reqmodal">*All fields are required</span>
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body appointment-body">
        <div class="body-desc">
            <h2 class="body-title">Request an appointment below for a skin care consultation with:</h2>
            <div class="doc-name"><p class="doctitle">The Robert Zubowski MD Center for Plastic and Reconstructive Surgery</p>
            <div class="d-flex"><p class="address-one">1 Sears Drive Suite 102</p><ul><p class="city">•  Paramus, NJ 07652</p><p class="phone"><a href="#">•  (123) 456-7890</a></p></ul></div>
            </div>    
            <form>
                <div class="d-flex inputs-con">
                    <div class="appointment-elemnt mt-0"><p class="input-name">First name</p><input class="appointmentInput"/></div>
                    <div class="appointment-elemnt mt-0 mob-mt-24"><p class="input-name">Last name</p><input class="appointmentInput"/></div>
                    <div class="appointment-elemnt"><p class="input-name">Email Address</p><input class="appointmentInput"/></div>
                    <div class="appointment-elemnt"><p class="input-name">Phone Number</p><input class="appointmentInput"/></div>
                    <div class="appointment-elemnt"><p class="input-name">Address</p><input class="appointmentInput"/></div>
                    <div class="appointment-elemnt"><p class="input-name">City</p><input class="appointmentInput"/></div>
                    <div class="appointment-elemnt">
                    <p class="input-name">State/Province</p>
                    <div class="custom-select">
                    
                        <select  id="state">
                            <option value="1">US</option>
                            <option value="uk">UK</option>
                            <option value="1">UA</option>
                            <option value="1">EG</option>
                            <option value="1">CA</option>
                        </select>
                        </div>
                        </div>
                    <div class="appointment-elemnt"><p class="input-name">Postal Code</p><input class="appointmentInput"/></div>

                </div>
                <div class="d-flex Submit-btns">
                    <button class="appointment-cancel">Cancel</button>
                    <button class="appointment-Submit">Submit request</button>

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
    <div class="modal fade" id="advancedSearch" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
              <span class="reqmodal"></span>
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body appointment-body">
        <div class="body-desc">
            <h2 class="body-title">Looking for a specific product?</h2>
            <div class="doc-name"><p class="doctitle">Find skin care professionals that carry specific Obagi products. Choose products under the Product Line you’d like to find a physician for, enter city or ZIP code and search.</p>
            </div>    
            <form>
                <div class="d-flex inputs-con">
                   <div class="appointment-elemnt advanced-search"><p class="input-name">Location</p><input class="appointmentInput"/></div>
                   <div class="appointment-elemnt advanced-search">
                    <p class="input-name">Distance</p>
                    <div class="custom-select">
                    
                        <select  id="state">
                            <option value="5 miles">5 miles</option>
                            <option value="5 miles">5 miles</option>
                            <option value="10 miles">10 miles</option>
                            <option value="20 miles">20 miles</option>
                            <option value="50 miles">50 miles</option>
                        </select>
                        </div>
                        </div>
                   <div class="appointment-elemnt advanced-search"><p class="input-name">Product Lines</p>
                   
                   <div class="custom-select">
                    
                    <select  id="state">
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option> 
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                        <option value="5 miles">loram</option>
                    </select>
                    </div>
         
                   </div>
                    <div class="advanced-search"> <button class="appointment-Submit">APPLY</button></div>
                </div>
                <hr class="seprator"/>
                <div class="d-flex space-between">
                 <p class="result-count"> 0 Results</p>
                 <button class="clear-selection"> Clear All Selections</button>
                </div>
                <p class="select-prod">Select the products below you are interested in </p>
            </form>
            <Scrollbars style={{ height: 400 }}>
            <div class="d-flex search-results">
                
                <div class="search-res left-res">
                    <p class="result-tax">Obagi Nu-Derm System</p>
                    <div class="d-flex d-col">
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    </div>
                    <p class="not-ava">Not available in select states including MA, MT, NH, NY, and TX,
                 due to state regulations regarding the ability of physicians to dispense prescription drug products in their offices. 
                 For an effective, cosmetic skin-brightening option, learn about the Obagi-C® Fx System.</p>
                </div>
                <div class="search-res right-res">
                <p class="result-tax">Obagi-C Rx System</p>
                <div class="d-flex d-col">
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    <label><input type="checkbox"/>Blender</label>
                    </div>
                <p class="not-ava">Not available in select states including MA, MT, NH, NY, and TX,
                 due to state regulations regarding the ability of physicians to dispense prescription drug products in their offices. 
                 For an effective, cosmetic skin-brightening option, learn about the Obagi-C® Fx System.</p>
                </div>
            </div>
            </Scrollbars>
            <div class="">
                <button class="submit-search-physician">Search for a physician</button>
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
        </Layout>
    )
}
