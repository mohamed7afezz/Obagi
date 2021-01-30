import jQuery from "jquery"
Handlebars.getTemplate = function (name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
      jQuery.ajax({
        url: '/sites/all/modules/_custom/new_phys_finder/js/templates/' + name + '.handlebars',
        success: function (data) {
          if (Handlebars.templates === undefined) {
            Handlebars.templates = {};
          }
          Handlebars.templates[name] = Handlebars.compile(data);
        },
        async: false
      });
    }
    return Handlebars.templates[name];
  };
  
  (function () {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['details'] = template({
      "1": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = container.escapeExpression;
  
        return "      "
          + alias1(((helper = (helper = helpers.distance || (depth0 != null ? depth0.distance : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "distance", "hash": {}, "data": data }) : helper)))
          + " "
          + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.distanceType : stack1), depth0))
          + "\n";
      }, "3": function (container, depth0, helpers, partials, data) {
        var helper;
  
        return "      <h4>"
          + container.escapeExpression(((helper = (helper = helpers.physicianName || (depth0 != null ? depth0.physicianName : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "physicianName", "hash": {}, "data": data }) : helper)))
          + "</h4>\n";
      }, "5": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"clinic-name\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.name : stack1), depth0))
          + "</div>\n";
      }, "7": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"row cemail\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.cemail : stack1), depth0))
          + "</div>\n";
      }, "9": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"address-one\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address1 : stack1), depth0))
          + "</div>\n";
      }, "11": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"address-two\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address2 : stack1), depth0))
          + "</div>\n";
      }, "13": function (container, depth0, helpers, partials, data) {
        var helper;
  
        return "      <div class=\"row city\">"
          + container.escapeExpression(((helper = (helper = helpers.cityStateZip || (depth0 != null ? depth0.cityStateZip : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "cityStateZip", "hash": {}, "data": data }) : helper)))
          + "</div>\n";
      }, "15": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"phone\"><a href=\"tel:" + depth0.clinicData.phone + "\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.phone : stack1), depth0))
          + "</a></div>\n";
      }, "17": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"row website\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.website : stack1), depth0))
          + "</div>\n";
      }, "19": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"row specialty\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.specialty : stack1), depth0))
          + "</div>\n";
      }, "21": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {});
  
        return "    <div class=\"clinic-details product-info\">\n      <p>\n        <strong>"
          + container.escapeExpression(((helper = (helper = helpers.numProducts || (depth0 != null ? depth0.numProducts : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(alias1, { "name": "numProducts", "hash": {}, "data": data }) : helper)))
          + " SELECTED PRODUCTS FOUND</strong>\n      </p>\n      <ul>\n"
          + ((stack1 = helpers.each.call(alias1, (depth0 != null ? depth0.productNames : depth0), { "name": "each", "hash": {}, "fn": container.program(22, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "      </ul>\n      <hr/>\n      <div>\n        <em>All products are subject to availability. Call your skin care professional to confirm products are in stock.</em>\n      </div>\n    </div>\n";
      }, "22": function (container, depth0, helpers, partials, data) {
        return "          <li>"
          + container.escapeExpression(container.lambda(depth0, depth0))
          + "</li>\n";
      }, "compiler": [7, ">= 4.0.0"], "main": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = helpers.helperMissing, alias3 = "function", alias4 = container.escapeExpression, alias5 = container.lambda;
  
        return "<header>\n  <div class=\"clearfix\">\n    <span class=\"clinic-details back left\"><a href=\"#\">< BACK</a></span>\n    <span class=\"clinic-details pagination next-prev right\">"
          + ((stack1 = ((helper = (helper = helpers.prev || (depth0 != null ? depth0.prev : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "prev", "hash": {}, "data": data }) : helper))) != null ? stack1 : "")
          + ((stack1 = ((helper = (helper = helpers.next || (depth0 != null ? depth0.next : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "next", "hash": {}, "data": data }) : helper))) != null ? stack1 : "")
          + "</span>\n  </div>\n</header>\n<section>\n  <div class=\"clinic-details number\">\n    <a class=\"marker-link\" id=\"marker-"
          + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "number", "hash": {}, "data": data }) : helper)))
          + "\"><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"15px\" y=\"20px\" width=\"28px\" height=\"38px\" viewBox=\"50 25 0.1 38\" enable-background=\"new 50.606 45 26.789 38\" xml:space=\"preserve\"><path fill=\"#6286B0\" stroke=\"#555555\" stroke-miterlimit=\"10\" d=\"M47.169,26.969c-6.4,1.666-10.844,8.774-9.295,14.899c1.158,4.605,11.149,21.618,12.712,21.632 c1.245,0.016,9.644-13.247,12.003-18.967C66.789,34.368,57.841,24.175,47.169,26.969z\"/><text transform=\"translate(50 45)\" fill=\"#ffffff\" style=\"font-family: Arial, sans-serif;font-weight:bold;text-align:center;\" font-size=\"12\" text-anchor=\"middle\">"
          + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "number", "hash": {}, "data": data }) : helper)))
          + "</text></svg></a>\n"
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.distance : depth0), { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "  </div>  \n  <div class=\"clinic-details info\">\n"
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.physicianName : depth0), { "name": "if", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.name : stack1), { "name": "if", "hash": {}, "fn": container.program(5, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.cemail : stack1), { "name": "if", "hash": {}, "fn": container.program(7, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address1 : stack1), { "name": "if", "hash": {}, "fn": container.program(9, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address2 : stack1), { "name": "if", "hash": {}, "fn": container.program(11, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.cityStateZip : depth0), { "name": "if", "hash": {}, "fn": container.program(13, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.phone : stack1), { "name": "if", "hash": {}, "fn": container.program(15, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.website : stack1), { "name": "if", "hash": {}, "fn": container.program(17, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.specialty : stack1), { "name": "if", "hash": {}, "fn": container.program(19, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "  </div>\n  <hr/>\n"
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.numProducts : depth0), { "name": "if", "hash": {}, "fn": container.program(21, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "</section>\n<a target=\"_blank\" href=\"https://maps.google.com?daddr="
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address1 : stack1), depth0))
          + "+"
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.city : stack1), depth0))
          + "+ "
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.state : stack1), depth0))
          + "+"
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.zip : stack1), depth0))
          + "\" class=\"directions\">GET DIRECTIONS</a>";
      }, "useData": true
    });
    templates['infowindow'] = template({
      "1": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = helpers.helperMissing, alias3 = "function", alias4 = container.escapeExpression;
  
        return "    <div class=\"number\">\n      <a class=\"marker-link\" id=\"marker-"
          + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "type", "hash": {}, "data": data }) : helper)))
          + "-"
          + alias4(((helper = (helper = helpers.iconIndex || (depth0 != null ? depth0.iconIndex : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "iconIndex", "hash": {}, "data": data }) : helper)))
          + "\"><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"15px\" y=\"20px\" width=\"28px\" height=\"38px\" viewBox=\"50 25 0.1 38\" enable-background=\"new 50.606 45 26.789 38\" xml:space=\"preserve\"><path fill=\"#6286B0\" stroke=\"#555555\" stroke-miterlimit=\"10\" d=\"M47.169,26.969c-6.4,1.666-10.844,8.774-9.295,14.899c1.158,4.605,11.149,21.618,12.712,21.632 c1.245,0.016,9.644-13.247,12.003-18.967C66.789,34.368,57.841,24.175,47.169,26.969z\"/><text transform=\"translate(50 45)\" fill=\"#ffffff\" style=\"font-family: Arial, sans-serif;font-weight:bold;text-align:center;\" font-size=\"12\" text-anchor=\"middle\">"
          + alias4(((helper = (helper = helpers.iconIndex || (depth0 != null ? depth0.iconIndex : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "iconIndex", "hash": {}, "data": data }) : helper)))
          + "</text></svg></a>\n"
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.distance : depth0), { "name": "if", "hash": {}, "fn": container.program(2, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "    </div>\n";
      }, "2": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = container.escapeExpression;
  
        return "        <span class=\"clinic-distance\">"
          + alias1(((helper = (helper = helpers.distance || (depth0 != null ? depth0.distance : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "distance", "hash": {}, "data": data }) : helper)))
          + " <br />"
          + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.distanceType : stack1), depth0))
          + "</span>\n";
      }, "4": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = container.escapeExpression;
  
        return "      <div class=\"clinic-distance\">"
          + alias1(((helper = (helper = helpers.distance || (depth0 != null ? depth0.distance : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "distance", "hash": {}, "data": data }) : helper)))
          + " "
          + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.distanceType : stack1), depth0))
          + "</div>\n";
      }, "6": function (container, depth0, helpers, partials, data) {
        var helper;
  
        return "      <h4 class=\"row physician-name\">"
          + container.escapeExpression(((helper = (helper = helpers.physicianName || (depth0 != null ? depth0.physicianName : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "physicianName", "hash": {}, "data": data }) : helper)))
          + "</h4>\n";
      }, "8": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"clinic-name\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.name : stack1), depth0))
          + "</div>\n";
      }, "10": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"row cemail\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.cemail : stack1), depth0))
          + "</div>\n";
      }, "12": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"row address-one\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address1 : stack1), depth0))
          + "</div>\n";
      }, "14": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"row address-two\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address2 : stack1), depth0))
          + "</div>\n";
      }, "16": function (container, depth0, helpers, partials, data) {
        var helper;
  
        return "      <div class=\"row city\">"
          + container.escapeExpression(((helper = (helper = helpers.cityStateZip || (depth0 != null ? depth0.cityStateZip : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "cityStateZip", "hash": {}, "data": data }) : helper)))
          + "</div>\n";
      }, "18": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "      <div class=\"row phone\"><a href=\"tel:" + depth0.clinicData.phone + "\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.phone : stack1), depth0))
          + "</a></div>\n";
      }, "19": function (container, depth0, helpers, partials, data) {
        var stack1;
        if (depth0.clinicData.email != "") {
          return "<div class=\"row email\"><a class=\"make-appointment\" data-id=\"" + depth0.clinicData.email + "\"> Request Appointment</a></div>\n";
        }
        else {
          return "";
        }
  
      }, "20": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = helpers.helperMissing, alias3 = "function", alias4 = container.escapeExpression, alias5 = container.lambda;
  
        return "      <div class=\"row products\">"
          + alias4(((helper = (helper = helpers.numProducts || (depth0 != null ? depth0.numProducts : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "numProducts", "hash": {}, "data": data }) : helper)))
          + " of Your Selected Products Found</div>\n      <div class=\"links clearfix\">\n        <a class=\"detailslink _left\" id=\"detail-"
          + alias4(((helper = (helper = helpers.iconIndex || (depth0 != null ? depth0.iconIndex : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "iconIndex", "hash": {}, "data": data }) : helper)))
          + "\">Products & Specialty</a>\n  " +
          "<a class=\"directions _right\" target=\"_blank\" href=\"https://maps.google.com?daddr="
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address1 : stack1), depth0))
          + "+"
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.city : stack1), depth0))
          + "+ "
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.state : stack1), depth0))
          + "+"
          + alias4(alias5(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.zip : stack1), depth0))
          + "\">Get Directions</a>\n      </div>\n";
      }, "22": function (container, depth0, helpers, partials, data) {
        var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = container.lambda, alias3 = container.escapeExpression;
  
        return "<div class=\"row links\">\n"
          + "<a class=\"directions\" target=\"_blank\" href=\"https://maps.google.com?daddr="
          + alias3(alias2(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address1 : stack1), depth0))
          + "+"
          + alias3(alias2(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.city : stack1), depth0))
          + "+ "
          + alias3(alias2(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.state : stack1), depth0))
          + "+"
          + alias3(alias2(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.zip : stack1), depth0))
          + "\">Get Directions â€º</a>\n"
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.website : stack1), { "name": "if", "hash": {}, "fn": container.program(25, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "      </div>\n";
      }, "23": function (container, depth0, helpers, partials, data) {
        var stack1;
  
        return "        <div class=\"row specialist\">"
          + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.specialty : stack1), depth0))
          + "</div>\n";
      }, "25": function (container, depth0, helpers, partials, data) {
        var stack1;
        if (isURL(depth0.clinicData.website)) {
          return "         <a class=\"directions\" target=\"_blank\" href=\""
            + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.website : stack1), depth0))
            + "\">Visit Website â€º</a>\n";
        } else { return ""; }
      }, "27": function (container, depth0, helpers, partials, data) {
        return "<hr />\n";
      }, "28": function (container, depth0, helpers, partials, data) {
        var stack1;
        if (depth0.clinicData.rep_email != "") {
          return "<div class=\"row sales-email hide\">"+depth0.clinicData.rep_email+"</div>\n";
        }
        else {
          return "";
        }
  
      }, "compiler": [7, ">= 4.0.0"], "main": function (container, depth0, helpers, partials, data) {
        var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = helpers.helperMissing, alias3 = "function", alias4 = container.escapeExpression;
        
        //depth0.physicianName = ( depth0.physicianName == null || depth0.physicianName == "No Physician")? "Obagi Skin Care Professional":  depth0.physicianName ;
 
        return "<div class=\"bodycopy marker-infowindow\" id=\"info-"
          + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "type", "hash": {}, "data": data }) : helper)))
          + "-"
          + alias4(((helper = (helper = helpers.iconIndex || (depth0 != null ? depth0.iconIndex : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "iconIndex", "hash": {}, "data": data }) : helper)))
          + "\">\n\n"
          + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1, (depth0 != null ? depth0.type : depth0), "===", "list", { "name": "ifCond", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "  <div class=\"info info-"
          + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "type", "hash": {}, "data": data }) : helper)))
          + "\">\n"
          + "<div class=\"left-column\">"
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.distance : depth0), { "name": "if", "hash": {}, "fn": container.program(4, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.name : stack1), { "name": "if", "hash": {}, "fn": container.program(8, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.physicianName : depth0), { "name": "if", "hash": {}, "fn": container.program(6, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.cemail : stack1), { "name": "if", "hash": {}, "fn": container.program(10, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address1 : stack1), { "name": "if", "hash": {}, "fn": container.program(12, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.address2 : stack1), { "name": "if", "hash": {}, "fn": container.program(14, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.cityStateZip : depth0), { "name": "if", "hash": {}, "fn": container.program(16, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.phone : stack1), { "name": "if", "hash": {}, "fn": container.program(18, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.specialty : stack1), { "name": "if", "hash": {}, "fn": container.program(23, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.rep_email : stack1), { "name": "if", "hash": {}, "fn": container.program(28, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + "</div><div class=\"right-column\">"
          + ((stack1 = helpers["if"].call(alias1, ((stack1 = (depth0 != null ? depth0.clinicData : depth0)) != null ? stack1.numProducts : stack1), { "name": "if", "hash": {}, "fn": container.program(19, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
          + ((stack1 = helpers["if"].call(alias1, (depth0 != null ? depth0.productNames : depth0), { "name": "if", "hash": {}, "fn": container.program(20, data, 0), "inverse": container.program(22, data, 0), "data": data })) != null ? stack1 : "")
          + "</div>"
          + "  </div>\n</div>\n"
          + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1, (depth0 != null ? depth0.type : depth0), "===", "list", { "name": "ifCond", "hash": {}, "fn": container.program(27, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "");
      }, "useData": true
    });
  })();
  
  
  
  function isURL(str) {
    if (str.indexOf("http://") == 0 || str.indexOf("https://") == 0) {
      return true;
    }
    else {
      return false;
    }
  }
  
  