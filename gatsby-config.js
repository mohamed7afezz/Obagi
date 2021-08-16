require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Obagi`,
    description: `Obagi`,
    author: `@Obagi`,
    siteUrl:  `https://www.obagi.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
      
        exclude: [
          `/test-page`,
          `/press-releases`,
          `/obagi-story`,
          `/community`,
          `/our-science`,
          `/our-products`,
          `/full-data-basic-page`,
          `/clinical/skin-concerns`,
          `/medical/product-lines`,
          `/medical/ingredients`,
          `/clinical/ingredients`,
          `/clinical/category`,
          `/customer-care`,
          `/medical/categories`,
          `/medical/skin-concern`,
          `/medical/skin-care-lines`,
          `/clinical/skin-concerns`,
          `/clinical/skin-concern/*`,
          `/clinical/categories/antioxidants`,
          `/clinical/categories/sunscreens`,
          `/clinical/categories/retinol`,
          `/clinical/categories/moisturizers`,
          `/clinical/categories/anti-aging`,
          `/clinical/categories/facial-cleansers`,
          `/clinical/categories/facial-exfoliators`,
          `/clinical/categories/eye-care`,
          `/clinical/categories/peels`,
          `/clinical-categories/hydrator`,
          `/clinical/ingredients/retinol`,
          `/clinical/ingredients/glycolic-acid`,
          `/clinical/ingredients/salicylic-acid`,
          `/clinical/ingredients/lactic-acid`,
          `/medical/ingredients/antioxidants`,
          `/medical/ingredients/hyaluronic-acid`,
          `/medical/ingredients/arbutin`,
          `/medical/categories/limited-edition-kits`,
          `/medical/skin-care-lines/obagi-medical`,
          `/medical/skin-care-lines/obagi-medical-rx`,
          `/clinical/skin-type/*`,
          `/Physician-finder/`,
          `/cart/`,
          `/forgot-password/`,
          `/main/`,
          `/page-2/`,
          `/phy-finder/`,
          `/products/`,
          `/using-typescript/`,
          `/my-account`,
          `/my-account/`,
          `/my-account/account-settings`,
          `/my-account/address-book`,
          `/my-account/orders`,
          `/my-account/premier-points`,
          `/my-account/signin`,
          `/blog`,
          `/blog-coming-soon`, 
          `/placeholder-test`,
          `/search-page/`,
          `/medical/categories/eye-care`,
          `/medical/skin-concern/acne`,
          `/medical/ingredients/tretinoin`,
          `/medical/ingredients/hydroquinone`,
          `/medical/skin-concern/redness-prone`,
          `/medical/skin-concern/elasticity-sagging-skin`,
          `/clinical/skin-care/brightening-skin-care`,
          `/clinical/skin-care/fine-lines-and-wrinkles-skin-care`,
          `/skin-simplified/skin-concern/clinical-blog`,
          `/behind-the-lines/professional-c/medical-blog`
    ],
        
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.obagi.com',
        sitemap: 'https://www.obagi.com/sitemap.xml',
        policy: [{ userAgent: '*', disallow:'' }],
       
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/Obagi_Favicon.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.sourceURL,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
        concurrentFileRequests: 10,
        basicAuth: {
					username: 'gatsby-user',
					password: 'ndVn8Xk7iahMny4'
				}
      },
    },
 {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://www.googleadservices.com/pagead/conversion.js', // Change to the script filename
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '//cdn.bc0a.com/autopilot/f00000000218233/autopilot_sdk.js', // Change to the script filename
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: process.env.Bazaarvoice_URL,
      },
    },
    
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: process.env.Extole_URL,
        },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://js.afterpay.com/afterpay-1.x.js'
      }
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-58FFST8",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        // Specify optional GTM environment details.
        //  gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        //  gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        //  dataLayerName: "YOUR_DATA_LAYER_NAME",
  
        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
       // routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
      },
    },

    'gatsby-plugin-sass',
    `gatsby-plugin-fontawesome-css`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-remove-serviceworker`,
  ],
}
