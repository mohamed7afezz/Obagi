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
        icon: `src/assets/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://dev-obagi.azurewebsites.net/api/`,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
      },
    },
    {
      resolve: 'gatsby-source-vimeo-all',
      options: {
        clientId: '4eb6528a5dde1764deb894303930b052e9b9c07a',
        clientSecret: 'WaTuEEjMhXW7UZZG+vhAu8Q9swmHI0cRKV3JybDr9bbK+CZTzclWtTfNd6QB+RVwkcRtl9BPLIC7DUdgG2KJFuuyeUnTC5SBFjNqMPYAaeVXmyVod32RRuXqjFlPrqM5',
        accessToken: 'da9b94dc1f02816a55e2e62f28fe8e3f'
      }
    },

    'gatsby-plugin-sass',
    `gatsby-plugin-fontawesome-css`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
