import React from 'react'
import beforeafter from '../assets/scss/components/before-after.module.scss'
import afterimg from "../assets/images/product-images/before-after.png"
const Beforeafter = ({ node }) => {
   

    return (
        <div className={["container-fluid", beforeafter.beforeaftercontainer].join(" ")}>
            <div className={"row"}>
                <div className={["col-12", "col-lg-5", "offset-lg-1", beforeafter.beforeafterimages].join(" ")}>
                <h1 className={beforeafter.beforeafterheadmob}>Before, Meet After</h1>
                <img src= {afterimg}/>
            
                </div>
                <div className={["col-12", "col-lg-4", "offset-lg-1", beforeafter.beforeaftercontent].join(" ")}>
                    <h1 className={beforeafter.beforeafterhead}>Before, Meet After</h1>
                    <p className={beforeafter.beforeaftersubtitle}>In a 4-week double-blind consumer study of 104 women ages 18 to 61:</p>
                    <div id="accordion">
                        <div className={["row", beforeafter.tabs].join(" ")}>
                            <div className={[beforeafter.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                <div className={[beforeafter.cardhead, "card-header"].join(" ")} id="headingOne">
                                    <h5 class="mb-16">
                                        <button className={[beforeafter.btnLink1, "btn-link", "btn "].join(" ")}  data-target="#ExampleOne" aria-expanded="true" aria-controls="ExampleOne">
                                            Example 1
        </button>
                                    </h5>
                                </div>

                            </div>
                     </div>
                        <div id="ExampleOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                               
                                <p className={beforeafter.tabTitle}>In A Clinical Study:</p>
                                <div className={["row", beforeafter.boxes].join(" ")}>
                                    <div className={[beforeafter.box,"col-5"].join(" ")}>
                                        <h1>87%</h1>
                                        <p>found overall skin appearance is improved</p>
                                    </div>
                                    <div className={[beforeafter.box,"col-5","offset-1"].join(" ")}>
                                    <h1>82%</h1>
                                    <p>found eyes are more youthful-looking</p>
                                    </div>
                                    <div className={[beforeafter.box,"col-5"].join(" ")}>
                                    <h1>82%</h1>
                                    <p> found eye area skin appears brighter/more radiant</p>
                                    </div>
                                    <div className={[beforeafter.box,"col-5","offset-1"].join(" ")}>
                                    <h1>79%</h1>
                                    <p> found eye area was brighter</p>
                                    </div>
                                    <div className={[beforeafter.box,"col-5"].join(" ")}>
                                    <h1>78%</h1>
                                    <p> found energized the appearance of tired eyes</p>
                                    </div>
                                    <div className={[beforeafter.box,"col-5","offset-1"].join(" ")}>
                                    <h1>77%</h1>
                                    <p> found skin felt firmer</p>
                                    </div>
                                </div>
                           </div>
                        </div>

              </div>

                </div>
            </div>
        </div>

    )
}
export default Beforeafter