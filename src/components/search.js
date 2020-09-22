import React , {useContext} from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import searchStyles from '../assets/scss/components/search.module.scss'
import SearchContext from '../providers/search-provider'

const Search = () => {
    const {search} = useContext(SearchContext);
    console.log("hassan",search.clinicalSearchResults)
    return (
        <div>
            <div className={searchStyles.result}>
            <div className={searchStyles.typeSection}>
                    <div className={searchStyles.typeColor}></div>
                    <div className={[searchStyles.typeText, "d-none d-lg-block"].join(" ")}>Medical</div>
                </div>
                <Link className={searchStyles.searchlinks} to="#">{search.clinicalSearchResults}</Link>
               
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