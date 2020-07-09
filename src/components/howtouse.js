import React from 'react'

import howto from '../assets/scss/components/howtouse.module.scss'
import pluswhite from '../assets/images/product-images/plus-white.svg'
import ingredientimg from '../assets/images/product-images/ingredient.png'
const Howtouse = ({ node }) => {
    return (
        <div className={["container-fluid", howto.howtousecon].join(" ")} >
            <div className={["row", howto.ordering].join(" ")}>
                <div className={["col-12", "col-lg-10", "offset-lg-1", howto.allcon].join(" ")}>
                    <div className={["col-12", "col-lg-3", "offset-lg-1", howto.howLeftcol].join(" ")}>
                        <h1 className={howto.howtousehead}>How to Use</h1>
                        <a className={howto.expand} data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"> Step 1</a>
                        <a className={howto.expand} data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2"> Step 2</a>
                        <a className={howto.expand} data-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"> Step 3</a>
                        <a className={howto.expand} data-toggle="collapse" href="#multiCollapseExample4" role="button" aria-expanded="false" aria-controls="multiCollapseExample4"> Step 4</a>
                        <a className={howto.expand} data-toggle="collapse" href="#multiCollapseExample5" role="button" aria-expanded="false" aria-controls="multiCollapseExample5"> Step 5</a>
                        <a className={howto.expand} data-toggle="collapse" href="#multiCollapseExample6" role="button" aria-expanded="false" aria-controls="multiCollapseExample6"> Step 6</a>

                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <p className={howto.safe}>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                        </div>
                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                            <p className={howto.safe}>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                        </div>
                        <div class="collapse multi-collapse" id="multiCollapseExample3">
                            <p className={howto.safe}>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                        </div>
                        <div class="collapse multi-collapse" id="multiCollapseExample4">
                            <p className={howto.safe}>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                        </div>
                        <div class="collapse multi-collapse" id="multiCollapseExample5">
                            <p className={howto.safe}>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                        </div>
                        <div class="collapse multi-collapse" id="multiCollapseExample6">
                            <p className={howto.safe}>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                        </div>
                        <p className={[howto.howtousettitle, howto.ftitle].join(" ")}>Ingredient Name</p>
                    </div>
                    <div className={["col-12", "col-lg-6", "offset-lg-2", howto.howLeftcol].join(" ")}>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Howtouse