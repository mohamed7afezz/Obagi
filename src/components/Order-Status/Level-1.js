import React ,{useContext, useState} from 'react'
import { graphql, Link,navigate } from 'gatsby'
import { useLocation } from "@reach/router"
import Img from 'gatsby-image'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Customer from '../customer-care'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import UserContext from "../../providers/user-provider"
const baseUrl = process.env.Base_URL;
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
const StartOrderStatus = props => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(UserContext);
    let obj = {};
    if (user && location.pathname.includes(`/order-status`)) {
        if (typeof window !== "undefined") {
          navigate("/my-account/orders")
        }
    
        return null
      }
      function submitforming(e) {
        var list = document.querySelectorAll('.needs-validations input:invalid');
        if (list.length > 0) {
            for (var item of list) {
                item.parentElement.classList.add('error')
                item.nextSibling.classList.remove('hide')
            }
        } else {
            setIsLoading(true)
            fetch(
                `${baseUrl}bigcommerce/v1/guest_order/${document.querySelector("#orderNumber").value}`,
                {
                    method: 'POST',
                    credentials: 'same-origin',
                    mode: 'cors',
                    body: JSON.stringify({"email": `${document.querySelector(".form-email").value}`})
                }
            )
                .then(res => res.json())
                .then(response => {
                   if(response === "There is no order for this email."){
                    setIsLoading(false)
                   document.querySelector(".dangermessage").classList.remove('hide')
                   }else if(response.id){    
                        props.SetRequestData(response)
                        props.GetLevelorder(2);
                        setIsLoading(false)
                        document.querySelector(".dangermessage").classList.add('hide')
                      
                    }
                    if(response === "There is no order for this email."){
                        setIsLoading(false)
                        document.querySelector(".dangermessage").classList.remove('hide')
                       }else if (props.status_id) {
                        props.SetRequestData(response)
                        setIsLoading(false)
                        document.querySelector(".dangermessage").classList.add('hide')
                    
                    }
                 
                })
                .catch(error => {
                   
                    // console.log('error', error)
                });
        }
    }
    function removevaild(e) {
        let item = e.target
    
        item.parentElement.classList.remove('error')
    
        let i = document.querySelectorAll(`input[name=${item.getAttribute('name')}]`)
    
        for (let j = 0; j < i.length; j++) {
    
            i[j].parentElement.classList.remove('error')
        }
        if (item.classList.contains('error-msg')) {
            item.classList.add('hide')
        } else
            if (item.classList.contains('error')) {
                item.classList.remove('error');
            } else if (item.nextSibling != null && !item.nextSibling.classList.contains('radiomark')) {
                item.nextSibling.classList.add('hide')
            }
    }
   
    return (
        <Customer activeTab="order-status">
            { isLoading ?
 
 <ClipLoader
   css={spinner}
   size={150}
   color={"#123abc"}

 />:
            <div className="container-fluid contact-us ">
                <div className="row">
                    <div class={["col-12 col-md-12",myAccountStyles.removemobpadding].join(" ")}>
                        <div className={myAccountStyles.FsectionWrap}>
                            <div>
                                <h1 className={myAccountStyles.fsubtitle}>Order Status</h1>
                                <div className={["contact-text",myAccountStyles.alAccount].join(" ")}>
                                    ALeardy have an account ?
                                  </div>
                            </div>
                            <Link className={myAccountStyles.buttonWrapper} to={"/my-account/signin"}>Sign In</Link>
                        </div>
                        <p className={myAccountStyles.Needpara}>Need Your Tracking or return info? Find your order here.</p>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); }} className={[myAccountStyles.formContainer," needs-validations"].join(" ")}>

                        <div className="form-group form-element-con">
                            <label for="contactFName" className="form-label">*ORDER NUMBER</label>
                            <input type="text" id="orderNumber" onChange={removevaild} required className="form-control" name="first_name" placeholder="" />
                            <p className="error-msg hide">Please Enter Your Order Number</p>
                        </div>

                        <div className="form-group form-element-con">
                            <label for="contactFName" className="form-label">*Email ADDRESS</label>
                            <input type="Email" onChange={removevaild} required className="form-control form-email" name="Email_name" placeholder="" />
                            <p className="error-msg hide">Please Enter Your Email Address</p>
                        </div>
                        <p className={myAccountStyles.formNote}>*Email is required to track this order</p>
                        <h3 className={"dangermessage hide"}>There is no order for this email.</h3>


                        <button onClick={submitforming} className={myAccountStyles.orderButton} type="submit">TRACK ORDER</button>
                    </form>
                </div>
            </div>
       
       } </Customer>
    )
}

export default StartOrderStatus

export const fragment = graphql`
    fragment paragraphOrderStatus on paragraph__order_status {
        id
        
    }`