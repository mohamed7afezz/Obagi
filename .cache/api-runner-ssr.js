var plugins = [{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/assets/images/gatsby-icon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"edf3d310d67f8284a562bc3a58c3e761"},
    },{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/node_modules/gatsby-plugin-load-script/gatsby-ssr'),
      options: {"plugins":[],"src":"https://www.googleadservices.com/pagead/conversion.js"},
    },{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/node_modules/gatsby-plugin-load-script/gatsby-ssr'),
      options: {"plugins":[],"src":"https://apps.bazaarvoice.com/deployments/obagi/main_site/staging/en_US/bv.js"},
    },{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/node_modules/gatsby-plugin-load-script/gatsby-ssr'),
      options: {"plugins":[],"src":"https://obagi.extole.io/core.js"},
    },{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/node_modules/gatsby-plugin-google-tagmanager/gatsby-ssr'),
      options: {"plugins":[],"id":"GTM-58FFST8","includeInDevelopment":false,"defaultDataLayer":{"type":"object","value":{"platform":"gatsby"}}},
    },{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/node_modules/gatsby-plugin-fontawesome-css/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/dev-team/Desktop/Obagi/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
