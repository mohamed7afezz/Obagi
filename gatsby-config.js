require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
        src: 'https://apps.bazaarvoice.com/deployments/obagi/main_site/staging/en_US/bv.js', // Change to the script filename
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://obagi.extole.io/core.js', // Change to the script filename
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
