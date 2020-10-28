import React from "react"
import PropTypes from "prop-types"

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
        <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"  type="text/javascript" charSet="UTF-8" data-domain-script="359f2fcf-2d57-4b0d-89ac-8c5045c52021-test" ></script>
        <script type="text/javascript">function OptanonWrapper() { }</script>      
         {/* <!--//OneTrust Cookies Consent Notice end for www.obagi.com ---> */}
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
