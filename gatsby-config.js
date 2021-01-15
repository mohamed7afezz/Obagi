require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://www.obagi.com`,
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
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
        RewriteBase: '/custom/',
        https: true,
        www: true,
        SymLinksIfOwnerMatch: true,
        host: process.env.Drupal_URL, // if 'www' is set to 'false', be sure to also remove it here!
        ErrorDocument: `
          ErrorDocument 401 /error_pages/401.html
          ErrorDocument 404 /error_pages/404.html
          ErrorDocument 500 /error_pages/500.html
        `,
        redirect: [
          'RewriteRule ^not-existing-url/?$ /existing-url [R=301,L,NE]',
          {
            from: '/test',
            to: '/medical',
          },
          {
            from: `${process.env.Drupal_URL}/test1`,
            to: '/medical',
          },
        ],
      
      },
    },

    `gatsby-plugin-meta-redirect`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.obagi.com',
        sitemap: 'https://www.obagi.com/sitemap.xml',
        policy: [{ userAgent: '*', disallow:'' }],
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
          `/clinical/skin-concern/*`,
          `/clinical/categories/*`,
          `/clinical-categories/hydrator`,
          `/medical/categories/limited-edition-kits`,
          `/medical/skin-care-lines/obagi-medical`,
          `/medical/skin-care-lines/obagi-medical-rx`,
          `/clinical/skin-type/*`,
          `/medical/ingredients/*`,
          `/Physician-finder/`,
          `/cart/`,
          `/forgot-password/`,
          `/main/`,
          `/page-2/`,
          `/phy-finder/`,
          `/products/`,
          `/using-typescript/`
         
    ],
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
        baseUrl: process.env.Drupal_URL,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
        concurrentFileRequests: 1,
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
    // `gatsby-plugin-offline`,
  ],
}
