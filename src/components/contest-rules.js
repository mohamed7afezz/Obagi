import React from "react"
import Layout from "../components/layout"
import YourBag from "../components/Cart/your-bag"
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import Customer from "../components/customer-care";

const ContestRules = ({ node }) => (
  <>
      {/* <SEO title="Our COVID-19 Response | Obagi" description="In our 30+ years as Obagi, we have seen the world change many times and have evolved with the changes to support our physicians, communities, and employees. When COVID-19 began, we pivoted again to further assist our partners and consumers." canonical="/covid-19" /> */}
      <Customer activeTab="contest-rules">
<div class="container-fluid">


<div class="row">
<div class="col-12 col-md-8 " >
    <div dangerouslySetInnerHTML={{ __html: node.field_full_html_text.processed }}></div>

</div>
</div>
</div>
</Customer>
</>
)

export default ContestRules

export const fragment = graphql`
    fragment paragraphCustomerCareFullHtml on paragraph__customer_care_full_html {
        id
        field_full_html_text {
            processed
          }
    }`