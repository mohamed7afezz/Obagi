import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import searchStyles from '../assets/scss/components/search.module.scss'

const Search = () => {

    return (
        <div>
            <div className={searchStyles.result}>
                <Link to="#">Obagi-C Cleansing Gel</Link>
                <div className={searchStyles.typeColor}></div>
            </div>
            <div className={searchStyles.result}>
                <Link to="#">Obagi-C Cleansing Gel</Link>
                <div className={searchStyles.typeColor}></div>
            </div>
        </div>
    )
}

export default Search