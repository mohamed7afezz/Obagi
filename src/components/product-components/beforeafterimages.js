
import React , {useEffect} from 'react'
import {beforeAfter} from '../../assets/js/before-after'
import '../../assets/css/before-after.css'
import Img from 'gatsby-image';
const Beforeafterimages = ({ node, beforeimage, afterimage}) => {
    
    useEffect(() => {
        beforeAfter('.ba-slider');
    })
    return (
        <div class="ba-slider" style={{width: '100%'}}>
            <img alt="img" src={beforeimage} />
            <div class="resize">
                <img alt="img" src={afterimage} />
            </div>
            <span class="handle"></span>
        </div>
    )
}
export default Beforeafterimages