
import React , {useEffect} from 'react'
import {beforeAfter} from '../assets/js/before-after'
import '../assets/css/before-after.css'

const Beforeafterimages = ({ node , beforeimage, afterimage}) => {

    useEffect(() => {
        beforeAfter('.ba-slider');
    })
    return (
<div class="ba-slider">
<img alt="img" src={beforeimage} />
<div class="resize">
    <img alt="img" src={afterimage} />
</div>
<span class="handle"></span>
</div>
    )
}
export default Beforeafterimages