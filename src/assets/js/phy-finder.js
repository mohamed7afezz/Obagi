export function phyFinder(google, finderURL) {
    const map = new Map(finderURL, google, 'map', {lat: 37.9820046, lng: -96.8954686}, 5)
    map.initMap();
    
}

class Temps {

    resultTemp (index, obj, isPhy) {
        return `
            <div class="container-fluid result-con" id="result-info-wrapper-${index}">
                <div class="row">
                    <div class="col-3 marker-con">
                        <span class="tray-result-number">${index + 1}</span>
                        <br>${isPhy? '' : (obj.distance.toFixed(2) + '<br>miles')}
                    </div>
                    <div class="info info-list col-9">
                        <h2 class="row clinic-name">${obj.name}</h2>
                       <div class="row email"><button  data-toggle="modal" data-target="#appointment" class="make-appointment" > Request Appointment</button></div>
                       <div class="row address-one">${obj.address1}</div>
                       <div class="row city">${obj.city}, ${obj.state} ${obj.zip}</div>
                       <div class="row phone"><a href="tel:${obj.phone}">${obj.phone}</a></div>
                        <div class="row sales-email hide">${obj.email}</div>
                         <div class="row links">
                           <button class="btn btn-link">6 products</button> <a href="https://maps.google.com?daddr=${obj.address1}+${obj.city}+${obj.state}+${obj.zip}" target="_blank">Get Directions</a>   ${obj.website != '' ? `<a href="${obj.website}" class="link-website" target="_blank">view website</a>` : ''}
                         </div>
                    </div>
                </div>
            </div>


        `
    }

    infoWindowTemp(obj) {
        return `
            <div>
                <h2>${obj.name}</h2>
            </div>
        `;
    }
}

class Search extends Temps {
    constructor(ajaxURL, google, inputLoc, inputPhy, inputMiles, searchBtn) {
        super();
        this.ajaxURL = ajaxURL;
        this.google = google;        
        this.geocoder = new this.google.maps.Geocoder();
        this.inputLoc = inputLoc;
        this.inputPhy = inputPhy;
        this.inputMiles = inputMiles;
        this.searchBtn = searchBtn;
        this.searchRadios = Array.prototype.slice.call(document.getElementsByName('search-radio'));
        this.results = [];
        this.currPlace = '';
        this.params = {
            city: '',
            state: '',
            zip: '',
            distance: '',
            product: '',
            postal: '',
            physician: '',
            country: ''
        };
        this.err = this.ErrHandler();

        // Create the event.
        this.eventAppend = document.createEvent('Event');

        // Define that the event name is 'resultappend'.
        this.eventAppend.initEvent('resultsappend', true, true);
    }

    initSearch() {
        this.err.hideErr();

        this.autoComplete = new this.google.maps.places.Autocomplete(this.inputLoc, {
            types: ['(regions)'],
            componentRestrictions: {
              country: ['us', 'pr']
            }
        });

        // add event listener on click update search
        this.searchBtn.addEventListener('click', (e) => {
            // get checked radio
            if(this.searchRadios.filter(item => item.checked)[0]) {
                if(this.searchRadios.filter(item => item.checked)[0].value == 'loc') {
                    console.log('bahiiii', this.inputLoc.value)
                    
                    // if zipcode less than 5
                    if(this.inputLoc.value.length < 4) {
                        this.setLoading(false);
                        this.err.showErr('invalidZip');
                        return;
                    }

                    this.searchByLocation({address: this.inputLoc.value})
                } else {
                    this.searchByPhys();
                }
                
            } else {
                this.err.showErr('noRadio')
            }
        });

        
    }

    /**
     * 
     * @param {*} searchOptions object {address: string, location: {lat: number, lng: number}}
     */
    async searchByLocation(searchOptions) {
        this.err.hideErr();
        this.setLoading(true);

        let geocodeOptions = {};
        
        if(searchOptions.address) {
            geocodeOptions = {
                'address': searchOptions.address
            }
        } else {
            geocodeOptions = {
                'latLng': new this.google.maps.LatLng(searchOptions.location.lat, searchOptions.location.lng)
            }
        }

        this.emptyParams();            
            
        let gcPromise = new Promise((res, rej) => {
            this.geocoder.geocode(geocodeOptions, (results, st) => {
                    if(st == this.google.maps.GeocoderStatus.OK && results.length > 0) {
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            if (results[0].address_components[i]["types"][0] === "locality") {
                            this.params["city"] = results[0].address_components[i]["long_name"];
                            }
        
                            if (results[0].address_components[i]["types"][0] === "administrative_area_level_1") {
                            this.params["state"] = results[0].address_components[i]["short_name"];
                            }
        
                            if (results[0].address_components[i]["types"][0] === "country") {
                            this.params["country"] = results[0].address_components[i]["long_name"];
                            }
        
                            this.inputLoc.value = this.params["city"] + ', ' + this.params["state"] + ', ' + this.params["country"];
                        }

                        res();
                    } else {
                        rej(st)
                    }
            })
        
        });

