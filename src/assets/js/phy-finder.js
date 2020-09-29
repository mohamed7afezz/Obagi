export function phyFinder(google, finderURL) {
    const map = new Map(finderURL, google, 'map', {lat: 37.9820046, lng: -96.8954686}, 5)
    map.initMap();
    
}

class Temps {

    resultTemp (index, obj) {
        return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        ${index}
                        <br>${obj.distance.toFixed(2)}
                        <br>miles
                    </div>
                </div>
            </div>
        `
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
        this.results = [];
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
    }

    initSearch() {
        this.err.hideErr();

        this.autoComplete = new this.google.maps.places.Autocomplete(this.inputLoc, {
            types: ['(regions)'],
            componentRestrictions: {
              country: ['us', 'pr']
            }
        });

        
    }

    async searchByLocation(lat, lng) {
        this.err.hideErr();
        this.emptyParams();
        this.setLoading(true);
        
        let gcPromise = new Promise((res, rej) => {
            this.geocoder.geocode({
                    'latLng': new this.google.maps.LatLng(lat, lng)
                }, (results, st) => {
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
        
        this.appendResults(this.results.clinics)

        this.setLoading(false);
    }

    // helpers
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
    appendResults(clinics) {
        if(clinics && clinics.length > 0) {
            clinics.forEach((item, index) => {
                let li = document.createElement('li');
                li.innerHTML = this.resultTemp(index, item);
                document.getElementById('results').appendChild(li);
            })
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
        } else {
            // hide loader
            document.getElementById('loader').classList.add('d-none');
        }
    }
    
    ErrHandler() {
        const errMsgs = {
            noRes: "It doesn't look like there are any physicians within your search.",
            moreChars: 'Please enter no more than 5 characters.',
            invalidZip: 'Invalid Zip Code'
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
    }

    initMap () {
        // init search to enable autocomplete
        this.initSearch();

        // build map
        const mapOptions = {zoom: this.zoom, center: this.initCenterLoc, maxZoom: 17};
        this.map = new this.google.maps.Map(document.getElementById(this.mapId), mapOptions);

        // add eventListner while searching with location to change map location
        this.google.maps.event.addListener(this.autoComplete, 'place_changed', () => {
            console.log('bahii', this.autoComplete)
            let newPlace = this.autoComplete.getPlace();

            if(newPlace.geometry) {
                console.log('bahiii', newPlace.geometry.location)
                this.map.panTo(newPlace.geometry.location);
                this.map.setZoom(15);
            }
        });

        // check if browser navigator is allowed
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                await this.searchByLocation(position.coords.latitude, position.coords.longitude);
                console.log('bahiii', this.results)
            })
        }
    }
}
