(function (url) {
  if (!window.DataLayer) {
    window.DataLayer = {};
  }
  if (!DataLayer.events) {
    DataLayer.events = {};
  }
  DataLayer.events.SPIVersion = DataLayer.events.SPIVersion || "3.4.1";
  DataLayer.events.SiteSection = "1";

  var loc, ct = document.createElement("script");
  ct.type = "text/javascript";
  ct.async = true; ct.src = url; loc = document.getElementsByTagName('script')[0];
  loc.parentNode.insertBefore(ct, loc);
})(document.location.protocol + "//tag.rmp.rakuten.com/122741.ct.js")