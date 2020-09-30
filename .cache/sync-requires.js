const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\404.js"))),
  "component---src-pages-cart-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\cart.js"))),
  "component---src-pages-finder-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\finder.js"))),
  "component---src-pages-forgot-password-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\forgot-password.js"))),
  "component---src-pages-main-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\main.js"))),
  "component---src-pages-my-account-index-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\my-account\\index.js"))),
  "component---src-pages-page-2-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\page-2.js"))),
  "component---src-pages-phy-finder-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\phy-finder.js"))),
  "component---src-pages-physician-finder-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\Physician-finder.js"))),
  "component---src-pages-products-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\products.js"))),
  "component---src-pages-registration-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\registration.js"))),
  "component---src-pages-search-page-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\search-page.js"))),
  "component---src-pages-using-typescript-tsx": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\pages\\using-typescript.tsx"))),
  "component---src-templates-basic-page-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\templates\\basic-page.js"))),
  "component---src-templates-product-collection-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\templates\\product-collection.js"))),
  "component---src-templates-product-page-js": hot(preferDefault(require("C:\\Users\\dev-team\\Desktop\\Obagi\\src\\templates\\product-page.js")))
}

