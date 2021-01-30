import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import NudermSignUp from '../components/nuderm/Start'
const NudermSp = () => (
  <Layout>
    <SEO title="New to Nu-Derm® Program Signup | Obagi" ogTitle="New to Nu-Derm® Program Signup | Obagi" description="Are you new to the Nu-Derm System and excited to start your transformation? Join the New to Nu-Derm Program to receive timely information, inspiration, and encouragement every step of the way to help maximize results." ogDescription="Are you new to the Nu-Derm System and excited to start your transformation? Join the New to Nu-Derm Program to receive timely information, inspiration, and encouragement every step of the way to help maximize results." canonical="/nuderm" />
    <NudermSignUp />
  </Layout>
)

export default NudermSp
