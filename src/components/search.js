import React, { useContext, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import searchStyles from "../assets/scss/components/search.module.scss"
import SearchContext from "../providers/search-provider"
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
const Search = () => {

  const { clinicalSearchResults, isLoading } = useContext(SearchContext)
  const { medicalSearchResults } = useContext(SearchContext)
  
  if (clinicalSearchResults.data) {
 
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
            ? (isLoading?    <div>
              <ClipLoader
          css={spinner}
           size={150}
           color={"#123abc"}
/>           
</div>   
            : 
            (medicalSearchResults.map((data, index) =>
                index < 6 ? (
                  <Link
                    className={searchStyles.searchlinks}
                    to={data.path.alias}
                  >
                    <span dangerouslySetInnerHTML={{__html: data.title}}></span>
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
            ? (isLoading?    <div>
              <ClipLoader
          css={spinner}
           size={150}
           color={"#123abc"}
/>           
</div>   
                :
                (clinicalSearchResults.map((data, index) =>
                index < 6 ? (
                  <Link
                    className={searchStyles.searchlinks}
                    to={data.path.alias}
                  >
                    <span dangerouslySetInnerHTML={{__html: data.title}}></span>
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
