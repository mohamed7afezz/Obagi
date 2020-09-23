import React , {useContext} from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import searchStyles from '../assets/scss/components/search.module.scss'
import SearchContext from '../providers/search-provider'

const Search = () => {
const {clinicalSearchResults} = useContext(SearchContext);
const {medicalSearchResults} = useContext(SearchContext);

    return (
        <div>
            <div className={searchStyles.result}>
            <div className={searchStyles.typeSection}>
                    <div className={searchStyles.typeColor}></div>
                    <div className={[searchStyles.typeText, "d-none d-lg-block"].join(" ")}>Medical</div>
                </div>
                {medicalSearchResults.data?
                medicalSearchResults.data.length > 0?
                medicalSearchResults.data.map( (data , index)=>(
                    index < 4?
                <Link className={searchStyles.searchlinks} to={data.attributes.path.alias}>{data.attributes.title}</Link>
                    :""
                )) : "No results found" :""}

            </div>
            <div className={searchStyles.result}>
            <div className={searchStyles.typeSection}>
                    <div className={searchStyles.typeColorclinical}></div>
                    <div className={[searchStyles.typeText, "d-none d-lg-block"].join(" ")}>Clinical</div>
                </div>
                {clinicalSearchResults.data?clinicalSearchResults.data.length > 0?
                clinicalSearchResults.data.map( (data , index)=>(
                    index < 4 ?
                <Link className={searchStyles.searchlinks} to={data.attributes.path.alias}>{data.attributes.title}</Link>
                :""
                )) : "No results found" :""}
       
            </div>
        </div>
    )
}

export default Search