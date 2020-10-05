import React, { useContext, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import searchStyles from "../assets/scss/components/search.module.scss"
import SearchContext from "../providers/search-provider"

const Search = () => {

  const { clinicalSearchResults, isLoading } = useContext(SearchContext)
  const { medicalSearchResults } = useContext(SearchContext)
  console.log("hafezzz",clinicalSearchResults)
  console.log("hafezzz",isLoading)
  if (clinicalSearchResults.data) {
    // console.log("med", clinicalSearchResults.data.length)
  }
  return (
    <div>
      <div className={searchStyles.result}>
        <div className={searchStyles.typeSection}>
          <div className={searchStyles.typeColor}></div>
          <div
            className={[searchStyles.typeText, "d-none d-lg-block"].join(" ")}
          >
            Medical
          </div>
        </div>
        {(medicalSearchResults.length > 0
            ? (isLoading? "Loading..."
            : 
            (medicalSearchResults.map((data, index) =>
                index < 6 ? (
                  <Link
                    className={searchStyles.searchlinks}
                    to={data.path.alias}
                  >
                    {data.title}
                  </Link>
                ) : (
                  ""
                )
              )))
            : "No results found")
          }
      </div>
      <div className={searchStyles.result}>
        <div className={searchStyles.typeSection}>
          <div className={searchStyles.typeColorclinical}></div>
          <div
            className={[searchStyles.typeText, "d-none d-lg-block"].join(" ")}
          >
            Clinical
          </div>
        </div>
        { clinicalSearchResults.length > 0
            ? (isLoading? "Loading..."
                :
                (clinicalSearchResults.map((data, index) =>
                index < 6 ? (
                  <Link
                    className={searchStyles.searchlinks}
                    to={data.path.alias}
                  >
                    {data.title}
                  </Link>
                ) : (
                  ""
                )
              )))
            : "No results found"
          }
      </div>
    </div>
  )
}

export default Search
