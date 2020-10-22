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
import AddressBox from "./address-box"
import $ from 'jquery'

const UserAccount = ({ node, children, activeTab }) => {



    // const [nav1, setNav1] = React.useState(null)
    // // const [nav2, setNav2] = React.useState(null)
    // // let slider1 = []
    // // let slider2 = []

    // React.useEffect(() => {
    //     setNav1(slider1)
    // }, [slider1])


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
        // slider1.current.slickGoTo(int)

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
        // slider1.slickGoTo(int)

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
          fluid (quality: 100) {
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
                <div className="col-12">
                    {/* <div className={myAccountStyles.tabSliderWrapper}>
                        <Slider {...TabSliderSetting} className="account-tab-slider">
                            <Link to="/my-account/orders" className={activeTab == "orders" ? "active account-tab" : "account-tab"}>Order History</Link>
                            <Link to="/my-account/address-book" className={activeTab == "address-book" ? "active account-tab" : "account-tab"}>Address Book</Link>
                            <Link to="/my-account/account-settings" className={activeTab == "account-settings" ? "active account-tab" : "account-tab"}>Account Settings</Link>
                            <Link to="/my-account/premier-points" className={activeTab == "premier-points" ? "active account-tab" : "account-tab"}>Premier Points</Link>
                        </Slider>
                    </div> */}
                    <div className="dropdown">
                        <button className="dropdown-toggle myaccount-toggle" type="button" id="accountDropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {activeTab === "orders"? "Order History" : activeTab === "address-book"? "Address Book" : activeTab === "account-settings"? "Account Settings" : activeTab === "premier-points"? "Premier Points" : ""}
                        </button>
                        <div className="dropdown-menu myaccount-dropdown" aria-labelledby="accountDropdownButton">
                            <Link to="/my-account/orders" className={activeTab == "orders" ? "active account-tab" : "account-tab"}  id="orders">Order History</Link>
                            <Link to="/my-account/address-book" className={activeTab == "address-book" ? "active account-tab" : "account-tab"} id="address-book">Address Book</Link>
                            <Link to="/my-account/account-settings" className={activeTab == "account-settings" ? "active account-tab" : "account-tab"} id="account-settings">Account Settings</Link>
                            <Link to="/my-account/premier-points" className={activeTab == "premier-points" ? "active account-tab" : "account-tab"} id="premier-points">Premier Points</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" list-wrapper">
                <div className="row">

                    <div className="col-lg-2 offset-lg-1 d-none d-lg-block">
                        <div className="list-group" id="myList" role="tablist">
                            <Link className={activeTab == "orders" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/my-account/orders">Order History</Link>
                            <Link className={activeTab == "address-book" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/my-account/address-book" >Address Book</Link>
                            <Link className={activeTab == "account-settings" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/my-account/account-settings" >Account Settings</Link>
                            <Link className={activeTab == "premier-points" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/my-account/premier-points" >Premier Points</Link>
                            <div className={myAccountStyles.csTitle}>Customer Service</div>
                            <div className={myAccountStyles.csText}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at <span className={myAccountStyles.csNumber}>1-800-636-7546</span>.</div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8">
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