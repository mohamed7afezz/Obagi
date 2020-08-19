import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import searchStyles from '../assets/scss/components/search.module.scss'

const Search = () => {


    const data = useStaticQuery(graphql`
        
        query {
            search: file(relativePath: { eq: "search.png" }) {
                childImageSharp {
                  fixed {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
        }
    `)

    return (
        <div className={searchStyles.wrapper}>
            <div className="container-fluid">
                <div className="row">
                    <div className={searchStyles.topSearch}>
                        <div className="col-12">
                            <div className={searchStyles.searchIcon}><Img fixed={data.search.childImageSharp.fix} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search