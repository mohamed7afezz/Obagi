import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import myAccountStyles from '../assets/scss/components/my-account.module.scss'
import Slider from "react-slick"
import Stars from './stars'
import OrderNoHistory from "./order-no-history"
import OrderHistoryRow from "./order-history-row"
import OrderHistory from "./order-history"
import OrderDetails from "./order-details"

const UserAccount = ({ node, children }) => {



    const [nav1, setNav1] = React.useState(null)
    const [nav2, setNav2] = React.useState(null)
    let slider1 = []
    let slider2 = []

    React.useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])


    const SliderSetting = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                    arrows: false,
                },
            },
        ],
        beforeChange: (current, next) => {
            // let progressbar = document.querySelectorAll('.account-tab-slider .slick-dots li');

            // progressbar.forEach((activeLi, index) => {

            //   if (index <= next) {
            //     activeLi.classList.add('slick-data-active')

            //   } else if (index > next) {
            //     progressbar[index].classList.remove('slick-data-active')

            //   }




            // })

            let tabsstate = document
                .querySelectorAll(".account-tab ");
            let i = current;
            tabsstate.forEach((activetab, index) => {

                if (index == next) {
                    activetab.classList.add('active')
                }
                else {
                    activetab.classList.remove('active')
                }

            })
        },
    }



    const TabSliderSetting = {
        infinite: false,
        speed: 500,
        slidesToShow: 3.5,
        arrows: false,
        dots: false,

        responsive: [
            {

                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.7,
                    dots: false,
                    arrows: false,
                },
            },
        ],

    }

    function slickGoToslide(e, int) {
        slider1.current.slickGoTo(int)

        addActiveClass(e)

        //   let progressbar = document.querySelectorAll('.account-tab-slider .slick-dots li');

        //   progressbar.forEach((activeLi, index) => {
        //     activeLi.classList.remove("slick-data-active")
        //   })

        //   progressbar.forEach((activeLi, index) => {

        //     if (index <= int) {
        //       activeLi.classList.add('slick-data-active')
        //     }

        //   })
    }
    function slickGoToslide(e, int) {
        slider1.slickGoTo(int)

        addActiveClass(e)

        //   let progressbar = document.querySelectorAll('.account-tab-slider .slick-dots li');

        //   progressbar.forEach((activeLi, index) => {
        //     activeLi.classList.remove("slick-data-active")
        //   })

        //   progressbar.forEach((activeLi, index) => {

        //     if (index <= int) {
        //       activeLi.classList.add('slick-data-active')
        //     }

        //   })
    }
    // useEffect(() => {

    //   let progressbarContainer = document.querySelector('.account-tab-slider .slick-dots');
    //   progressbarContainer.innerHTML = "";
    //   document
    //     .querySelectorAll(".account-tab ")
    //     .forEach((Elem) => {
    //       progressbarContainer.innerHTML += '<li></li>';
    //     })
    //   document.querySelector('.account-tab-slider .slick-dots li:first-child').classList.add('slick-data-active')
    // }, [])



    function addActiveClass(e) {

        document
            .querySelectorAll(".account-tab ")
            .forEach((Elem) => {
                Elem.classList.remove("active")
            })

        let active = e.target
        active.classList.add("active")
    }




    const data = useStaticQuery(graphql`
    query {
      skinanalyzer: file(relativePath: { eq: "image.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    `)


    return (


        <div className="container-fluid my-account">
            <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1">
                    <div className={myAccountStyles.title}>My Account</div>
                </div>
            </div>
            <div className="row d-lg-none">
                <div className="col-12 p-0">
                    <div className={myAccountStyles.tabSliderWrapper}>
                        <Slider asNavFor={nav2} ref={slider => (slider1 = slider)} {...TabSliderSetting} className="account-tab-slider">
                            <div className="active account-tab" onClick={(e) => slickGoToslide(e)}>Order History</div>
                            <div className="account-tab" onClick={(e) => slickGoToslide(e)}>Address Book</div>
                            <div className="account-tab" onClick={(e) => slickGoToslide(e)}>Account Settings</div>
                            <div className="account-tab" onClick={(e) => slickGoToslide(e)}>Premier Points</div>
                        </Slider>
                    </div>
                </div>

                <div className="col-12">
                    <Slider {...SliderSetting} asNavFor={nav1} ref={slider => (slider2 = slider)}>
                        <div>
                            <OrderNoHistory />
                            {/* <OrderHistory /> */}
                            
                        </div>

                        <div>
                            <div className={myAccountStyles.topHalf}>
                                <div>Looks like you haven't placed and order.</div>
                                <div>Continue Shopping</div>
                            </div>

                            <div className={myAccountStyles.bottomHalf}>
                                <div>Try our Skinanalyzer</div>
                                <div>Find the best Obagi solution for you</div>
                                <div>TAKE THE QUIZ</div>
                            </div>
                        </div>

                        <div>
                            <div className={myAccountStyles.topHalf}>
                                <div>Looks like you haven't placed and order.</div>
                                <div>Continue Shopping</div>
                            </div>

                            <div className={myAccountStyles.bottomHalf}>
                                <div>Try our Skinanalyzer</div>
                                <div>Find the best Obagi solution for you</div>
                                <div>TAKE THE QUIZ</div>
                            </div>
                        </div>

                        <div>
                            <div className={myAccountStyles.topHalf}>
                                <div>Looks like you haven't placed and order.</div>
                                <div>Continue Shopping</div>
                            </div>

                            <div className={myAccountStyles.bottomHalf}>
                                <div>Try our Skinanalyzer</div>
                                <div>Find the best Obagi solution for you</div>
                                <div>TAKE THE QUIZ</div>
                            </div>
                        </div>

                    </Slider>
                </div>
            </div>

            <div className="d-none d-lg-block list-wrapper">
                <div className="row">

                    <div className="col-lg-2 offset-lg-1">
                        <div className="list-group" id="myList" role="tablist">
                            <a className="list-group-item list-group-item-action active" data-toggle="list" href="#home" role="tab">Order History</a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#profile" role="tab">Address Book</a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#messages" role="tab">Account Settings</a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#settings" role="tab">Premier Points</a>
                            <div className={myAccountStyles.csTitle}>Customer Service</div>
                            <div className={myAccountStyles.csText}>Our Customer Service Specialists are available to assist you Monday through Friday from 9am to 5pm EST. Feel free to give us a call at (800) 555-5555 or <a className={myAccountStyles.mail} href="mailto:email@email.com">Email Us</a></div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="tab-content">

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default UserAccount;