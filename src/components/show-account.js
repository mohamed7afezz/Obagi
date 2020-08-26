import React, { useContext, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import ShowAccountStyle from "../assets/scss/components/show-account.module.scss"
import Img from "gatsby-image"
const ShowAccount = () => {



    return (

    
        <div class="modal fade show-account" id="show-account" >
        <div class="modal-dialog " role="document">
          <div class="modal-content">
                    <div className="modal-header">
                        <div className="d-flex w100">
                            <div className="d-flex">
                                <div className="account-title">Your Account</div>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&nbsp;</span></button>
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
