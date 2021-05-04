import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet";
const Cookielaw = process.env.Cookielaw_domain;

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWMDERmCDcoEBOALnRcwjdf02Cfsk1r7Q&libraries=places"></script>


        {/* <script src="https://dev-obagi.azurewebsites.net/api/core/assets/vendor/jquery/jquery.min.js?v=3.4.1"></script> */}
        {/* <script src="https://dev-obagi.azurewebsites.net/api/modules/custom/obagi_finder/js/jquery.validate.min.js"></script> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.0.0/polyfill.js"></script> */}
        {/* <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> */}
        {/* <script src="https://dev-obagi.azurewebsites.net/api/modules/custom/obagi_finder/js/masonry.pkgd.min.js"></script> */}
        {/* <script src="https://dev-obagi.azurewebsites.net/api/modules/custom/obagi_finder/js/templates/templates.js"></script> */}

        {/* <!-- //OneTrust Cookies Consent Notice end for www.obagi.com - --> */}
        <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript" charSet="UTF-8" data-domain-script={Cookielaw}></script>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
          function OptanonWrapper() { }
        `
        }}></script>


        {/* <!--//OneTrust Cookies Consent Notice end for www.obagi.com ---> */}
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
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
        `
        }}></script>

     {/*<script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '678059259599817');
          fbq('track', 'PageView');
        `
        }}></script>*/}
        
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
        <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=678059259599817&ev=PageView&noscript=1"
        />`}}></script>

        {props.headComponents}


      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.instagramFeed/1.3.2/jquery.instagramFeed.min.js" ></script> */}


       
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
