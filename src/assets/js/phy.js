import $ from 'jquery';
import jQuery from 'jquery';
export function phyfinder(){
 
  
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  var map, env;
  var errors = {},
    pager = {},
    params = {},
    ga_params = {};
  var markerList = [],
    infoWindows = [],
    activePhysicians = [];
  var boxes = null;

  if (window.location.host.search(new RegExp("local")) > -1) {
    if (window.location.host.indexOf('8888') > -1) {
      env = "//physicians.obagi.local:8888";
    } else {
      env = "//physicians.obagi.local";
    }
  } else if (window.location.host.search(new RegExp("ga-dev1")) > -1) {
    env = "//physicianfinder.ga-dev1.com";
  } else {
    env = "//obagi-pf.ga-dev1.com";
  }

  var geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 37.9820046,
      lng: -96.8954686
    },
    zoom: 5,
    maxZoom: 17
  });
  var input = document.getElementById('finder-location-input');
  var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(regions)'],
    componentRestrictions: {
      country: ['us', 'pr']
    }
  });
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  var pfValidator = $("#phys-finder-form").validate({}); // For Goog analytics they want to know if people actually clicked and searched as opposed to using the default geolocation, so setting an initial state which we will remove later after actual search...

  ga_params.defaultmap = true;
  $("#pf-submit").addClass('defaultmap'); // !handle submit click

  $("#pf-submit").on("click", function (e) {
    params = gatherParameters();
    errors = validatePhysicianForm(params);

    if (_.size(errors) > 0) {
      pfValidator.showErrors(errors);
      return false;
    }

    if ($("input:radio[name=searchby]:checked").val() === "location") {
      // checkInputConsistency() is assuming they manually arrowed down to select something
      if (!checkInputConsistency(params)) {
        // zip, nor city and state were returned, something incomplete... just get first result
        var acResult = $(".pac-container .pac-item:first");
        var resultText = acResult.text();
        var matchText = acResult.find(".pac-item-query").text();

        if (matchText.length) {
          resultText = resultText.replace(matchText, matchText + ", ");
          $("#finder-location-input").val(resultText);
          checkInputConsistency(params);
        } else {
          $("#finder-location-input").val('');
          return false;
        }
      }
    }

    errors = validatePhysicianForm(params);

    if (_.size(errors) > 0) {
      pfValidator.showErrors(errors);
      return false;
    } else {
      $('#error-wrapper label.error').hide();
      resetErrors(); // close advanced search box if open

      $("#phys-finder .js-toggle.active").click();
      requestPhysicians(params);
    }

    if ($("#pf-submit").hasClass("pulse")) {
      $("#pf-submit, .update-search").removeClass("pulse");
    }

    if ($("#pf-submit").hasClass('defaultmap')) {
      delete ga_params.defaultmap;
      $("#pf-submit").removeClass('defaultmap');
    }

    e.preventDefault();
  }); //! pulse
  // anytime something is changed, re-pulse the submit button(s)

  $("#phys-finder-form input, #phys-finder-form select").on("change", function (e) {
    if (this.type === "checkbox") {
      $.each($("#phys-finder-form input[type=checkbox]"), function (k, v) {
        if (v.checked) {
          if (!$("#pf-submit").hasClass("pulse")) {
            $("#pf-submit, .update-search").addClass("pulse");
            return false;
          }
        }

        $("#pf-submit, .update-search").removeClass("pulse");
      });
    } else if (this.type === "text") {
      if (this.value !== '') {
        if (!$("#pf-submit").hasClass("pulse")) {
          $("#pf-submit, .update-search").addClass("pulse");
        }
      }
    } else if (this.name === "radius") {
      if (!$("#pf-submit").hasClass("pulse")) {
        $("#pf-submit, .update-search").addClass("pulse");
      }
    }
  }); // !handle pagination

  $("body").on("click", "#physician-results-list .next", function (e) {
    resetErrors();
    setAllMap(null);
    incrementPagination("forward");
    params = gatherParameters();
    updateContent(activePhysicians, params);
    updateCriteria(params);
    $('#physician-results-list').scrollTop(0);
    e.preventDefault();
  });
  $("body").on("click", "#physician-results-list .prev", function (e) {
    resetErrors();
    setAllMap(null);
    incrementPagination("back");
    params = gatherParameters();
    updateContent(activePhysicians, params);
    updateCriteria(params);
    e.preventDefault();
  }); // !handle marker behaviour

  $("body").on("click", "#physician-results-list .marker-link", function () {
    $("#physician-results-list .bodycopy").removeClass("active");
    $(this).closest(".bodycopy").addClass("active");
    numSplit = this.id.split('-');
    clearInfoWindows();
    var info = $(this).closest(".bodycopy").find(".info");
    infoWindow = new google.maps.InfoWindow();
    let infohtml = $(info).html();
    infohtml = EditInfoHtmlContent(infohtml);
    infoWindow.setContent(infohtml);
    infoWindow.open(map, markerList[numSplit[2] - 1]);
    infoWindows.push(infoWindow);
    markerList[numSplit[2] - 1].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    map.setCenter(markerList[numSplit[2] - 1].getPosition());
    map.setZoom(15);
  }); // !show or hide clinic details

  $("body").on("click", "a.detailslink", function (e) {
    toggleClinicDetail(this);
    e.preventDefault();
  }); // hide

  $("body").on("click", ".back a", function (e) {
    hideClinicDetail();
    e.preventDefault();
    return false;
  }); //! update search buttons

  $("body").on("click", ".update-search", function (e) {
    e.preventDefault();
    $('#pf-submit').click();
    return false;
  }); // close infowindows on printer click

  $("body").on("click", "#print-link", function (e) {
    clearInfoWindows();
  });
  var masonryContainer = $('.prod-system-group').masonry({
    itemSelector: '.prod-system',
    columnWidth: 1,
    transitionDuration: 0
  });

  function initialize() {
    map.setZoom(5); //google autocomplete

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      params = {};
      var p = autocomplete.getPlace();

      if (p.geometry) {
        map.panTo(p.geometry.location);
        map.setZoom(15);
      }

      if (typeof p.address_components !== "undefined") {
        $(p.address_components).each(function (k, v) {
          switch (v.types[0]) {
            case 'locality':
              params.city = v.long_name;
              break;

            case 'administrative_area_level_1':
              params.state = v.short_name;
              break;

            case 'postal_code':
              params.zip = v.long_name;
              break;

            default:
              break;
          }
        });
      }
    }); //check if user is directed here with parameters already filled in

    if (location.search.length > 0) {
      qs = getQueryParams(location.search);

      if (typeof qs.physician !== "undefined" && qs.physician.trim() != "") {
        $('#searchByPhysician').click();
        $("#finder-physician-input").val(qs.physician);
        params['physician'] = qs.physician;
      } else {
        if (typeof qs.lng !== "undefined" && typeof qs.lat !== "undefined") {
          params['lat'] = qs.lat;
          params['lng'] = qs.lng;
        } else if (typeof qs.city !== "undefined" && typeof qs.state !== "undefined") {
          params['city'] = qs.city;
          params['state'] = qs.state;
          $("#finder-location-input").val(qs.city + ', ' + qs.state).focus();
        } else if (typeof qs.zip !== "undefined") {
          params["zip"] = qs.zip;
          $("#finder-location-input").val(qs.zip).focus();
        }

        if (typeof qs.radius !== "undefined") {
          params['distance'] = qs.radius;
          $("#pf-radius").val(qs.radius);
        }
      }
    }

    if (_.size(params) > 0) {
      if ($('#adv-search-content input[type=checkbox]:checked').length > 0) {
        //implement a hashset, so there aren't duplicates
        var products = {},
          output = "";
        $("#adv-search-content input[type=checkbox]:checked").each(function () {
          products[this.value] = true;
        });
        $(products).each(function (k, v) {
          if (k !== "") {
            output += k + ",";
          }
        });
        output = output.slice(0, -1);
        params["product"] = output;
      }

      requestPhysicians(params);
    } else {
      //initialize map, set it to show the full US by default
      //if browser has geolocation, focus the map on the location and get locations for around there
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          params.lat = position.coords.latitude;
          params.lng = position.coords.longitude;
          ga_params.lat = params.lat;
          ga_params.lng = params.lng;
          geocoder.geocode({
            'latLng': new google.maps.LatLng(params.lat, params.lng)
          }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                for (var i = 0; i < results[0].address_components.length; i++) {
                  if (results[0].address_components[i]["types"][0] === "locality") {
                    params["city"] = results[0].address_components[i]["long_name"];
                  }

                  if (results[0].address_components[i]["types"][0] === "administrative_area_level_1") {
                    params["state"] = results[0].address_components[i]["short_name"];
                  }

                  if (results[0].address_components[i]["types"][0] === "country") {
                    params["country"] = results[0].address_components[i]["long_name"];
                  }

                  $("#finder-location-input").val(params["city"] + ', ' + params["state"] + ', ' + params["country"]);
                }
              }
            }
          });

          if ($('input[name="pf_product"]:checked').length > 0) {
            var products = "";
            $('input[name="pf_product"]:checked').each(function () {
              products += this.value + ",";
            });
            products = products.slice(0, -1);
            params["product"] = products;
          }

          params["distance"] = $("#pf-radius").val();
          requestPhysicians(params);
          map.setCenter(new google.maps.LatLng(params.lat, params.lng));
          params.lat = undefined;
          params.lng = undefined;
        }, function () { });
      } else {
        //browser doesn't support geolocation
        console.error('browser can not use geolocation, please upgrade');
      }
    }
  }

  function gatherParameters() {
    params["distance"] = $("#pf-radius").val(); //filter by product

    if ($("#adv-search-content input.product-item:checked").length > 0) {
      //implement a hashset, so there aren't duplicates
      var products = {},
        obagiProducts = {};
      $("#adv-search-content input.product-item:checked").each(function () {
        if (this.value !== '') {
          if (this.value.indexOf(',') > 0) {
            prodIds = this.value.split(',');
            $.each(prodIds, function (k, v) {
              products[v] = true;
            });
          } else {
            products[this.value] = true;
          } // analytics start: get a list of external ids


          var classStr = $(this).attr('class');
          var extid = classStr.replace('product-item extid-', '').toString();

          if (extid.length > 0) {
            obagiProducts[extid] = true;
          }
        }
      });
      var obagiProductIds = Object.getOwnPropertyNames(obagiProducts);
      ga_params["product_ids"] = obagiProductIds.join(); // analytics end...

      var productIds = Object.getOwnPropertyNames(products);
      params["product"] = productIds.join();
    } else {
      params["product"] = "";
    } //get criteria of zip or city/state (only required fields!) and send to API


    if ($("input:radio[name=searchby]:checked").val() === "location") {
      if (!_.isEmpty(params.city)) {
        params["city"] = params.city;
      }

      if (!_.isEmpty(params.state)) {
        params["state"] = params.state;
      }

      if (!_.isEmpty(params.zip)) {
        params["postal"] = params.zip;
      }

      params["physician"] = "";
    } else if ($("input:radio[name=searchby]:checked").val() === "physician") {
      if ($("#finder-physician-input").val()) {
        params["distance"] = "";
        params["city"] = "";
        params["state"] = "";
        params["zip"] = "";
        params["postal"] = "";
        params["physician"] = $("#finder-physician-input").val();
      }
    } else {
      params["location"] = "";
    }

    return params;
  } // ANY TIME IT RETURNS FALSE, just grab Google's autocomplete suggestions
  // ---> assume google will do one of 4 things if matched:
  // New York, United States
  // New York, NY, United States
  // New York, NY 10016, United States
  // Manhattan, New York, NY, United States
  // San Juan, 00911, Puerto Rico
  // San Juan, Puerto Rico


  function checkInputConsistency(params) {
    params.city = '';
    params.state = '';
    params.zip = '';
    input = $("#finder-location-input").val().split(",");
    input = _.map(input, function (a) {
      return $.trim(a);
    });

    if (isNaN(input[0])) {
      if (_.size(input) === 1) {
        return false;
      } else if (_.size(input) === 2) {
        // New York United States
        // San Juan Puerto Rico
        if (input[1] === 'United States') {
          params.state = input[0];
          params.city = '';
          params.zip = '';
          params.country = 'United States'; // api not currently set up to deal with state only

          return false;
        }

        if (input[1] === 'Puerto Rico') {
          params.state = 'PR'; // How we have it set up in database :(

          params.city = input[0];
          params.zip = '';
          params.country = ''; // api not currently set up to deal with state only

          return true;
        }
      } else if (_.size(input) >= 3) {
        // New York, NY, United States
        // New York, NY 10017, United States
        // San Juan, 00911, Puerto Rico
        if (_.size(input) === 4) {
          // weird case with neighborhood. hopefully we are popping it off
          // Manhattan, New York, NY, United States
          input.shift();
        }

        if (isNaN(input[1])) {
          if (input[1].length === 2) {
            // just state
            params.city = input[0];
            params.state = input[1];
            params.zip = '';
            return true;
          }

          if (input[2] === 'Puerto Rico') {
            // St Just, Trujillo Alto, Puerto Rico
            params.state = 'PR'; // How we have it set up in database :(

            params.city = input[0];
            params.zip = '';
            params.country = '';
            return true;
          } // try to split into state, zip


          var arr = input[1].split(' ');

          if (arr[0].length === 2) {
            // possibly state and zip
            if (arr[1].length === 5 && !isNaN(arr[1])) {
              params.city = input[0];
              params.state = arr[0];
              params.zip = arr[1];
              return true;
            }
          }
        } else {
          // second param is a number
          if (input[1].length === 5) {
            params.city = input[0];
            params.zip = input[1];
            return true;
          }
        }
      }
    }

    return false;
  }

  function requestPhysicians(params) {
    pager = {};
    setAllMap(null);
    markerList = [], physicianPool = [], activePhysicians = [];
    resetErrors();
    $.ajax({
      async: false,
      beforeSend: function beforeSend() {
        // scroll to the map
        scrollToAnchor('#phys-finder', -25);
        $('#in-progress').fadeIn();
      },
      // contentType: "application/json; charset=utf-8",
      // crossDomain: true,
      // jsonp: 'callback',
      data: params,
      // dataType: "jsonp",
      datatype: 'json',
      // type: "GET",
      method: 'Post',
      url: "/ajax/api/hcpfinder",
      success: function success(data) {
        //data = JSON.parse(data); // get rid of spinner

        $('#in-progress').fadeOut(); // enable disabled "autoupdate" elements
        //$('#sort-dist').prop('disabled', false);

        if (_typeof(data) === "object") {
          if (data['totalCount'] > 0) {
            //start pagination
            pager["total"] = data["totalCount"];

            if (!pager["start"] && !pager["end"]) {
              //init pagination
              pager["start"] = 1;

              if (data['totalCount'] >= 10) {
                pager["end"] = 10;
              } else {
                pager["end"] = data['totalCount'];
              }
            }

            var physicianPool = [];
            $.each(data['clinics'], function (key, value) {
              physicianPool.push(value);
            }); //SORTING
            // sort-dist bypasses the sales-sorting
            //! functionality has been removed by client 3/1/2016
            //if ($("input:radio[name=searchby]:checked").val() === "location" && $("#sort-dist:checked").length === 0) {
            //  physicianPool = sortPhysicians(physicianPool);
            //}

            for (i = 0; i < physicianPool.length; i++) {
              activePhysicians.push(physicianPool[i]);
            }

            updateContent(activePhysicians, params);
            updateCriteria(params); //make first clinic in list active

            $("#physician-results-list .bodycopy").removeClass("active");
            $("#info-list-1").closest(".bodycopy").addClass("active");
            clearInfoWindows();
            var info = $("#info-list-1").closest(".bodycopy").find(".info");
            infoWindow = new google.maps.InfoWindow();
            let infohtml = $(info).html();
            infohtml = EditInfoHtmlContent(infohtml);
            infoWindow.setContent(infohtml);
            infoWindow.open(map, markerList[0]);
            infoWindows.push(infoWindow);
            markerList[0].setZIndex(google.maps.Marker.MAX_ZINDEX + 1); // only center for distance searches because phys searches could be map-wide

            if ($("input:radio[name=searchby]:checked").val() === "location") {
              var center = markerList[0].getPosition();
              map.setCenter(center);
            } else {
              if (_.size(markerList) > 1) {
                map.setZoom(4);
              }
            } // send analytics


            $.extend(ga_params, params);
            ga_params.searchby = $("input:radio[name=searchby]:checked").val();
            delete ga_params.product;
            var str = decodeURIComponent($.param(ga_params));

            //_gaq.push(["_trackEvent", "Physician Finder", "Search", str]);

            if ($("#email-link")) {
              $("#email-link").attr("href", 'mailto:?subject=Obagi Physician Finder Results&body=Copy this url into your browser: ' + window.location.href + '?' + $.param(params));
            }
          } else {
            var address = params.city + ', ' + params.state;

            if (params.zip != '') {
              address += ' ' + params.zip;
            }

            if (geocoder) {
              geocoder.geocode({
                'address': address
              }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  map.setCenter(results[0].geometry.location);
                  map.setZoom(13);
                } else {
                  console.error("Geocoding failed: " + status);
                  var mapOptions = {
                    center: {
                      lat: 37.9820046,
                      lng: -96.8954686
                    },
                    zoom: 5,
                    maxZoom: 17
                  };
                  map.setOptions(mapOptions);
                }
              });
            }

            updateContent(activePhysicians, params);
            updateCriteria(params);
            setAllMap(null);
            clearInfoWindows();
            markerList = [];
            console.error("No results returned by API");

            if (params['physician']) {
              pfValidator.showErrors({
                "finder-physician-input": "No Results Found."
              });
            } else {
              pfValidator.showErrors({
                "finder-location-input": "It doesn't look like there are any physicians within your search."
              });
            }
          }
        } else {
          //nothing returned back from the API, should give an error
          console.error("Data formatted incorrectly by API");
        }
      },
      error: function error(response, status, _error) {
        console.error("****** Error ******");
        console.error("Response: " + response.statusText);
        console.error("Status: " + status);
        console.error("Error: " + _error);
      }
    });
  } // group into incremental distances


  function sortPhysicians(clinics) {
    // create our range from high to low, cause ceiling is 100 miles.
    var range = _.range(0, 100, 5);

    range = range.reverse(); // create groups within 5 mile increments

    var groups = []; // filter distance is greater than range iteration

    _.filter(clinics, function (clinic) {
      return _.some(range, function (num) {
        groups[num] = _typeof(groups[num]) !== undefined && _instanceof(groups[num], Array) ? groups[num] : [];

        if (clinic.distance > num) {
          groups[num].push(clinic);
          return true;
        }
      }, clinic);
    });

    clinics = _.each(groups, function (c) {
      c.sort(function (x, y) {
        var salesX = x.totalNetSales;
        var salesY = y.totalNetSales;

        if (salesX !== salesY) {
          return compareSimple(salesX, salesY);
        } // REVERSING the x and y values here because we want ascending order


        return compareSimple(y.distance, x.distance);
      });
      c = c.reverse();
    });
    return _.flatten(clinics);
  } // simple generic comparison function


  function compareSimple(x, y) {
    if (x === y) {
      return 0;
    }

    return x > y ? 1 : -1;
  }

  function validatePhysicianForm(params) {
    if (_.size(errors) > 0) {
      //pfValidator.resetForm();
      resetErrors();
      errors = {};
    }

    if ($("input:radio[name=searchby]:checked").val() === "location") {
      var regAlphaOnly = new RegExp("[0-9]");

      if (regAlphaOnly.test(params['city']) === true) {
        errors["finder-location-input"] = "No Results Found.";
        console.error("Bad input in location field");
      }

      if (!params['city'] && !params['state']) {
        if ($('#finder-location-input').val() === '') {
          errors['finder-location-input'] = 'ZIP Code is required.';
          console.log('ZIP Code is required.');
        } else {
          errors["finder-location-input"] = "Invalid Zip Code";
          console.error("No input in location field when location is selected.");
        }
      }
    } else if ($("input:radio[name=searchby]:checked").val() === "physician") {
      if (!params['physician']) {
        console.log(errors);
        errors["finder-physician-input"] = "Physician name is required.";
        console.error("No input in physician field when physician is selected.");
      }
    }

    return errors;
  }

  function resetErrors() {
    $("input.error").removeClass("error");
    $('#error-wrapper .error').css('display', 'none');
    $('#error-wrapper').empty('');
    $('#error-wrapper').append('<label class="error remove" for="finder-location-input" id="pf-location-error" generated="true"></label>' + '<label class="error remove" for="finder-physician-input" id="pf-physician-error" generated="true"></label>');
  }

  function clearInfoWindows() {
    for (var i = 0; i < infoWindows.length; i++) {
      infoWindows[i].close();
    }
  }

  function setAllMap(map) {
    for (var i = 0; i < markerList.length; i++) {
      markerList[i].setMap(map);
    }
  }

  function getQueryParams(qs) {
    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;
    qs = qs.split("+").join(" ");

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }

  function incrementPagination(direction) {
    if (!pager["start"] && !pager["end"]) {
      pager["start"] = 1;
      pager["end"] = 10;
    } else {
      if (direction === "forward") {
        pager["start"] += 10;
        pager["end"] += 10;
      } else if (direction === "back") {
        pager["start"] -= 10;
        pager["end"] -= 10;
      }
    }
  }

  function updateContent(clinics, params) {
    $("#physician-results-list .inner").empty(); // if no results

    if (clinics.length === 0) {
      $("#phys-finder-search-results #physician-results-list").hide();
      $('.d-flex').removeClass('search');
      return;
    } // if results


    if ($("#phys-finder-search-results #physician-results-list").css("display") === "none") {
      $("#phys-finder-search-results #physician-results-list").css("display", "block");
      $('.d-flex').addClass('search');
    }

    nextPrev = "";

    if (pager["total"] > 10) {
      nextPrev = '<span class="next-prev right">';

      if (pager["start"] > 1 && pager["end"] < pager["total"]) {
        nextPrev += ' <a href="#" class="prev">Previous</a> <a href="#" class="next">Next</a>';
      } else if (pager["end"] >= pager["total"]) {
        nextPrev += '<a href="#" class="prev">Previous</a>';
      } else if (pager["end"] < pager["total"]) {
        nextPrev += '<a href="#" class="next">Next</a>';
      }

      nextPrev += '</span>';
    }

    if (pager["end"] >= pager["total"]) {
      k = pager["total"];
    } else {
      k = pager["end"];
    }

    $("#physician-results-list .inner").append('<div class="left count">' + pager["start"] + '-' + k + ' of ' + pager["total"] + '</div>' + nextPrev + '<div class="clearfix"></div><hr class="first" />');
    bounds = new google.maps.LatLngBounds(); // clinics array is zero-based, while pager starts at 1, so make adjustment

    var _start = pager["start"] - 1;

    var _end = pager["end"] - 1;

    for (var i = _start; i <= _start + (_end - _start); i++) {
      if (clinics[i]) {
        content = formatContent(clinics[i], i, params);
        $("#physician-results-list .inner").append(content);
        bounds.extend(new google.maps.LatLng(clinics[i]['lat'], clinics[i]['lng']));
        map.fitBounds(bounds);
      }
    }

    $("#physician-results-list .inner").append('<div class="left count">' + pager["start"] + '-' + k + ' of ' + pager["total"] + '</div>' + nextPrev);
    hideClinicDetail();
  }

  function updateCriteria(params) {
    if (pager["total"] === undefined) {
      // in case there are 0 results
      pager["total"] = 0;
    }

    if ($(".count #pf-count-results")) {
      var t = parseInt(pager["total"]) === 1 ? 'result' : 'results';
      resultsString = pager["total"] + " " + t + " for";
      resultsString += formatCriteria(params);
      $(".count #pf-count-results").html(resultsString);
    }
  }

  function formatCriteria(data) {
    var output = ""; // physician

    if ($("input:radio[name=searchby]:checked").val() === "physician") {
      if (data['physician']) {
        output += " " + data['physician'];
      }

      if (data['product']) {
        // some product ids might share a name, count unique names
        var count = {};
        var prods = itemIdsToProductArray(data['product']);
        $.each(prods, function (i, v) {
          count[v] = i;
        });
        output += ", <span class=\"nowrap\">" + Object.keys(count).length + " product(s)</span>";
      }
    } else {
      // location
      var sortedData = {};
      var locationKeys = ['zip', 'city', 'state', 'location'];

      if (data['location']) {
        sortedData['location'] = data['location'];
      }

      if (data['zip']) {
        sortedData['zip'] = data['zip'];
      }

      if (data['city']) {
        sortedData['city'] = data['city'];
      }

      if (data['state']) {
        sortedData['state'] = data['state'];
      }

      if (data['distance']) {
        sortedData['distance'] = data['distance'];
      }

      if (data['product']) {
        sortedData['product'] = data['product'].split(',');
      }

      $.each(sortedData, function (key, peele) {
        if ($.inArray(key, locationKeys) > -1) {
          // no need to have United States in here
          output += " " + peele.replace(', United States', '');
        } else if (key === 'product') {
          // some product ids might share a name, count unique names
          var count = {};
          var prods = itemIdsToProductArray(data['product']);
          $.each(prods, function (i, v) {
            count[v] = i;
          });
          output += ", <span class=\"nowrap\">" + Object.keys(count).length + " product(s)</span>";
        } else if (key === 'distance') {
          output += ", <span class=\"nowrap\">" + peele + " mile radius</span>";
        }
      });

      if (output.length < 1) {
        output += " your area";
      }
    }

    return output;
  }

  function formatContent(clinicData, key, params) {
    var iconIndex = key + 1;
    infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(clinicData['lat'], clinicData['lng']),
      icon: 'data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%2215px%22%20y%3D%2220px%22%20width%3D%2228px%22%20height%3D%2238px%22%20viewBox%3D%2250%2025%200.1%2038%22%20enable-background%3D%22new%2050.606%2045%2026.789%2038%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%236286B0%22%20stroke%3D%22%23555555%22%20stroke-miterlimit%3D%2210%22%20d%3D%22M47.169%2C26.969c-6.4%2C1.666-10.844%2C8.774-9.295%2C14.899c1.158%2C4.605%2C11.149%2C21.618%2C12.712%2C21.632%20c1.245%2C0.016%2C9.644-13.247%2C12.003-18.967C66.789%2C34.368%2C57.841%2C24.175%2C47.169%2C26.969z%22%2F%3E%3Ctext%20transform%3D%22translate(50%2045)%22%20fill%3D%22%23ffffff%22%20style%3D%22font-family%3A%20Arial%2C%20sans-serif%3Bfont-weight%3Abold%3Btext-align%3Acenter%3B%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E' + iconIndex + '%3C%2Ftext%3E%3C%2Fsvg%3E',
      animation: google.maps.Animation.DROP,
      title: clinicData['name'],
      zIndex: key
    });
    google.maps.event.addListener(map, "click", function () {
      infoWindow.close();
    });
    google.maps.event.addListener(marker, 'click', function () {
      var infoContent = formatData(clinicData, key, 'info', params);
      $(".bodycopy").removeClass("active");
      $("#info-list-" + (parseInt(key) + 1)).addClass("active");
      $('#physician-results-list').animate({
        scrollTop: $('#physician-results-list').scrollTop() + $("#info-list-" + (parseInt(key) + 1)).position().top
      }, 1000);
      infoContent = EditInfoHtmlContent(infoContent);
      infoWindow.setContent(infoContent);
      infoWindow.open(map, marker, iconIndex);
      map.setCenter(marker.getPosition());
    });
    markerList.push(marker);
    return formatData(clinicData, key, 'list', params);
  }

  function formatData(clinicData, key, type, params) {
    var output = '';
    var options = {
      type: type,
      iconIndex: key + 1,
      clinicData: clinicData
    };
    var locationSearch = $("input:radio[name=searchby]:checked").val() === "location" ? true : false;

    if (locationSearch && clinicData['distance'] !== null) {
      var d = clinicData['distance'];
      options.distance = d < 100 ? d.toFixed(2) : d < 1000 ? d.toFixed(1) : d.toFixed();
    }

    if (clinicData['doctorFName'] && clinicData['doctorLName']) {
      options.physicianName = clinicData['doctorFName'] + " " + clinicData['doctorLName'];
    }

    var c = '';

    if (clinicData['city']) {
      c += clinicData['city'];
    }

    if (clinicData['state']) {
      c += ', ' + clinicData['state'];
    }

    if (clinicData['zip']) {
      c += ' ' + clinicData['zip'];
    }

    options.cityStateZip = c; // options.productNames = '';
    // options.numProducts = 0;

    if (params['product'] && clinicData['netSalesPerItem'] !== null) {
      var productArr = params['product'].toString().split(',');

      var netSalesKeys = _.keys(clinicData['netSalesPerItem']);

      var foundProducts = _.intersection(productArr, netSalesKeys);

      var productNames = itemIdsToProductArray(foundProducts); // filter dupe product names

      var unique = productNames.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });
      options.productNames = unique;
      options.numProducts = _.size(unique);
    } //! infowindow.handlebars


    var compiledTemplate = Handlebars.getTemplate('infowindow');
    output += compiledTemplate(options); //output = `<div><p>${options.clinicData.numProducts} Products</p></div>`

    return output;
  }

  function toggleClinicDetail(target) {
    var output = '';
    var numberInfo = target.id.split("-");
    var number = parseInt(numberInfo[1]); // activePhysicians is zero-based, so need to subtract one

    var clinicData = activePhysicians[number - 1];
    var options = {
      number: number,
      clinicData: clinicData
    };
    var locationSearch = $("input:radio[name=searchby]:checked").val() === "location" ? true : false;

    if (locationSearch && clinicData['distance'] !== null) {
      var d = clinicData['distance'];
      options.distance = d < 100 ? d.toFixed(2) : d < 1000 ? d.toFixed(1) : d.toFixed();
    }

    if (clinicData['doctorFName'] && clinicData['doctorLName']) {
      options.physicianName = clinicData['doctorFName'] + " " + clinicData['doctorLName'];
    }

    var c = '';

    if (clinicData['city']) {
      c += clinicData['city'];
    }

    if (clinicData['state']) {
      c += ', ' + clinicData['state'];
    }

    if (clinicData['zip']) {
      c += ' ' + clinicData['zip'];
    }

    options.cityStateZip = c; // options.productNames = '';
    // options.numProducts = 0;

    if (params['product'] && clinicData['netSalesPerItem'] !== null) {
      var productArr = params['product'].toString().split(',');

      var netSalesKeys = _.keys(clinicData['netSalesPerItem']);

      var foundProducts = _.intersection(productArr, netSalesKeys);

      var productNames = itemIdsToProductArray(foundProducts); // filter dupe product names

      var unique = productNames.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });
      options.productNames = unique;
      options.numProducts = _.size(unique);
    } // leave some html for now, we will pass 'number', 'prev', and 'next' to the hb template


    var prevNum = number - 1,
      prev = '';

    if (!prevNum < 1) {
      prev = '<a class="detailslink" id="prev-' + prevNum + '">< ' + number + '</a> of ';
    } else {
      prev = '< ' + number + ' of ';
    }

    var nextNum = number + 1,
      next = '';

    var maxNumber = _.size(activePhysicians);

    if (nextNum <= maxNumber) {
      next = '<a class="detailslink" id="next-' + nextNum + '">' + maxNumber + ' ></a>';
    } else {
      next = maxNumber + ' >';
    }

    options.prev = prev;
    options.next = next; //! details.handlebars

    var compiledTemplate = Handlebars.getTemplate('details');
    output += compiledTemplate(options);
    $("#physician-results-list .inner").hide();

    if ($("#clinic-details-container").length) {
      $("#clinic-details-container").html(output);
    } else {
      var detailInfo = '<div id="clinic-details-container">' + output + '</div>';
      $("#physician-results-list").append(detailInfo);
    }

    if (!$("#clinic-details-container").hasClass("active")) {
      $("#clinic-details-container").addClass("active");
    } // scroll up if less than 768px


    if (intent.axes.width.current != "standard") {
      scrollToAnchor('#physician-results-list');
    }
  }

  function hideClinicDetail() {
    if ($("#clinic-details-container").hasClass("active")) {
      $("#clinic-details-container").removeClass("active");
    }

    $("#physician-results-list .inner").show();
  }

  function formatEmailLink(dataObj) {
    output = "";

    if (dataObj) {
      $.each(dataObj, function (key, peele) {
        output += key + "=" + peele + "&";
      });
      output = output.slice(0, -1);
    }

    return encodeURIComponent(output);
  } //! handle search by physician or location


  $("input:radio[name=searchby]").on("change", function () {
    if (this.id === 'searchByPhysician') {
      document.getElementById("pf-radius").disabled = true; //document.getElementById("sort-dist").disabled = true;

      $("#finder-location-input").val('').hide();
      $("#finder-physician-input").show();
    }

    if (this.id === 'searchByLocation') {
      document.getElementById("pf-radius").disabled = false; //document.getElementById("sort-dist").disabled = false;

      $("#finder-physician-input").val('').hide();
      $("#finder-location-input").show();
    }
  }); //! advanced search

  $("#phys-finder .js-toggle").on("click", function (e) {
    e.preventDefault();
    var target = $(this);

    if (target.hasClass("active")) {
      target.removeClass("active");
      $("#adv-search-content").slideUp(750);
      target.children('span.glyphicon-arrow-up').hide().siblings('span.glyphicon-arrow-down').show();
    } else {
      target.addClass('active');
      $('#adv-search-content').slideDown(750, function () {
        masonryContainer.masonry('layout');
      });
      target.children('span.glyphicon-arrow-down').hide().siblings('span.glyphicon-arrow-up').show();
    }
  });
  $("#phys-finder .js-tab").on("click", function () {
    var target = $(this);
    index = target.parent().index();

    if (!target.hasClass("active")) {
      $("#phys-finder .js-tab").removeClass("active");
      target.addClass("active");
      $("#phys-finder .tabs li").removeClass("active").children(".js-tab").removeClass("active");
      target.addClass("active").parent().addClass("active");
      $("#phys-finder .tab-content").removeClass("active");
      $('#tab-content-' + index).addClass("active");
      masonryContainer.masonry('layout');

      if (intent.axes.width.current === "mobile" || intent.axes.width.current === "tablet" || intent.axes.width.current === "tablet480") {
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000);
      }
    } else {
      //depends on intention.js (obv)
      if (intent.axes.width.current === "mobile" || intent.axes.width.current === "tablet" || intent.axes.width.current === "tablet480") {
        target.removeClass("active");
        $("#phys-finder .tab-content").eq(index).removeClass("active");
      }
    }
  });
  var prod_group_count = [];
  $(".prod-system-group input[type=checkbox]").on("click", function (e) {
    $.each($(".prod-system-group input[type=checkbox]"), function (k, v) {
      if ($(v).prop("checked")) {
        if ($("#clear-all-prods").hasClass("hide")) {
          $("#clear-all-prods").removeClass("hide");
          $("#clear-all-prods").addClass("active");
        }

        return false;
      }

      $("#clear-all-prods").addClass("hide");
      $("#clear-all-prods").removeClass("active");
    });
  }); //! handle Clear Advanced Search Selections

  $("#clear-all-prods span").on("click", function (e) {
    // so clicking this doesn't trigger the blue bar that opens window
    e.stopPropagation(); // close advanced search if it's open

    if ($("#phys-finder .js-toggle").hasClass('active')) {
      $("#phys-finder .js-toggle").trigger('click');
    }

    $(".prod-system-group input[type=checkbox]").prop("checked", false);
    $("#clear-all-prods").addClass("hide");
    $("#clear-all-prods").removeClass("active");
    $('#phys-finder .js-tab span.count').text('').css('display', 'none');
    prod_group_count = [0, 0, 0, 0, 0]; // redo search with nothing

    $('#pf-submit').click();
  }); //! handle "autoupdate" sort by distance
  //  $('#sort-dist').change(function(){
  //    // check to see if markers are loaded, meaning a search has already been done
  //    if (markerList.length > 0) {
  //      if ($("input:radio[name=searchby]:checked").val() === "location") {
  //        $('#pf-submit').click();
  //        // prevent people from double submitting
  //        $(this).prop('disabled', true);
  //      }
  //    }
  //  });
  // change counter each time a product is checked

  _.each($('#phys-finder .prod-system-group'), function (group, i) {
    $(group).find('input.product-item').on("change", function () {
      // count all checked boxes in this group each time it changes
      prod_group_count[i] = $(group).find('input.product-item:checked').length;
      var span_count = $('#phys-finder .js-tab span.count').eq(i);

      if (prod_group_count[i] > 0) {
        span_count.text(prod_group_count[i]).css('display', 'inline-block');
      } else {
        span_count.text('').css('display', 'none');
      }
    });
  }); //! prevent default submit of form
  // so we don't get a page refresh with query params


  $("#phys-finder form").on("submit", function (e) {
    e.preventDefault();
  });

  function scrollToAnchor(aid, offset) {
    var aTag = $(aid);
    var $top = aTag.offset().top;

    if (offset !== null && offset !== undefined) {
      $top += offset;
    }

    $('html,body').animate({
      scrollTop: $top
    }, 'fast');
  }

  google.maps.event.addDomListener(window, 'load', initialize); //seems like a bad way to do it now, but better than making 10,000 ajax calls and I don't want to hardcode in the values right now either

  function cacheItemIdBoxes() {
    var items = {};
    $.each($("#adv-search-content input.product-item"), function (k, v) {
      if (v.value !== "") {
        if (v.value.indexOf(",") > 0) {
          var x = v.value.split(",");
          $.each(x, function (y, z) {
            items[z] = $.trim($(v).parent().text());
          });
        } else {
          items[v.value] = $.trim($(v).parent().text());
        }
      }
    });
    return items;
  }

  function itemIdsToProductArray(itemIds) {
    var products = itemIds.toString().split(',');
    return _.map(products, function (product) {
      return itemIdToProductName(product);
    });
  }

  function itemIdToProductName(itemId) {
    if (boxes === null) {
      boxes = cacheItemIdBoxes();
    }

    if (boxes[itemId] !== undefined) {
      return boxes[itemId];
    } else {
      console.error("Cannot find product name for itemId: " + itemId);
      return "";
    }
  } // Handlebars block helper for comparision operations


  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return v1 == v2 ? options.fn(this) : options.inverse(this);

      case '===':
        return v1 === v2 ? options.fn(this) : options.inverse(this);

      case '<':
        return v1 < v2 ? options.fn(this) : options.inverse(this);

      case '<=':
        return v1 <= v2 ? options.fn(this) : options.inverse(this);

      case '>':
        return v1 > v2 ? options.fn(this) : options.inverse(this);

      case '>=':
        return v1 >= v2 ? options.fn(this) : options.inverse(this);

      case '&&':
        return v1 && v2 ? options.fn(this) : options.inverse(this);

      case '||':
        return v1 || v2 ? options.fn(this) : options.inverse(this);

      default:
        return options.inverse(this);
    }
  });

  function myModule_ajax_load(req) {
    return new Promise(function (res, rej) {
      $.ajax({
        url: '/ajax/api/getformblock',
        method: 'Post',
        success: function success(result) {
          //res(JSON.parse(result));
          res(result);
        }
      }).fail(function () {
        rej('error');
      });
    });
  }

  $(document).on('click', '.make-appointment',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(e) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e.preventDefault();
                  _context.next = 3;
                  /*
                  return myModule_ajax_load({
                    customer_number: $(this).attr('data-id')
                  }).then(function (res) {
                    $('#productsModal .modal-body ul li').remove();

                    for (var _i = 0; _i < res.length; _i++) {
                      $('#productsModal .modal-body ul').append("<li>" + res[_i].item_description + "</li>");
                    }

                    $('#productsModal').modal('show');
                  });
                  */
                  if (jQuery('.webform-confirmation').length == 1) {
                    var self = this;
                    myModule_ajax_load().then(function (res) {
                      $('#MakeAppointmentModal .modal-body').html('');
                      $('#MakeAppointmentModal .modal-body').append(res);
                      drupalSettings.ajax = {
                        "edit-actions-submit": {
                          "callback": "::submitAjaxForm",
                          "event": "click",
                          "disable-refocus": true,
                          "effect": "fade",
                          "speed": 1000,
                          "progress": {
                            "type": "throbber",
                            "message": ""
                          },
                          "url": "/hcpfinder?ajax_form=1",
                          "dialogType": "ajax",
                          "submit": {
                            "_triggering_element_name": "op",
                            "_triggering_element_value": "SUBMIT"
                          },
                          "selector": "#edit-actions-submit"
                        }
                      };
                      /////////// what is this ya bahiii////
                      Drupal.attachBehaviors();

                      $('.form-physician-email input').val($(self).attr('data-id'));
                      $('.form-physician-name input').val($(self).closest(".info").find('.physician-name').text());
                      $('.form-physician-address input').val($(self).closest(".info").find('.address-one').text());
                      $('.form-clinic-name input').val($(self).closest(".info").find('.clinic-name').text());
                      $('.form-physician-phone input').val($(self).closest(".info").find('.phone').text());
                      $('.form-physician-city input').val($(self).closest(".info").find('.city').text());
                      PageLoad($);
                      selectFormatter($);
                      $('#MakeAppointmentModal').modal('show');
                    });
                  } else {

                    $('.form-physician-email input').val($(this).attr('data-id'));
                    $('.form-physician-name input').val($(this).closest(".info").find('.physician-name').text());
                    $('.form-physician-address input').val($(this).closest(".info").find('.address-one').text());
                    $('.form-clinic-name input').val($(this).closest(".info").find('.clinic-name').text());
                    $('.form-physician-phone input').val($(this).closest(".info").find('.phone').text());
                    $('.form-physician-city input').val($(this).closest(".info").find('.city').text());
                    $('.form-sales-email input').val($(this).closest(".info").find('.sales-email').text());
                    $('#MakeAppointmentModal').modal('show');
                  }

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());


  $('input[name="searchby"]').change(function () {
    updateContent([], '');
    $('#pf-count-results').empty();
    setAllMap(null);
    resetErrors();
    errors = new Object();
    errors = {};
    console.log(errors); // window.location.reload();
  });

  if ($('input[name="searchby"]:checked').val() === 'physician') {
    //$('#pf-radius').prop( "disabled", true );
    document.getElementById("pf-radius").disabled = true; //document.getElementById("sort-dist").disabled = true;

    $("#finder-location-input").val('').hide();
    $("#finder-physician-input").show();
  } /////////////////////////// Toggle between Map and List tabs in mobile //////////////////////////


  $(window).on('resize', function () {
    if ($(window).width() > 767) {
      $('.d-flex .left-side').css("display", "block");
      $('.d-flex .right-side').css("display", "block");
      $('#phys-finder-search-form').after($('#error-wrapper').detach());
    } else {
      $('.d-flex .right-side').css("display", "block"); // Show Map

      $('.d-flex .left-side').css("display", "none"); // Hide List

      $('#mapTab').addClass('active');
      $('#listTab').removeClass('active');

      if ($(window).width() < 481) {
        $('#phys-finder-search-form .i-b.searchby-wrapper').after($('#error-wrapper').detach());
      } else {
        $('#phys-finder-search-form').after($('#error-wrapper').detach());
      }
    }
  });
  $('#listTab').click(function () {
    $('.d-flex .right-side').css("display", "none"); // Hide Map

    $('.d-flex .left-side').css("display", "block"); // Show List

    $('#listTab').addClass('active');
    $('#mapTab').removeClass('active');
  });
  $('#mapTab').click(function () {
    $('.d-flex .right-side').css("display", "block"); // Show Map

    $('.d-flex .left-side').css("display", "none"); // Hide List

    $('#mapTab').addClass('active');
    $('#listTab').removeClass('active');
  });
})(jQuery);

function EditInfoHtmlContent(htmlcontent) {
  htmlcontent = htmlcontent.replace("Get Directions â€º", "Directions");
  htmlcontent = htmlcontent.replace("Visit Website â€º", "Website");
  return htmlcontent;
}
function selectSubProducts(selector) {
  var idElems = selector.id.split("-"); // get product checkboxes

  var boxes = jQuery("#products-" + idElems[idElems.length - 1]).find("input.product-item");

  if (document.getElementById(selector.id).checked) {
    jQuery.each(boxes, function (k, box) {
      document.getElementById(box.id).checked = true;
      jQuery(box).trigger('change');
    });
  } else {
    jQuery.each(boxes, function (k, box) {
      document.getElementById(box.id).checked = false;
      jQuery(box).trigger('change');
    });
  }

  return false;
}
}