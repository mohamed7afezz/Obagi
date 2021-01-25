import React from "react"
import Layout from "../components/layout"
import YourBag from "../components/Cart/your-bag"
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import Customer from "../components/customer-care";

const Covid = ({ data }) => (
    <Layout> 
      <SEO title="Our COVID-19 Response | Obagi" description="In our 30+ years as Obagi, we have seen the world change many times and have evolved with the changes to support our physicians, communities, and employees. When COVID-19 began, we pivoted again to further assist our partners and consumers." />
      <Customer activeTab="covid-19">
<div class="container-fluid">


<div class="row">
<div class="col-12 col-md-8 " >
<p class="common-p"><img alt="Covid" class="img-responsive" data-entity-type="file" data-entity-uuid="72a2ce7d-0b20-4dd2-9915-70834fc1d578" src="/api/sites/default/files/inline-images/Covidlogo_0.jpg"/></p>

<h1 class="common-p">Our Covid-19 Response</h1>
In our 30+ years as Obagi we have seen the world change many times and have evolved with the changes to support our physicians, communities, and employees. When COVID-19 began, we pivoted again to further assist our partners and consumers.

<p>&nbsp;</p>

<h3 class="common-p">Strengthening Our Team</h3>

<p class="common-p">We are working hard to keep both our employees and customers safe. As a result, we have increased training to help address the specific needs our team and partners are facing.</p>
<img alt="Helping" class="img-responsive" data-entity-type="file" data-entity-uuid="699a3436-cd91-4972-9fd3-a3312e91468e" src="/api/sites/default/files/inline-images/Helping.png"/>
<h3 class="common-p">Helping Hands</h3>

<p class="common-p">To help those in need, we immediately shifted our manufacturing to supply and deliver crucial hand sanitizer across the United&nbsp;States.</p>
<img alt="Door" class="img-responsive" data-entity-type="file" data-entity-uuid="83bd5db0-e105-4e2c-8bdd-53bb650d7add" src="/api/sites/default/files/inline-images/ObagiDoor.png"/>
<h3 class="common-p">Obagi Doorstep Delivery<sup>™</sup> Program</h3>

<p class="common-p">You can now have Obagi products shipped to your home. This program was Created specifically to support our physicians' patients when offices had to close.</p>

<h3 class="common-p">Forever Evolving. Forever Obagi</h3>

<p class="common-p">We know rules and regulations will continue to evolve, and we will adapt quickly with them and will be here and ready to offer support. That’s Obagi.</p>
</div>
</div>
</div>
</Customer>
</Layout>
)

export default Covid