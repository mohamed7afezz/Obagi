import React, { useEffect } from 'react';
import { phyFinder } from '../assets/js/phy-finder';

import Layout from '../components/layout';

const finderURL = process.env.Finder_URL;

export default function Finder() {
    useEffect(() => {
        if(typeof window != 'undefined') {
            const google = window.google;
            phyFinder(google, finderURL);
        }
    });

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Locate an Obagi Skin Care Professional</h2>
                    </div>
                </div>
                <div class="row">
                    <div className="col search-filters">
                        search by: 
                        location <input id="input-location" type="text" maxlength="5" />
                        physician <input id="input-physician" type="text" />
                        miles <select id="miles">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10" selected>10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <button className="btn btn-primary" id="search-btn">Search</button>
                        <div id="loader" className="d-none">Loading....</div>
                        <div><p id="err-msg"></p></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col results-wrapper">
                        <ul id="results"></ul>
                    </div>
                    <div className="col map" id="map" style={{height: '500px'}}></div>
                </div>
            </div>
        </Layout>
    )
}
