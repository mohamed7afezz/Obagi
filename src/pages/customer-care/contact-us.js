import React from "react"

import Layout from "../../components/layout"
import Contact from "../../components/contact-us"
import SEO from '../../components/seo';
import { graphql } from 'gatsby';

const ContactUs = ({ data }) => (
  <Layout>
      <SEO title="Contact Us" description="Contact Us Page Description"/>

      <Contact />
  </Layout>
)

export default ContactUs