        await gcPromise.catch(err => {console.log(err)});

        this.params.distance = this.inputMiles.value;
        this.results = await this.sendSearchReq();
        
        this.appendResults(this.results.clinics)

        this.setLoading(false);
    }

    async searchByPhys() {
        this.err.hideErr();
        this.emptyParams();
        this.setLoading(true);

        this.params.physician = this.inputPhy.value.trim().toLowerCase().split(' ').join('+');

        this.results = await this.sendSearchReq();
        
        this.appendResults(this.results.clinics, true);

        this.setLoading(false);
    }

    // helpers
    getGeoCode() {
        
    }
    emptyParams() {
        this.params = {
            city: '',
            state: '',
            zip: '',
            distance: '',
            product: '',
            postal: '',
            physician: '',
            country: ''
        };
    }

    /**
     * @param {clinics} clinics - array of clinics
     */
    appendResults(clinics, isPhy) {
        if(clinics && clinics.length > 0) {
            document.getElementById('results').innerHTML = '';
            document.getElementById('results-wrapper').classList.remove('hide');
            document.getElementById('results-number').innerHTML = clinics.length;
            
            if(isPhy) {
                document.getElementById('results-distance').classList.add('hide');
            } else  {
                document.getElementById('results-distance').classList.remove('hide');                
                document.getElementById('results-distance-number').innerHTML = this.params.distance;
            }
            clinics.forEach((item, index) => {
                let li = document.createElement('li');
                li.innerHTML = this.resultTemp(index, item, isPhy);
                document.getElementById('results').appendChild(li);
            })
            document.getElementById('results-wrapper').dispatchEvent(this.eventAppend);

        } else {
            this.err.showErr('noRes');
        }
    }

    async sendSearchReq() {
        let qs = Object.keys(this.params).map(key => key + '=' + this.params[key]).join('&');
        let req = await (await fetch(this.ajaxURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs
        }).catch(err => {console.log(err); this.setLoading(false)})).json();

        return req;
    }

    setLoading (loading) {
        if(loading) {
            // show loader
            document.getElementById('loader').classList.remove('d-none');
            this.searchBtn.disabled = true;
        } else {
            // hide loader
            document.getElementById('loader').classList.add('d-none');
            this.searchBtn.disabled = false;
        }
    }
    
    ErrHandler() {
        const errMsgs = {
            noRes: "It doesn't look like there are any physicians within your search.",
            moreChars: 'Please enter no more than 5 characters.',
            invalidZip: 'Invalid Zip Code',
            noRadio: 'Please choose search type'
        }

        /**
         * 
         * @param {errType} errType string [noRes, moreChars, invalidZip]
         */
        return {
            showErr: function (errType) {
                document.getElementById('err-msg').classList.remove('d-none');
                document.getElementById('err-msg').innerHTML = errMsgs[errType];
            },
    
            hideErr: function () {
                document.getElementById('err-msg').classList.add('d-none');
            }
        }
    }

    updateParams(location) {
        this.searchBtn.disabled = true;
        location.address_components.forEach(item => {
            if(item.types.includes('postal_code')) {
                this.params.zip = item.short_name
            } else if(item.types.includes('locality')) {
                this.params.state = item.short_name
            } else if(item.types.includes('administrative_area_level_1')) {
                this.params.city = item.short_name
            } else if(item.types.includes('country')) {
                this.params.country = item.long_name
            } else {
                // this is left blank intentionally
            }
        });
        this.searchBtn.disabled = false;
        // add pulse class
        this.searchBtn.classList.add('pulse');
    }
}

