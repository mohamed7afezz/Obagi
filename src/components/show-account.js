import React, { useContext, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import ShowAccountStyle from "../assets/scss/components/show-account.module.scss"
import Img from "gatsby-image"
const ShowAccount = () => {


    function showAccount () {
        var acc = document.getElementById("account-block");
        if (acc.style.display === "none") {
          acc.style.display = "block";
        } else {
          acc.style.display = "none";
        }
      }

    return (

        <div className="show-account-wrapper" id="show-account">
            <div className="modal-dialog modal-data m-0" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex w100">
                            <div className="d-flex">
                                <div className="account-title">Your Account</div>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {showAccount();}}><span aria-hidden="true">&nbsp;</span></button>
                        </div>
                    </div>
                    <div className="modal-body links-wrapper">
                        <Link to="#">Order History</Link>
                        <Link to="#">Address Book</Link>
                        <Link to="#">Account Settings</Link>
                        <Link to="#">Premier Points</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAccount
