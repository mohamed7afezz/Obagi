import React, { useEffect, useState } from "react"
import UserAccount from '../../components/user-account'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import AddressBox from '../../components/address-box'
import AddressModal from '../../components/address-modal'

const baseUrl = process.env.Base_URL;

export default function AddressBook() {

    const [addresses, setAddresses] = useState({});

    async function getAddresses() {

        const addressesData = await (await fetch(`${baseUrl}bigcommerce/v1/customer_addresses`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (addressesData !== "User not login.") {
            setAddresses(addressesData);
        }
        console.log("address", addressesData);
    }

    useEffect(() => {
        getAddresses();
    }, [])

    console.log("ashraqat", addresses);

    if (addresses !== "undefined" || Object.keys(addresses).length != 0) {

        return (
            <UserAccount activeTab="address-book">
                <div className="tab-pane active" id="address-book" role="tabpanel">

                    <div className={[myAccountStyles.secondTitleWrapper, "d-none d-lg-flex"].join(" ")}>
                        <div className={myAccountStyles.secondTitle}>Address Book</div>
                        <button type="button" className={myAccountStyles.addressButton} data-toggle="modal" data-target="#address-modal">Add Address</button>
                    </div>
                    {addresses.data ? addresses.data.map((item, index) => {
                        return (
                            <AddressBox
                                firstName={item.first_name}
                                lastName={item.last_name}
                                firstAddress={item.address1}
                                secondAddress={item.address2}
                                city={item.city}
                                state={item.state_or_province}
                                postalCode={item.postal_code}
                                phone={item.phone}
                                id={item.id}
                                index= {index + 1}
                            />
                        )
                    })
                        : ""}
                    <button type="button" className={[myAccountStyles.addressButton, "d-lg-none"].join(" ")} data-toggle="modal" data-target="#address-modal">Add Address</button>
                </div>
                <AddressModal />
            </UserAccount>
        )

    }

}
