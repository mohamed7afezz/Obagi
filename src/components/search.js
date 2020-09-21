import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import searchStyles from '../assets/scss/components/search.module.scss'

const Search = () => {

    return (
        <div>
            <div className={searchStyles.result}>
            <div className={searchStyles.typeSection}>
                    <div className={searchStyles.typeColor}></div>
                    <div className={[searchStyles.typeText, "d-none d-lg-block"].join(" ")}>Medical</div>
                </div>
                <Link className={searchStyles.searchlinks} to="#">Obagi-C Cleansing Gel</Link>
               
            </div>
            <div className={searchStyles.result}>
            <div className={searchStyles.typeSection}>
                    <div className={searchStyles.typeColorclinical}></div>
                    <div className={[searchStyles.typeText, "d-none d-lg-block"].join(" ")}>Clinical</div>
                </div>
                <Link className={searchStyles.searchlinks} to="#">Obagi-C Cleansing Gel</Link>
       
            </div>
        </div>
    )
}

export default Search