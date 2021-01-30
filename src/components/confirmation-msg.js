import React, { useContext, useState, useEffect } from "react"
import { StaticQuery, useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import aboveHeader from '../assets/scss/components/above-header.module.scss'
import { isLoggedIn } from '../services/auth'
import UserContext from '../providers/user-provider'
import $ from 'jquery'

const ConfirmationMsg = ({ node }) => {


    const data = useStaticQuery(graphql`
      query {
        allBlockContentBasic(filter: {id: {eq: "70d60411-1915-5b15-99b9-90d92e7d919d"}}) {
            edges {
              node {
                body {
                  processed
                }
                id
              }
            }
          }
      }
    `)



    return (
        <div class="modal hidden" id="formsubmition">
            <div class="container">
                <div class="modal-body">
                    {data.allBlockContentBasic.edges[0].node.body? <div dangerouslySetInnerHTML={{__html: data.allBlockContentBasic.edges[0].node.body.processed}}></div> : ""}
                </div>
            </div>
        </div>
    )
}

export default ConfirmationMsg