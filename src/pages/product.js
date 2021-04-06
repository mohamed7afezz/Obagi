// /**
//  * Layout component that queries for data
//  * with Gatsby's useStaticQuery component
//  *
//  * See: https://www.gatsbyjs.org/docs/use-static-query/
//  */

// import React, { useEffect } from "react"

// import vitmaineStyle from "../assets/scss/components/vitamine-power.module.scss"
// import profcStyle from "../assets/scss/components/prof-serum.module.scss"

// import fimg from "../assets/images/vitaminf.png"
// import simg from "../assets/images/vitamins.png"
// import timg from "../assets/images/vitamint.png"
// import profc from "../assets/images/profc.png"
// import lastimg from "../assets/images/Obagi_VitaminC_Microdermabrasio.png"

// import { graphql } from 'gatsby';
// import Layout from "../components/layout"
// const $ = require("jquery");

// const Product = () => {







//     // Similar to componentDidMount and componentDidUpdate: 
//     return (

//         <Layout>
//             <div>
//                 <div className={vitmaineStyle.vitaminePower}>
//                     <div className={["container-fluid "].join(" ")}>
//                         <div className={["row "]}>
//                             <div className="col-12 ">
//                                 <div className={vitmaineStyle.titleCon}>
//                                     <p className={vitmaineStyle.title}>THE POWER OF&nbsp;</p><p className={vitmaineStyle.title}>VITAMIN C</p>
//                                 </div>
//                                 <h2 className={vitmaineStyle.header}>Let your skin drink it in</h2>
//                             </div>
//                             <div className={vitmaineStyle.vitaminContent}>
//                                 <div className={["col-12 offset-md-1 col-md-4", vitmaineStyle.leftCol].join(" ")}>
//                                     <h3 className={vitmaineStyle.coltitle}>
//                                         Professional-C® Collection
//                         </h3>
//                                     <p className={vitmaineStyle.colcontent}>
//                                         The Professional-C portfolio serves as your second line of defense from environmental assailants that sunscreens often miss. Daily use helps to fortify skin and safeguard a more youthful looking appearance. Formulated with L-Ascorbic Acid, the most powerful form of Vitamin C to optimize efficacy and permeability.

//                         </p>
//                                 </div>
//                                 <div className="col-12 offset-md-1 col-md-5">
//                                     <div className={vitmaineStyle.titleCon}>
//                                         <p className={vitmaineStyle.rightColTitle}>
//                                             Professional-C&nbsp;
//                                     </p>
//                                         <p className={vitmaineStyle.rightColTitle}>
//                                             is ideal for:
//                                     </p>
//                                     </div>
//                                     <div className={vitmaineStyle.threeimages}>
//                                         <div className={vitmaineStyle.boxcon}>
//                                             <img src={fimg} />
//                                             <p className={vitmaineStyle.text}>Daily antioxidant defense</p>
//                                         </div>
//                                         <div className={vitmaineStyle.boxcon}>
//                                             <img src={simg} />
//                                             <p className={vitmaineStyle.text}>Fine lines and wrinkles</p>
//                                         </div>
//                                         <div className={vitmaineStyle.boxcon}>
//                                             <img src={timg} />
//                                             <p className={vitmaineStyle.text}>Dull, uneven skin tone
// and texture</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={profcStyle.ProfessionalSerums}>
//                     <div className={["container-fluid "].join(" ")}>
//                         <div className={["row "]}>
//                             <div className="col-12 offset-md-1 col-md-11">
//                                 <h3 className={profcStyle.title}>
//                                     Professional-C® Serums
//                                 </h3>
//                             </div>
//                             <div className="col-12 col-md-6 offset-md-1">
//                                 <img className={"img-fluid"} src={profc} />
//                             </div>
//                             <div className="col-12 col-md-4 offset-md-1">
//                                 <p className={profcStyle.sectionDesc}>
//                                     The Obagi Professional-C Serums offer Vitamin C in a rich, concentrated formula. They are formulated with 10%, 15%, and 20% L-ascorbic acid — a potent form of Vitamin C to help strengthen antioxidant defenses, fight oxidative stressors, and help skin appear younger.
//                               </p>
//                                 <p className={profcStyle.secSectionTitle}>
//                                     VARIETY OF CONCENTRATIONS
//                               </p>
//                                 <p className={profcStyle.secSectionDesc}>
//                                     VARIETY OF CONCENTRATIONS
//                               </p>
//                                 <p className={profcStyle.subtitle}>Professional-C Serum 10%</p>
//                                 <p className={profcStyle.subdesc}>Concentrated formula recommended for dry or sensitive skin.</p>
//                                 <p className={profcStyle.subtitle}>Professional-C Serum 15% </p>
//                                 <p className={profcStyle.subdesc}>High-performance serum developed for most skin types. </p>
//                                 <p className={profcStyle.subtitle}>Professional-C Serum 20%</p>
//                                 <p className={profcStyle.subdesc}>Highest concentrated serum best suited for normal to oily skin.</p>
//                             </div>


//                             <h3 className={[profcStyle.title, profcStyle.givemargin, "offset-md-1 col-md-8"].join(" ")}>
//                                 Professional-C® Microdermabrasion Polish + Mask
//                                     </h3>
//                             <div className={["col-md-4 offset-md-1", profcStyle.leftsec].join(" ")}>
//                                 <p className={profcStyle.seccoltitle}>C for yourself</p>
//                                 <p className={profcStyle.customp}>After just one application, testing showed
//                                 that the Professional-C Polish + Mask
//                                 reduces signs of aging, such as dull
//                                 complexion, fine lines, and wrinkles.
//                                 </p>

//                                 <div className={profcStyle.percentage}>
//                                 <p className={profcStyle.leftsecsubtitle}>After just one application*</p>
//                                 <div className={profcStyle.percentagecon}>
//                                     <p className={profcStyle.per}>88%</p>
//                                     <p className={profcStyle.perdesc}>of participants experienced a more luminous glow.</p>
                                    
//                                 </div>
//                             </div>
//                             </div>
//                             <div className={["col-md-5 ", profcStyle.rightsec].join(" ")}>
//                                 <img className="img-fluid" src={lastimg} />
//                             </div>

//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </Layout>

//     )
// }



// export default Product
