import React ,{useContext} from 'react'
import { graphql, Link,navigate } from 'gatsby'
import { useLocation } from "@reach/router"
import Img from 'gatsby-image'
import Customer from '../customer-care'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import UserContext from "../../providers/user-provider"
const baseUrl = process.env.Base_URL;

const StartOrderStatus = ({ node }) => {
    const location = useLocation()
    const { user } = useContext(UserContext)
    if (user && location.pathname.includes(`/order-status`)) {
        if (typeof window !== "undefined") {
          navigate("/my-account/orders")
        }
    
        return null
      }
      const sendOrder = (updatedItemData) => {
          console.log(document.querySelector(".form-email").value)
        fetch(
            `${baseUrl}/bigcommerce/v1/guest_order/${document.querySelector("#orderNumber").value}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({"email": `${document.querySelector(".form-email").value}`})
            }
        )
            .then(res => res.json())
            .then(response => {
                // console.log(response)
            })
            .catch(error => {
                // console.log('error', error)
            });
    };
    return (
        <Customer activeTab="order-status">
            <div className="container-fluid contact-us ">
                <div className="row">
                    <div class={["col-12 col-md-12",myAccountStyles.removemobpadding].join(" ")}>
                        <div className={myAccountStyles.FsectionWrap}>
                            <div>
                                <div className={myAccountStyles.fsubtitle}>Order Status</div>
                                <div className={["contact-text",myAccountStyles.alAccount].join(" ")}>
                                    ALeardy have an account ?
                                  </div>
                            </div>
                            <Link className={myAccountStyles.buttonWrapper} to={"/my-account/signin"}>Sign In</Link>
                        </div>
                        <p className={myAccountStyles.Needpara}>Need Your Tracking or return info? Find your order here.</p>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); }} className={[myAccountStyles.formContainer,"needs-validations"].join(" ")}>

                        <div className="form-group form-element-con">
                            <label for="contactFName" className="form-label">ORDER NUMBER</label>
                            <input type="text" id="orderNumber" className="form-control" name="first_name" placeholder="" />
                            <p className="error-msg hide">Please Enter Your First Name</p>
                        </div>

                        <div className="form-group form-element-con">
                            <label for="contactFName" className="form-label">*Email ADDRESS</label>
                            <input type="text" className="form-control form-email" name="Email_name" placeholder="" />
                            <p className="error-msg hide">Please Enter Your Email Address</p>
                        </div>
                        <p className={myAccountStyles.formNote}>*Email is required to track this order</p>
                        <div className={myAccountStyles.orderButtonContainer}>
                        
                        </div>
                        <button onClick={sendOrder} className={myAccountStyles.orderButton} type="submit">TAKE ORDER</button>
                    </form>
                </div>
            </div>
        </Customer>
    )
}

export default StartOrderStatus

export const fragment = graphql`
    fragment paragraphOrderStatus on paragraph__order_status {
        id
        
    }`