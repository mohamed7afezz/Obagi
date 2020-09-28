import React, { useContext, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import ShowAccountStyle from "../assets/scss/components/show-account.module.scss"
import Img from "gatsby-image"
import UserContext from '../providers/user-provider'
import $ from 'jquery'
const ShowAccount = () => {

    const {user, handleLogout} = useContext(UserContext);

    function closeModal() {
        $("#show-account").style.display = "none";
        $("body").classList.remove("modal-open");
       $(".modal-backdrop").remove();
    }

    return (

        
        <div className="modal fade show-account" id="show-account" >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex w100">
                            <div className="d-flex">
                                <div className="account-title">Your Account</div>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&nbsp;</span></button>
                        </div>
                    </div>
                    <div className="modal-body links-wrapper">
                        <Link to="/my-account/orders" onClick={() => {closeModal();}}>Order History</Link>
                        <Link to="/my-account/address-book" onClick={() => {closeModal();}}>Address Book</Link>
                        <Link to="/my-account/account-settings" onClick={() => {closeModal();}}>Account Settings</Link>
                        <Link to="/my-account/premier-points" onClick={() => {closeModal();}}>Premier Points</Link>
                        <button type="button" onClick={handleLogout} data-dismiss="modal">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAccount
