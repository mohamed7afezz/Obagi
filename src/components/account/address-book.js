import React, { useEffect, useState } from "react"
import UserAccount from '../../components/user-account'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import AddressBox from '../../components/address-box'
import AddressModal from '../../components/address-modal'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
const baseUrl = process.env.Base_URL;

export default function AddressBook() {

    const [isLoading, setIsLoading] = useState(false);
    const [addresses, setAddresses] = useState({});

    async function getAddresses() {

        setIsLoading(true);
        const addressesData = await (await fetch(`${baseUrl}bigcommerce/v1/customer_addresses`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (addressesData !== "User not login.") {
            setAddresses(addressesData);
        }

        setIsLoading(false);
    }





    useEffect(() => {
        getAddresses();
    }, [])






    function removeData() {
        document.querySelector("#address-modal #fname").value = "";
        document.querySelector("#address-modal #lname").value = "";
        document.querySelector("#address-modal #stadd").value = "";
        document.querySelector("#address-modal #apt").value = "";
        document.querySelector("#address-modal #city").value = "";
        document.querySelector("#address-modal #state").value = "";
        document.querySelector("#address-modal #pcode").value = "";
        document.querySelector("#address-modal #phone").value = "";
        document.querySelector("#address-modal #order-id").value = "";
        document.querySelector("#address-modal .select-selected").innerHTML = "Select";
        document.querySelector("#address-modal .select-items > div").innerHTML = "Select";
    }

    function addAddress() {
        let modal = document.querySelector("#address-modal");
        if (modal.classList.contains("edit-address")) {
            modal.classList.remove("edit-address");
        }

        modal.classList.add("add-address");
    }

    return (
        <>
        <UserAccount activeTab="address-book">

            <div className="tab-pane active" id="address-book" role="tabpanel">

                <div className={[myAccountStyles.secondTitleWrapper, "d-none d-lg-flex"].join(" ")}>
                    <div className={myAccountStyles.secondTitle}>Address Book</div>
                    <button type="button" className={myAccountStyles.addressButton} data-toggle="modal" data-target="#address-modal" onClick={() => { removeData(); addAddress(); }}>Add Address</button>
                </div>
                        {isLoading ?
                                    <div>
                                    <ClipLoader
                                css={spinner}
                                    size={150}
                                    color={"#123abc"}
                        />           
                        </div>   
                    :
                    (
                        ((addresses !== "undefined" || Object.keys(addresses).length != 0) && addresses.data) ?

                            (addresses.data.map((item, index) => {
                                return (
                                    <AddressBox
                                        firstName={item.first_name}
                                        lastName={item.last_name}
                                        firstAddress={item.address1}
                                        secondAddress={item.address2}
                                        city={item.city}
                                        state={item.state_or_province}
                                        postalCode={item.postal_code}
                                        addressType={item.address_type}
                                        phone={item.phone}
                                        countryCode={item.country_code}
                                        id={item.id}
                                        index={index + 1}
                                        updateAddresses={getAddresses}
                                    />
                                )
                            }))

                        : <div>There are no addresses.</div>
                    )

                }
                <button type="button" className={[myAccountStyles.addressButton, "d-lg-none"].join(" ")} data-toggle="modal" data-target="#address-modal" onClick={() => { removeData(); addAddress(); }}>Add Address</button>
            </div>





        </UserAccount>
        <AddressModal />

        </>
    )
}
