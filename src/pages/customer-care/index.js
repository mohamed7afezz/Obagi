import React from "react"

import Layout from "../../components/layout"
import Customer from "../../components/customer-care"
import SEO from '../../components/seo';
import { graphql } from 'gatsby';

const CustomerCare = ({ data }) => (
  <Layout>
      <SEO title="Customer Care" description="Customer Care Page Description"/>

      <Customer />
  </Layout>
)

export default CustomerCare