class Map extends Search {
    constructor (ajaxURL, google, mapId, initCenterLoc, zoom) {
        super(
            ajaxURL,
            google,
            document.getElementById('input-location'),
            document.getElementById('input-physician'),
            document.getElementById('miles'),
            document.getElementById('search-btn')
        );
        this.mapId = mapId;
        this.initCenterLoc = initCenterLoc;
        this.zoom = zoom;
        this.markers = [];
        this.markerIcon ={
            default: 'https://dev-obagi.azurewebsites.net/api/sites/default/files/2020-10/pin_0.png',
            active: 'https://dev-obagi.azurewebsites.net/api/sites/default/files/2020-10/pin-active.png'
        }
        this.infoWindow = new this.google.maps.InfoWindow({
            content: '',
            maxWidth: 315
        });
    }

    initMap () {
        // init search to enable autocomplete
        this.initSearch();

        // build map
        const mapOptions = {zoom: this.zoom, center: this.initCenterLoc, maxZoom: 17};
        this.map = new this.google.maps.Map(document.getElementById(this.mapId), mapOptions);

        // add eventListener while searching with location to change map location
        this.google.maps.event.addListener(this.autoComplete, 'place_changed', () => {
            this.currPlace = this.autoComplete.getPlace();

            if(this.currPlace.geometry) {
                this.map.panTo(this.currPlace.geometry.location);
                this.map.setZoom(15);
                // update params
                this.updateParams(this.currPlace);
            }
        });

        // check if browser navigator is allowed
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                await this.searchByLocation({
                    location: {
                        lat: position.coords.latitude, 
                        lng: position.coords.longitude
                    }
                });
            })
        }

        // add event listener after append results to add markers
        document.getElementById('results-wrapper').addEventListener('resultsappend', () => {
            this.infoWindow.close();
            this.map.panTo(new this.google.maps.LatLng(this.results.clinics[0].lat, this.results.clinics[0].lng));
            this.map.setZoom(9);
            // clear old markers
            this.markers.forEach(marker => {
                marker.setMap(null);
            })
            this.markers= [];

            this.results.clinics.forEach((clinic, index) => {
                const marker = new this.google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    label: {text: index + 1 + '', color: '#132466'},
                    icon: this.markerIcon.default,
                    animation: this.google.maps.Animation.DROP,
                    position: new this.google.maps.LatLng(parseFloat(clinic.lat), parseFloat(clinic.lng))
                });
                marker.addListener('click', () => {
                    this.openClinic(index)
                })
                this.markers.push(marker)
            })

            this.openClinic(0);

            // add event Listener on tray result number
            for(let i = 0; i < document.getElementsByClassName('tray-result-number').length; i++) {
                document.getElementsByClassName('tray-result-number')[i].addEventListener('click', (e) => {
                    console.log('bahiiii', e)
                    this.openClinic(i, true)
                    this.map.panTo(new this.google.maps.LatLng(this.results.clinics[i].lat, this.results.clinics[i].lng));
                    this.map.setZoom(15)
                })
            }
            
        })
        
        
        // document.getElementsByClassName('tray-result-number').forEach(item => {
        //     item.addEventListener('click', () => {
        //         alert('Papa')
        //     })
        // })
    }

    resetMarkersIcon() {
        this.markers.forEach(marker => {
            marker.setIcon(this.markerIcon.default);
            const labelCOlor = marker.getLabel();
            labelCOlor.color = '#132466';
            marker.setLabel(labelCOlor)
        })
    }

    openClinic(index, stopScrollResult) {

        this.resetMarkersIcon();
        this.markers[index].setIcon(this.markerIcon.active);
        const labelCOlor = this.markers[index].getLabel();
        labelCOlor.color = '#fff';
        this.markers[index].setLabel(labelCOlor)
        this.infoWindow.setContent(this.infoWindowTemp(this.results.clinics[index]));
        this.infoWindow.open(this.map, this.markers[index]);

        
        const myElement = document.getElementById(`result-info-wrapper-${index}`);
        
        for(let i = 0; i < document.getElementsByClassName('result-con').length; i++) {
            document.getElementsByClassName('result-con')[i].classList.remove('active');
        }
        myElement.classList.add('active');

        // scroll the result top
        if(!stopScrollResult) {
            const topPos = myElement.offsetTop;
            document.getElementById('scroll-wrapper').children[0].scrollTop  = topPos - document.getElementById('results-info').offsetHeight;
        }
    }
}
